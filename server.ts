import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import {
  generateCurriculumAnalysis,
  generateCurriculumNotes,
  generateCurriculumExam,
  generateCurriculumDiagram,
} from './src/utils/curriculumFallbacks.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to sanitize SVG
function cleanSvg(svg: string): string {
  if (!svg) return '';
  let cleaned = svg.trim();
  // Remove markdown code fences if model wrapped them
  if (cleaned.startsWith('```xml')) cleaned = cleaned.slice(6);
  if (cleaned.startsWith('```svg')) cleaned = cleaned.slice(6);
  if (cleaned.startsWith('```html')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();
  
  // Ensure xmlns is present if missing
  if (cleaned.startsWith('<svg') && !cleaned.includes('xmlns=')) {
    cleaned = cleaned.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return cleaned;
}

// Robust JSON parse helper that handles markdown code fences, backticks, and extra text
function safeParseJson<T>(raw: string | undefined | null, fallback: T): T {
  if (!raw || typeof raw !== 'string') return fallback;
  let text = raw.trim();

  // Strip markdown code fences
  if (text.startsWith('```')) {
    text = text.replace(/^```[a-zA-Z0-9_-]*\s*\n?/, '').replace(/\n?```\s*$/, '').trim();
  }

  // Direct parse attempt
  try {
    return JSON.parse(text);
  } catch (err1) {
    // Attempt extracting outermost { ... }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(text.substring(firstBrace, lastBrace + 1));
      } catch (err2) {}
    }

    // Attempt extracting outermost [ ... ]
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(text.substring(firstBracket, lastBracket + 1));
      } catch (err3) {}
    }

    console.warn('[server.ts] safeParseJson could not parse JSON, using fallback.');
    return fallback;
  }
}

// 1. Analyze Problematic Question / OCR & Stumbling Block Detection
app.post('/api/analyze-question', async (req, res) => {
  try {
    const { questionText, imageBase64, mimeType, subject, difficulty, gradeLevel } = req.body;

    if (!questionText && !imageBase64) {
      return res.status(400).json({ error: 'Please provide either question text or an image.' });
    }

    const parts: any[] = [];

    if (imageBase64) {
      const base64Data = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: base64Data,
        },
      });
    }

    const prompt = `You are an expert academic educator and diagnostic tutor.
You MUST strictly analyze the student's question under the user's SELECTED SUBJECT: "${subject || 'General'}" and TARGET GRADE LEVEL: "${gradeLevel || 'Secondary'}".
If the subject is Computer Science, all concepts, topics, and analysis MUST strictly be about Computer Science (e.g. algorithms, data structures, programming, logic, computer systems, or computational thinking).
NEVER output generic lever, physics, or arithmetic topics when another subject like Computer Science is selected.

User Question Text / Concept / Problematic Word:
"""
${questionText || 'Analyze the concept or image provided'}
"""
${difficulty ? `Difficulty Context: ${difficulty}` : ''}

Extract and analyze:
1. Full extracted question statement (preserve all coding syntax, algorithmic terms, or technical terms).
2. The core academic subject (MUST be "${subject || 'Computer Science'}").
3. The specific topic and sub-topic within ${subject}.
4. Estimated difficulty level appropriate for ${gradeLevel}.
5. Core concept tested.
6. The primary "Stumbling Block" / Why students struggle with this specific topic in ${subject}.
7. Key formulas, pseudocode rules, theorems, or syntax rules needed to solve or understand it.
8. What kind of outlined schematic diagram (e.g., flowcharts, tree structures, call stacks, memory layouts, logic circuits) would make this immediately clear.`;

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedQuestion: { type: Type.STRING, description: 'Clean formatted question text with math expressions in standard unicode/text' },
            subject: { type: Type.STRING, description: 'Academic subject' },
            topic: { type: Type.STRING, description: 'Specific curriculum topic' },
            difficulty: { type: Type.STRING, description: 'Difficulty level' },
            gradeLevel: { type: Type.STRING, description: 'Matched or specified grade level (e.g. Grade 1, Grade 5, Grade 10, Undergraduate, Higher Tertiary)' },
            keyConcept: { type: Type.STRING, description: 'Core concept tested' },
            whyTricky: { type: Type.STRING, description: 'Exact reason students get stuck or make errors' },
            formulas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key formulas or rules required'
            },
            suggestedDiagramDescription: { type: Type.STRING, description: 'Recommended outlined visual diagram' }
          },
          required: ['extractedQuestion', 'subject', 'topic', 'difficulty', 'keyConcept', 'whyTricky', 'formulas', 'suggestedDiagramDescription']
        }
      }
    });

    const fallbackData = generateCurriculumAnalysis({
      questionText,
      subject,
      gradeLevel,
      difficulty,
    });
    const parsed = safeParseJson(response.text, fallbackData);
    if (subject) {
      parsed.subject = subject;
    }
    if (!parsed.gradeLevel && gradeLevel) {
      parsed.gradeLevel = gradeLevel;
    }
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing question, serving curriculum fallback:', error);
    const fallback = generateCurriculumAnalysis({
      questionText: req.body?.questionText,
      subject: req.body?.subject,
      gradeLevel: req.body?.gradeLevel,
      difficulty: req.body?.difficulty,
    });
    return res.json(fallback);
  }
});

