import {
  QuestionAnalysis,
  SimpleNote,
  StandardExam,
  GeneratedDiagramItem,
} from '../types';
import {
  generateCurriculumAnalysis,
  generateCurriculumNotes,
  generateCurriculumExam,
  generateCurriculumDiagram,
} from './curriculumFallbacks';

/**
 * Safely calls an endpoint expecting JSON.
 * If the response is HTML (e.g. Vercel SPA index.html fallback, 404, 502),
 * or if network fails, or if JSON parsing fails, it safely uses the curriculum fallback
 * to guarantee zero syntax crashes for the student.
 */
async function safeApiPost<T>(
  url: string,
  body: any,
  fallbackFn: () => T
): Promise<T> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get('content-type') || '';
    const rawText = await res.text();

    // Check if response is HTML or starts with '<'
    if (
      contentType.includes('text/html') ||
      rawText.trim().startsWith('<') ||
      rawText.trim().startsWith('<!DOCTYPE')
    ) {
      console.warn(
        `[OpenLearn API] Endpoint ${url} returned HTML instead of JSON (detected static host or missing server route). Using intelligent curriculum fallback.`
      );
      return fallbackFn();
    }

    if (!res.ok) {
      console.warn(`[OpenLearn API] Endpoint ${url} returned HTTP ${res.status}. Falling back.`);
      try {
        const errorJson = JSON.parse(rawText);
        if (errorJson && errorJson.error) {
          console.warn('[OpenLearn API] Server error:', errorJson.error);
        }
      } catch (_) {}
      return fallbackFn();
    }

    // Parse safely
    try {
      const data = JSON.parse(rawText);
      return data as T;
    } catch (parseError) {
      console.warn(`[OpenLearn API] JSON parse error on ${url}:`, parseError);
      return fallbackFn();
    }
  } catch (networkError) {
    console.warn(`[OpenLearn API] Fetch request to ${url} failed (network/offline):`, networkError);
    return fallbackFn();
  }
}

// 1. Analyze Question
export async function analyzeQuestionApi(params: {
  questionText?: string;
  imageBase64?: string | null;
  mimeType?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
}): Promise<QuestionAnalysis> {
  return safeApiPost<QuestionAnalysis>(
    '/api/analyze-question',
    params,
    () => generateCurriculumAnalysis(params)
  );
}

// 2. Generate Simple Notes
export async function generateNotesApi(params: {
  question: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  topic?: string;
}): Promise<SimpleNote> {
  return safeApiPost<SimpleNote>(
    '/api/generate-notes',
    params,
    () => generateCurriculumNotes(params)
  );
}

// 3. Generate Standard Exam
export async function generateExamApi(params: {
  topic?: string;
  baseQuestion?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  examType?: string;
  targetDuration?: number;
  totalMarks?: number;
}): Promise<StandardExam> {
  return safeApiPost<StandardExam>(
    '/api/generate-exam',
    params,
    () => generateCurriculumExam({
      question: params.baseQuestion || params.topic,
      subject: params.subject,
      gradeLevel: params.gradeLevel,
      difficulty: params.difficulty,
      examType: params.examType,
    })
  );
}

// 4. Generate Diagram
export async function generateDiagramApi(params: {
  prompt: string;
  subject?: string;
}): Promise<GeneratedDiagramItem> {
  return safeApiPost<GeneratedDiagramItem>(
    '/api/generate-diagram',
    params,
    () => generateCurriculumDiagram(params)
  );
}