// 2. Generate Simple Notes with Outlined Diagrams
app.post('/api/generate-notes', async (req, res) => {
  try {
    const { question, subject, topic, difficulty, gradeLevel } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question or topic is required to generate notes.' });
    }

    const systemInstruction = `You are a world-class teacher and curriculum specialist.
You produce "Simple Notes" specifically designed for students who got stuck on a problematic question.

CRITICAL CURRICULUM & GRADE-LEVEL CALIBRATION:
Target Level: ${gradeLevel || 'Senior School'}
Target Subject: ${subject || 'General'}

A. KENYAN COMPETENCY-BASED EDUCATION (CBE / CBC Kenya - KICD & KNEC Framework):
If the student level is Lower Primary, Upper Primary, Junior School, or Senior School, strictly adhere to Kenyan CBE curriculum standards:
1. Lower Primary School (Grade 1 - 3):
   - Focus on practical, observable learning activities (e.g. Mathematics Activities, Environmental Activities, Hygiene and Nutrition).
   - Use Kenyan currency (shillings / KES), everyday Kenyan domestic & community scenarios (fruits at the market, school compound, farm animals).
   - Use warm, cheerful, step-by-step guidance suitable for ages 6-9.
   - Outlined diagrams must be simple, bold, and easily recognizable (e.g. coins, clocks, shapes, leaves, trees, animals).
2. Upper Primary School (Grade 4 - 6 / KPSEA):
   - Aligned with KPSEA competency areas (Science and Technology, Agriculture and Nutrition, Social Studies, Mathematics).
   - Real-life Kenyan context: soil erosion control (terraces, Napier grass), simple digital devices, Kenyan geography & counties.
   - Outlined diagrams: plant/animal anatomy, sloped farming profiles, fraction models, simple machines.
3. Junior School (Grade 7 - 9 / KJSEA):
   - Aligned with KJSEA standards (Integrated Science, Pre-Technical Studies, Health Education, Agriculture, Computer Science, Business Studies).
   - Technical concepts: workshop safety & tools, levers, pulleys, energy conversions, basic circuits, adolescent health, crop/livestock production.
   - Outlined diagrams: schematic diagrams of first/second/third class levers, electric circuits, organ systems, technical tools.
4. Senior School (Grade 10 - 12 - STEM, Social Sciences & Arts Pathways):
   - Senior School pathway rigor (Pure/Applied Mathematics, Physics, Chemistry, Biology, History & Citizenship, Geography, Economics).
   - Formal Kenyan national examination standards with deep analytical problem solving.

B. HIGHER EDUCATION (Worldwide - Undergraduate, Master's, Doctoral):
If the level is Undergraduate, Postgraduate, or Higher Tertiary:
   - Deliver university-level academic rigor, formal mathematical notation (calculus, differential equations, linear algebra), scientific rigor (quantum mechanics, reaction kinetics, cellular signaling pathways, algorithmic complexity).
   - Deep conceptual intuition paired with exact derivations, formal theorems, and advanced schematic vector diagrams.

Universal Rules:
- Speak in clear, accessible plain English appropriate for the chosen level and curriculum.
- Clearly highlight the "Trap / Misconception Alert" so they never make that mistake again.
- Provide a universal 4-step framework (Blueprint) that works on ANY problem of this type.
- Include a full, step-by-step worked solution.
- Crucially, produce a valid, standalone, high-contrast OUTLINED VECTOR SVG diagram (viewBox="0 0 640 400") suited to the grade level.
  - The diagram must use clean outline styling (stroke="#1e293b" or "#334155", stroke-width="2", clear text labels <text>, fill="none" or soft fills, arrows/labels).
- Provide 2 quick self-check questions with answers.`;

    const prompt = `Generate Simple Revision Notes and an Outlined Diagram for the following problematic concept/question:
Target Grade Level: ${gradeLevel || 'Junior School'}
Target Subject: ${subject || 'General'}
Difficulty Level Context: ${difficulty || 'Standard'}

CRITICAL SUBJECT DISCIPLINE:
You MUST create content strictly for the subject "${subject}".
For example, if the subject is "Computer Science", you must write about Computer Science (algorithms, code concepts, computational thinking, data structures), NOT physics, biology, or generic levers.
The Outlined Vector Diagram MUST illustrate this exact concept in ${subject} (e.g. for Computer Science: flowchart, binary tree, call stack, logic gate, or array memory model).

Question / Problematic Word / Concept:
"""
${question}
"""

Create the complete structured notes calibrated specifically for ${gradeLevel || 'the student'} in ${subject}, including the subject-specific outlined vector SVG diagram.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Clear title of the study note' },
            subject: { type: Type.STRING },
            topic: { type: Type.STRING },
            gradeLevel: { type: Type.STRING, description: 'The grade level (e.g. Grade 1, Grade 4, Grade 8, Grade 11, Undergraduate Year 1, Higher Tertiary)' },
            estimatedReadTimeMinutes: { type: Type.INTEGER },
            coreConcept: { type: Type.STRING, description: 'Intuitive plain-English explanation tailored to the grade level' },
            commonMisconceptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Common traps students at this grade level fall into'
            },
            blueprintSteps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  proTip: { type: Type.STRING }
                },
                required: ['stepNumber', 'title', 'explanation', 'proTip']
              }
            },
            workedSolution: {
              type: Type.OBJECT,
              properties: {
                problemRestatement: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                finalAnswer: { type: Type.STRING },
                keyTakeaway: { type: Type.STRING }
              },
              required: ['problemRestatement', 'steps', 'finalAnswer', 'keyTakeaway']
            },
            keyFormulas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  formula: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['name', 'formula', 'explanation']
              }
            },
            cheatSheetBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            outlinedDiagram: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: 'Title or caption for the diagram' },
                description: { type: Type.STRING, description: 'What the diagram illustrates' },
                svgCode: { type: Type.STRING, description: 'Valid standalone SVG string (viewBox="0 0 640 400") with clean outlines and labels' }
              },
              required: ['title', 'description', 'svgCode']
            },
            selfCheckDrill: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING }
                },
                required: ['question', 'options', 'correctIndex', 'explanation']
              }
            }
          },
          required: [
            'title', 'subject', 'topic', 'estimatedReadTimeMinutes',
            'coreConcept', 'commonMisconceptions', 'blueprintSteps',
            'workedSolution', 'keyFormulas', 'cheatSheetBullets',
            'outlinedDiagram', 'selfCheckDrill'
          ]
        }
      }
    });

    const fallbackNotes = generateCurriculumNotes({
      question,
      subject,
      topic,
      difficulty,
      gradeLevel,
    });
    const parsed = safeParseJson(response.text, fallbackNotes);
    if (subject) {
      parsed.subject = subject;
    }
    if (!parsed.gradeLevel && gradeLevel) {
      parsed.gradeLevel = gradeLevel;
    }
    if (parsed.outlinedDiagram?.svgCode) {
      parsed.outlinedDiagram.svgCode = cleanSvg(parsed.outlinedDiagram.svgCode);
    }
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating notes, serving curriculum fallback:', error);
    const fallback = generateCurriculumNotes({
      question: req.body?.question || 'Standard Question',
      subject: req.body?.subject,
      topic: req.body?.topic,
      difficulty: req.body?.difficulty,
      gradeLevel: req.body?.gradeLevel,
    });
    return res.json(fallback);
  }
});

// 3. Generate Standard Exam Paper in PDF-ready format with Outlined Diagrams & Mark Scheme
app.post('/api/generate-exam', async (req, res) => {
  try {
    const {
      topic,
      baseQuestion,
      subject,
      gradeLevel = 'Grade 10',
      examType = 'standard_midterm',
      difficulty = 'standard',
      targetDuration = 45,
      totalMarks = 50
    } = req.body;

    const systemInstruction = `You are a Chief Academic Examiner specialized in both the Kenyan Competency-Based Education (CBE / CBC Kenya - KNEC & KICD) curriculum and Worldwide Higher Education standards.
Your job is to generate a realistic, rigorous, professional STANDARD EXAM PAPER in PDF-ready structure strictly tailored to the chosen Grade Level: "${gradeLevel}" and Subject: "${subject}".

CRITICAL ASSESSMENT FORMATTING:
A. FOR KENYAN COMPETENCY-BASED EDUCATION (CBE / CBC Kenya):
1. Lower Primary School (Grade 1 - 3):
   - Title: "KENYA NATIONAL ASSESSMENT • LOWER PRIMARY (GRADE 1-3)"
   - Subtitle: "${subject.toUpperCase()} ACTIVITIES ASSESSMENT"
   - Paper Code: "CBE-LP-${subject.slice(0, 3).toUpperCase()}-01"
   - Use simple, encouraging candidate instructions ("Attempt all questions. Write your answers neatly in the spaces provided.").
   - Questions feature authentic Kenyan scenarios, KES currency (shillings), Kenyan wildlife/farm animals, local fruits/vegetables, school life.
2. Upper Primary School (Grade 4 - 6 / KPSEA):
   - Title: "KENYA PRIMARY SCHOOL EDUCATION ASSESSMENT (KPSEA)"
   - Subtitle: "${subject.toUpperCase()} ASSESSMENT PAPER"
   - Paper Code: "KPSEA-${subject.slice(0, 3).toUpperCase()}-2026"
   - Structure matches KNEC KPSEA national examination style.
3. Junior School (Grade 7 - 9 / KJSEA):
   - Title: "KENYA JUNIOR SCHOOL EDUCATION ASSESSMENT (KJSEA)"
   - Subtitle: "${subject.toUpperCase()} ASSESSMENT PAPER"
   - Paper Code: "KJSEA-${subject.slice(0, 3).toUpperCase()}-2026"
   - Structure matches KNEC Junior Secondary assessment (Section A: Multiple Choice & Rapid Recall, Section B: Structured & Technical Application, Section C: Problem Solving / Practical Scenario).
4. Senior School (Grade 10 - 12 - SSS):
   - Title: "SENIOR SCHOOL NATIONAL EXAMINATION"
   - Subtitle: "${subject.toUpperCase()} • CBE SENIOR SCHOOL PATHWAY"
   - Paper Code: "SSS-${subject.slice(0, 3).toUpperCase()}-PAPER-1"
   - High secondary rigor with formal Section A, B, and C.

B. FOR HIGHER EDUCATION (Worldwide - Undergraduate, Master's, Doctoral):
   - Title: "UNIVERSITY STANDARDIZED EXAMINATION PAPER"
   - Subtitle: "${subject.toUpperCase()} • DEGREE ASSESSMENT"
   - Paper Code: "UNIV-${subject.slice(0, 4).toUpperCase()}-401"
   - High university rigor, theoretical depth, multi-part questions, and comprehensive marking rubric.

Universal Requirements:
1. Official Exam Cover Details (Title, Subtitle, Paper Code, Time Allowed, Max Marks, Candidate Instructions).
2. Reference Formula Sheet / Constants Table (appropriate for the level; if Grade 1-4, helpful hints/rules; if High School/Tertiary, official formulas & constants).
3. 2 to 3 clearly demarcated Sections (Section A: Foundations/MCQs, Section B: Structured, Section C: Problem Solving).
4. Outlined Diagrams: For at least 2 questions, include a valid, high-contrast SVG outlined diagram (viewBox="0 0 550 320") with clean strokes, labels, and figure numbers.
5. Complete Examiner Marking Scheme with marking codes (M1 for Method, A1 for Accuracy, B1 for Fact) and model answers.`;

    const prompt = `Create a complete Standard Exam Paper on the following subject/focus:
Target Grade Level: ${gradeLevel}
Subject: ${subject || 'General'}
Core Focus / Topic: ${topic || 'Curriculum Standards'}
${baseQuestion ? `Incorporate questions inspired by this problem statement:\n"""\n${baseQuestion}\n"""\n` : ''}
Exam Type: ${examType} (${examType === 'targeted_drill' ? '5 targeted questions' : examType === 'comprehensive_mock' ? 'Full comprehensive national assessment paper' : 'Standard 8-10 question assessment paper'})
Difficulty: ${difficulty}
Target Time: ${targetDuration} minutes
Total Marks: ${totalMarks} marks

CRITICAL SUBJECT SPECIFICITY:
Every single question, MCQ, structured question, diagram, and marking scheme MUST be strictly about the chosen subject: "${subject}" and topic: "${topic || baseQuestion}".
If the subject is Computer Science, all questions must be Computer Science questions (pseudocode, algorithms, data structures, computer hardware, logic gates, networking, computational logic).
Do NOT include physics, chemistry, or unrelated subjects.
Any Outlined SVG diagram included in Section B or C MUST be a subject diagram (e.g. for Computer Science: flowchart, binary search tree, logic circuit, memory stack).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            paperTitle: { type: Type.STRING },
            paperSubtitle: { type: Type.STRING },
            paperCode: { type: Type.STRING },
            subject: { type: Type.STRING },
            gradeLevel: { type: Type.STRING, description: 'The targeted grade level (Grade 1 to Higher Tertiary)' },
            durationMinutes: { type: Type.INTEGER },
            totalMarks: { type: Type.INTEGER },
            candidateInstructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            formulaSheet: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quantity: { type: Type.STRING },
                  formula: { type: Type.STRING },
                  notes: { type: Type.STRING }
                },
                required: ['quantity', 'formula', 'notes']
              }
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionLetter: { type: Type.STRING },
                  sectionTitle: { type: Type.STRING },
                  sectionInstructions: { type: Type.STRING },
                  sectionTotalMarks: { type: Type.INTEGER },
                  questions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        questionNumber: { type: Type.STRING },
                        text: { type: Type.STRING },
                        questionType: { type: Type.STRING, description: 'mcq | short_answer | structured | extended' },
                        marks: { type: Type.INTEGER },
                        options: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        hasDiagram: { type: Type.BOOLEAN },
                        diagramTitle: { type: Type.STRING },
                        diagramSvg: { type: Type.STRING, description: 'Valid standalone outlined SVG string (viewBox="0 0 550 320") or empty string' },
                        suggestedWorkingLines: { type: Type.INTEGER }
                      },
                      required: ['id', 'questionNumber', 'text', 'questionType', 'marks', 'hasDiagram']
                    }
                  }
                },
                required: ['sectionLetter', 'sectionTitle', 'sectionInstructions', 'sectionTotalMarks', 'questions']
              }
            },
            markingScheme: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionNumber: { type: Type.STRING },
                  modelAnswer: { type: Type.STRING },
                  gradingBreakdown: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        code: { type: Type.STRING, description: 'M1, A1, B1, etc.' },
                        criterion: { type: Type.STRING },
                        allocatedMarks: { type: Type.INTEGER }
                      },
                      required: ['code', 'criterion', 'allocatedMarks']
                    }
                  },
                  examinerTips: { type: Type.STRING }
                },
                required: ['questionNumber', 'modelAnswer', 'gradingBreakdown', 'examinerTips']
              }
            }
          },
          required: [
            'paperTitle', 'paperSubtitle', 'paperCode', 'subject',
            'durationMinutes', 'totalMarks', 'candidateInstructions',
            'formulaSheet', 'sections', 'markingScheme'
          ]
        }
      }
    });

    const fallbackExam = generateCurriculumExam({
      question: baseQuestion || topic,
      subject,
      gradeLevel,
      difficulty,
      examType,
    });
    const parsed = safeParseJson(response.text, fallbackExam);
    if (subject) {
      parsed.subject = subject;
    }
    if (!parsed.gradeLevel && gradeLevel) {
      parsed.gradeLevel = gradeLevel;
    }

    // Clean SVGs in questions
    if (parsed.sections && Array.isArray(parsed.sections)) {
      for (const section of parsed.sections) {
        if (section.questions && Array.isArray(section.questions)) {
          for (const q of section.questions) {
            if (q.diagramSvg) {
              q.diagramSvg = cleanSvg(q.diagramSvg);
            }
          }
        }
      }
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating exam, serving curriculum fallback:', error);
    const fallback = generateCurriculumExam({
      question: req.body?.baseQuestion || req.body?.topic,
      subject: req.body?.subject,
      gradeLevel: req.body?.gradeLevel,
      difficulty: req.body?.difficulty,
      examType: req.body?.examType,
    });
    return res.json(fallback);
  }
});

// 4. Standalone Outlined Diagram Generator
app.post('/api/generate-diagram', async (req, res) => {
  try {
    const { prompt, subject } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const systemInstruction = `You are a scientific technical illustrator and SVG generator.
Create a clean, elegant, vector-outlined academic diagram for textbooks and exams.
Guidelines:
- Produce ONLY a valid, complete standalone SVG element (viewBox="0 0 600 400").
- Style: Crisp dark outlines (stroke="#1e293b", stroke-width="2"), soft fill or transparent ("#f8fafc" or "none").
- Include clear labels (<text> elements with clean sans-serif typography, dark fill="#0f172a", font-size="13" to "15").
- Include arrows, angle arcs, coordinates, dimension lines, or components with markers where applicable.
- Make it aesthetically pleasing, accurate, and easy for students to understand.`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Create an outlined technical SVG diagram illustrating:\n${prompt}\nSubject: ${subject || 'General STEM'}. Ensure the diagram strictly represents this subject and concept.`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            caption: { type: Type.STRING },
            svgCode: { type: Type.STRING, description: 'Clean standalone SVG string with viewBox="0 0 600 400"' },
            componentsLegend: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ['label', 'description']
              }
            }
          },
          required: ['title', 'caption', 'svgCode', 'componentsLegend']
        }
      }
    });

    const fallbackDiag = generateCurriculumDiagram({
      prompt,
      subject,
    });
    const parsed = safeParseJson(aiResponse.text, fallbackDiag);
    if (parsed.svgCode) {
      parsed.svgCode = cleanSvg(parsed.svgCode);
    }
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating diagram, serving curriculum fallback:', error);
    const fallback = generateCurriculumDiagram({
      prompt: req.body?.prompt || 'Outlined Concept Diagram',
      subject: req.body?.subject,
    });
    return res.json(fallback);
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  // Only start listening when not running inside a serverless platform (e.g. Vercel)
  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
