import {
  QuestionAnalysis,
  SimpleNote,
  StandardExam,
  GeneratedDiagramItem,
} from '../types';

// Helper to generate clean, high-contrast, outlined SVG diagrams
export function createSvgDiagram(type: 'math' | 'science' | 'lever' | 'circuit' | 'lens' | 'generic', label: string): string {
  if (type === 'math') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="40" y="40" width="560" height="320" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="60" y="75" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">MATHEMATICAL PROBLEM BREAKDOWN</text>
  <line x1="60" y1="90" x2="580" y2="90" stroke="#cbd5e1" stroke-width="1.5" />
  
  <!-- Step 1 Box -->
  <rect x="70" y="120" width="140" height="180" fill="#f1f5f9" stroke="#334155" stroke-width="2" stroke-dasharray="4" rx="6" />
  <text x="140" y="150" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#0f172a">Step 1: Given</text>
  <circle cx="140" cy="200" r="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" />
  <text x="140" y="206" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#0f172a">Value A</text>
  <text x="140" y="260" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#475569">Identify Knowns</text>
  
  <!-- Arrow 1 -->
  <path d="M 220 210 L 260 210" stroke="#0f172a" stroke-width="2" fill="none" marker-end="url(#arrow)" />
  <polygon points="260,205 270,210 260,215" fill="#0f172a" />
  
  <!-- Step 2 Box -->
  <rect x="280" y="120" width="140" height="180" fill="#f8fafc" stroke="#0f172a" stroke-width="2" rx="6" />
  <text x="350" y="150" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#0f172a">Step 2: Relation</text>
  <rect x="305" y="175" width="90" height="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" rx="4" />
  <text x="350" y="205" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#0369a1">f(x) = y</text>
  <text x="350" y="260" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#475569">Formula / Law</text>
  
  <!-- Arrow 2 -->
  <polygon points="430,205 440,210 430,215" fill="#0f172a" />
  <path d="M 425 210 L 435 210" stroke="#0f172a" stroke-width="2" />
  
  <!-- Step 3 Box -->
  <rect x="450" y="120" width="130" height="180" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" rx="6" />
  <text x="515" y="150" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle" fill="#15803d">Step 3: Solution</text>
  <circle cx="515" cy="200" r="30" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <text x="515" y="206" font-family="monospace" font-size="15" font-weight="700" text-anchor="middle" fill="#166534">Q.E.D</text>
  <text x="515" y="260" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#166534">Final Result</text>
  
  <text x="320" y="335" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" fill="#64748b">${label}</text>
</svg>`;
  }

  if (type === 'lever') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="30" y="30" width="580" height="340" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="50" y="65" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">FIRST-CLASS LEVER SYSTEM (PRE-TECHNICAL / PHYSICS)</text>
  
  <!-- Ground reference -->
  <line x1="80" y1="280" x2="560" y2="280" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4" />
  
  <!-- Fulcrum (Pivot) -->
  <polygon points="260,280 230,330 290,330" fill="#cbd5e1" stroke="#0f172a" stroke-width="2" />
  <circle cx="260" cy="280" r="5" fill="#0f172a" />
  <text x="260" y="355" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#0f172a">Pivot / Fulcrum (F)</text>
  
  <!-- Lever Beam -->
  <rect x="100" y="265" width="440" height="15" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="2" transform="rotate(-6 260 272)" />
  
  <!-- Load on Left -->
  <rect x="105" y="230" width="60" height="45" fill="#fee2e2" stroke="#dc2626" stroke-width="2" rx="4" />
  <text x="135" y="258" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#991b1b">LOAD (L)</text>
  <line x1="135" y1="275" x2="135" y2="330" stroke="#dc2626" stroke-width="2" />
  <polygon points="131,330 135,340 139,330" fill="#dc2626" />
  <text x="135" y="360" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#dc2626">Load Force (W)</text>
  
  <!-- Effort on Right -->
  <line x1="510" y1="200" x2="510" y2="260" stroke="#2563eb" stroke-width="2.5" />
  <polygon points="506,260 510,270 514,260" fill="#2563eb" />
  <text x="510" y="185" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#1d4ed8">EFFORT (E)</text>
  
  <!-- Dimension Lines -->
  <line x1="135" y1="120" x2="260" y2="120" stroke="#64748b" stroke-width="1.5" />
  <text x="195" y="110" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#334155">Load Arm (d1)</text>
  <line x1="260" y1="120" x2="510" y2="120" stroke="#64748b" stroke-width="1.5" />
  <text x="385" y="110" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#334155">Effort Arm (d2)</text>
  
  <text x="320" y="380" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" fill="#64748b">Principle of Moments: Load × Load Arm = Effort × Effort Arm</text>
</svg>`;
  }

  // Science / Nature / Generic
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="30" y="30" width="580" height="340" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="50" y="65" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">${label.toUpperCase()}</text>
  <line x1="50" y1="80" x2="590" y2="80" stroke="#e2e8f0" stroke-width="2" />
  
  <!-- Diagram central visual -->
  <ellipse cx="320" cy="210" rx="180" ry="100" fill="#f0f9ff" stroke="#0284c7" stroke-width="2" />
  <circle cx="320" cy="210" r="50" fill="#e0f2fe" stroke="#0369a1" stroke-width="2" stroke-dasharray="3" />
  
  <!-- Radial arrows and key nodes -->
  <circle cx="210" cy="180" r="12" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2" />
  <text x="210" y="184" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#1e40af">A</text>
  
  <circle cx="430" cy="180" r="12" fill="#dcfce7" stroke="#16a34a" stroke-width="2" />
  <text x="430" y="184" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#15803d">B</text>
  
  <circle cx="320" cy="270" r="12" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="320" y="274" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#b45309">C</text>
  
  <line x1="222" y1="180" x2="270" y2="200" stroke="#0f172a" stroke-width="1.5" />
  <line x1="418" y1="180" x2="370" y2="200" stroke="#0f172a" stroke-width="1.5" />
  
  <text x="320" y="214" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#0f172a">Core Concept Hub</text>
  
  <text x="320" y="340" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" fill="#64748b">Schematic Vector Layout calibrated for Curriculum Learning</text>
</svg>`;
}

// 1. Analyze Fallback
export function generateCurriculumAnalysis(params: {
  questionText?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
}): QuestionAnalysis {
  const grade = params.gradeLevel || 'Junior School (Grade 8)';
  const subject = params.subject || 'General Studies';
  const qText = params.questionText?.trim() || 'A standard curriculum problem requiring methodical breakdown and step-by-step solution.';

  const isLowerPrimary = grade.includes('Grade 1') || grade.includes('Grade 2') || grade.includes('Grade 3');
  const isUpperPrimary = grade.includes('Grade 4') || grade.includes('Grade 5') || grade.includes('Grade 6');
  const isJunior = grade.includes('Grade 7') || grade.includes('Grade 8') || grade.includes('Grade 9');
  const isTertiary = grade.includes('Undergraduate') || grade.includes('Postgraduate') || grade.includes('Doctoral');

  return {
    extractedQuestion: qText,
    subject: subject,
    topic: isLowerPrimary
      ? 'Everyday Number & Community Applications'
      : isUpperPrimary
      ? 'Applied Problem Solving & Scientific Principles'
      : isJunior
      ? 'System Analysis & Quantitative Reasoning'
      : isTertiary
      ? 'Theoretical Principles & Formal Derivations'
      : 'Core Pathway Analytical Problem Solving',
    difficulty: params.difficulty || (isLowerPrimary ? 'Foundational' : isTertiary ? 'Advanced University' : 'Standard CBE'),
    gradeLevel: grade,
    keyConcept: isLowerPrimary
      ? 'Relating everyday physical quantities (currency, count, objects) to basic mathematical operations.'
      : isJunior
      ? 'Applying foundational principles of conservation and structured relationships to solve multi-step problems.'
      : isTertiary
      ? 'Formal rigorous analysis using core theorems and boundary constraints.'
      : 'Translating descriptive word problems into algebraic and conceptual relations.',
    whyTricky: isLowerPrimary
      ? 'Younger learners often confuse addition and subtraction when change or multiple items are combined in one sentence.'
      : isJunior
      ? 'Learners frequently omit the physical relationship or formula condition (e.g. correct pivot position or unit conversion) before computing.'
      : isTertiary
      ? 'Requires strict adherence to mathematical boundary conditions and careful algebraic manipulation.'
      : 'Students tend to skip identifying known vs unknown variables and rush directly to computation.',
    formulas: isLowerPrimary
      ? ['Total Cost = Sum of Individual Items', 'Change Due = Amount Handed - Total Cost']
      : isJunior
      ? ['Load × Load Arm = Effort × Effort Arm (Principle of Moments)', 'Mechanical Advantage (MA) = Load / Effort']
      : isTertiary
      ? ['f(x) continuity across boundary interfaces', 'Sum of forces/moments in static equilibrium = 0']
      : ['Fundamental Governing Equation', 'Dimensional Consistency Check'],
    suggestedDiagramDescription: isJunior
      ? 'Outlined lever beam with marked pivot, effort force vector, and load weight.'
      : isLowerPrimary
      ? 'Market stall price tag layout with outlined coin representations.'
      : 'Structured schematic diagram connecting input parameters to target solution.',
  };
}

// 2. Simple Notes Fallback
export function generateCurriculumNotes(params: {
  question: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  topic?: string;
}): SimpleNote {
  const grade = params.gradeLevel || 'Senior School (Grade 10)';
  const subject = params.subject || 'Mathematics';
  const topic = params.topic || 'Core Problem Solving Framework';
  const question = params.question || 'Standard Problem Statement';

  const isLowerPrimary = grade.includes('Grade 1') || grade.includes('Grade 2') || grade.includes('Grade 3');
  const isLeverOrPhysics = question.toLowerCase().includes('lever') || question.toLowerCase().includes('force') || question.toLowerCase().includes('pivot');

  const svgDiagram = isLeverOrPhysics
    ? createSvgDiagram('lever', 'Outlined Mechanical Advantage Diagram')
    : createSvgDiagram('math', 'Outlined Problem Solving Blueprint');

  return {
    id: `note-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `${topic} - Simplified Revision Notes`,
    subject: subject,
    topic: topic,
    gradeLevel: grade,
    estimatedReadTimeMinutes: isLowerPrimary ? 3 : 5,
    coreConcept: isLowerPrimary
      ? `This topic helps us understand everyday counting and sharing! When we buy items or solve everyday tasks, we break the problem into two simple questions: "How much did we start with?" and "What needs to be added or subtracted?"`
      : `Mastering this topic requires mastering the universal connection between what is given (the inputs) and the governing rule or equation. Once you see the pattern, every exam question following this structure can be solved in four clean steps.`,
    commonMisconceptions: [
      'Assuming that doing the math fast is better than writing down the known variables first.',
      'Forgetting to double-check units (e.g. converting cm to meters, or grams to kilograms).',
      'Missing the final question part: always re-read the last line to make sure you answered what was specifically asked.',
    ],
    blueprintSteps: [
      {
        stepNumber: 1,
        title: 'Extract Knowns and Desired Target',
        explanation: 'Read through the question and write down every number with its unit. Label what you are looking to find with a question mark (?).',
        proTip: 'Underline all keywords such as "total", "change", "minimum", or "rate".',
      },
      {
        stepNumber: 2,
        title: 'State the Governing Law or Rule',
        explanation: 'Write out the core formula or rule in symbolic form before plugging in any numbers.',
        proTip: 'Writing the formula first guarantees method marks in official CBE marking schemes!',
      },
      {
        stepNumber: 3,
        title: 'Substitute Values & Carry Out Arithmetic',
        explanation: 'Carefully replace variables with their numbers and perform step-by-step arithmetic without skipping lines.',
        proTip: 'Keep your equal signs aligned vertically for clean readability.',
      },
      {
        stepNumber: 4,
        title: 'State Answer with Units and Sanity Check',
        explanation: 'Write your final numerical answer clearly, attach the correct units, and verify that the number makes physical sense.',
        proTip: 'Ask yourself: Is this result reasonable in real life?',
      },
    ],
    workedSolution: {
      problemRestatement: question,
      steps: [
        'Step 1: Identify the given information and establish our target variable.',
        'Step 2: Apply the governing curriculum relation and substitute the parameters.',
        'Step 3: Simplify the expressions systematically to reach the canonical answer.',
        'Step 4: Check that all constraints are satisfied.',
      ],
      finalAnswer: 'Complete methodical solution verified against standard grading benchmarks.',
      keyTakeaway: 'Always write down the formula first, state units clearly, and verify the physical realism of your final number.',
    },
    keyFormulas: [
      {
        name: 'Fundamental Governing Relation',
        formula: 'Output = Function(Inputs)',
        explanation: 'Every quantitative problem is a mapping from known inputs to an unknown target through this law.',
      },
      {
        name: 'Conservation / Balance Principle',
        formula: 'Left Hand Side = Right Hand Side',
        explanation: 'Enforces equilibrium and physical consistency throughout the solution.',
      },
    ],
    cheatSheetBullets: [
      'Always start by writing down Given Information clearly.',
      'Check units before doing any multiplication or division.',
      'Draw a quick vector outline or sketch to verify spatial orientation.',
      'Review your working to ensure every sub-question (a, b, c) has been answered.',
    ],
    outlinedDiagram: {
      title: `${topic} Vector Schematic`,
      description: 'Clean high-contrast outlined vector diagram illustrating the key problem structure.',
      svgCode: svgDiagram,
    },
    selfCheckDrill: [
      {
        question: 'What is the very first step you should always perform when tackling this type of problem?',
        options: [
          'Jump immediately to punching numbers into a calculator',
          'Write down given values, target unknowns, and verify units',
          'Guess the final answer',
          'Skip to the next question',
        ],
        correctIndex: 1,
        explanation: 'Writing down given parameters and target variables prevents silly mistakes and ensures method marks.',
      },
      {
        question: 'Why is it essential to check units in your final answer?',
        options: [
          'Units give physical meaning to numbers and prevent dimensional mismatch errors',
          'It is only done to look neat',
          'Units are optional in standardized assessments',
          'It has no impact on grading',
        ],
        correctIndex: 0,
        explanation: 'In national examinations (KPSEA, KJSEA, Senior School, and University), omitted or wrong units forfeit accuracy marks.',
      },
    ],
  };
}

// 3. Standard Exam Fallback
export function generateCurriculumExam(params: {
  question?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  examType?: string;
}): StandardExam {
  const grade = params.gradeLevel || 'Grade 10 (Senior School)';
  const subject = params.subject || 'General Studies';
  const isLowerPrimary = grade.includes('Grade 1') || grade.includes('Grade 2') || grade.includes('Grade 3');
  const isJunior = grade.includes('Grade 7') || grade.includes('Grade 8') || grade.includes('Grade 9');
  const isSenior = grade.includes('Grade 10') || grade.includes('Grade 11') || grade.includes('Grade 12');
  const isTertiary = grade.includes('Undergraduate') || grade.includes('Postgraduate') || grade.includes('Doctoral');

  const paperCode = isLowerPrimary
    ? `CBE-LP-${subject.slice(0, 3).toUpperCase()}-2026`
    : isJunior
    ? `KJSEA-${subject.slice(0, 3).toUpperCase()}-2026`
    : isSenior
    ? `SSS-${subject.slice(0, 3).toUpperCase()}-01`
    : `UNIV-${subject.slice(0, 4).toUpperCase()}-401`;

  const paperTitle = isLowerPrimary
    ? 'KENYA NATIONAL ASSESSMENT • LOWER PRIMARY ACTIVITIES'
    : isJunior
    ? 'KENYA JUNIOR SCHOOL EDUCATION ASSESSMENT (KJSEA)'
    : isSenior
    ? 'CBE SENIOR SCHOOL STANDARDIZED EXAMINATION'
    : 'STANDARDIZED HIGHER EDUCATION DEGREE ASSESSMENT';

  return {
    id: `exam-${Date.now()}`,
    createdAt: new Date().toISOString(),
    paperTitle,
    paperSubtitle: `${subject.toUpperCase()} • COMPETENCY ASSESSMENT`,
    paperCode,
    subject,
    gradeLevel: grade,
    durationMinutes: isLowerPrimary ? 30 : isJunior ? 45 : 60,
    totalMarks: 50,
    candidateInstructions: [
      'Write your full Candidate Name and Index Number in the spaces provided at the top of this paper.',
      'Answer ALL questions in Section A, Section B, and Section C.',
      'All working must be clearly shown in the spaces provided below each question.',
      'Marks will be awarded for correct steps, clear diagrammatic sketches, and accurate final answers with appropriate units.',
      'Silent non-programmable electronic calculators may be used where appropriate.',
    ],
    formulaSheet: [
      {
        quantity: 'Fundamental Rate / Proportion',
        formula: 'Rate = Total Quantity / Total Time or Units',
        notes: 'Apply consistently across all sub-questions',
      },
      {
        quantity: 'Equilibrium & Moments',
        formula: 'Sum of Clockwise Moments = Sum of Anticlockwise Moments',
        notes: 'Valid about any chosen reference pivot',
      },
    ],
    sections: [
      {
        sectionLetter: 'A',
        sectionTitle: 'Foundational Competencies & Objective Questions',
        sectionInstructions: 'Answer all questions in this section (15 Marks).',
        sectionTotalMarks: 15,
        questions: [
          {
            id: 'q1',
            questionNumber: '1',
            text: `Define the primary governing concept behind ${subject} problem solving at the ${grade} level, and state two key conditions required for its application.`,
            questionType: 'short_answer',
            marks: 3,
            hasDiagram: false,
            suggestedWorkingLines: 4,
          },
          {
            id: 'q2',
            questionNumber: '2',
            text: 'Which of the following represents the correct unit or relationship for calculating rate and work output?',
            questionType: 'mcq',
            marks: 2,
            options: [
              'A: Output = Work × Time',
              'B: Output = Quantity / Unit',
              'C: Rate = Quantity / Time',
              'D: Efficiency = Input / Output',
            ],
            hasDiagram: false,
          },
          {
            id: 'q3',
            questionNumber: '3',
            text: 'State the difference between direct and inverse proportionality with reference to a real-world scenario.',
            questionType: 'short_answer',
            marks: 4,
            hasDiagram: false,
            suggestedWorkingLines: 4,
          },
          {
            id: 'q4',
            questionNumber: '4',
            text: 'In an experiment or practical activity, explain why repeating measurements and taking an average improves the reliability of your results.',
            questionType: 'short_answer',
            marks: 6,
            hasDiagram: false,
            suggestedWorkingLines: 5,
          },
        ],
      },
      {
        sectionLetter: 'B',
        sectionTitle: 'Structured Analytical & Diagrammatic Problems',
        sectionInstructions: 'Show all working clearly in the spaces provided (20 Marks).',
        sectionTotalMarks: 20,
        questions: [
          {
            id: 'q5',
            questionNumber: '5',
            text: `Study the vector schematic diagram provided below. (a) Identify the key components labeled A, B, and C. (b) Explain how changing parameter A affects output B. (c) Calculate the resulting value when input parameter is doubled.`,
            questionType: 'structured',
            marks: 10,
            hasDiagram: true,
            diagramTitle: 'Figure 1: Schematic Layout & Components',
            diagramSvg: createSvgDiagram('lever', 'Figure 1: Component Layout'),
            suggestedWorkingLines: 8,
          },
          {
            id: 'q6',
            questionNumber: '6',
            text: 'A practical task requires applying the 4-step problem solving blueprint. Formulate the mathematical model, solve for the unknown parameter, and verify that the result satisfies physical boundary limits.',
            questionType: 'structured',
            marks: 10,
            hasDiagram: false,
            suggestedWorkingLines: 8,
          },
        ],
      },
      {
        sectionLetter: 'C',
        sectionTitle: 'Applied Problem Solving & Practical Scenarios',
        sectionInstructions: 'Synthesize your understanding to solve the extended problem (15 Marks).',
        sectionTotalMarks: 15,
        questions: [
          {
            id: 'q7',
            questionNumber: '7',
            text: `Evaluate a real-world problem scenario in Kenyan and global contexts. Discuss three major challenges students encounter when analyzing this system and provide evidence-based solutions to optimize performance.`,
            questionType: 'extended',
            marks: 15,
            hasDiagram: false,
            suggestedWorkingLines: 12,
          },
        ],
      },
    ],
    markingScheme: [
      {
        questionNumber: '1',
        modelAnswer: 'Clear statement of the governing definition with both prerequisites identified correctly.',
        gradingBreakdown: [
          { code: 'B1', criterion: 'Accurate definition of core concept', allocatedMarks: 1 },
          { code: 'B1', criterion: 'First condition stated clearly', allocatedMarks: 1 },
          { code: 'B1', criterion: 'Second condition stated clearly', allocatedMarks: 1 },
        ],
        examinerTips: 'Candidates must avoid vague descriptions; use standard scientific/mathematical terminology.',
      },
      {
        questionNumber: '2',
        modelAnswer: 'Option C is correct.',
        gradingBreakdown: [
          { code: 'A1', criterion: 'Selection of Option C (Rate = Quantity / Time)', allocatedMarks: 2 },
        ],
        examinerTips: 'Check definition of rate.',
      },
      {
        questionNumber: '5',
        modelAnswer: '(a) Components identified accurately. (b) Explanation of proportional response. (c) Mathematical derivation showing doubling effect.',
        gradingBreakdown: [
          { code: 'B2', criterion: 'Identification of components from diagram', allocatedMarks: 3 },
          { code: 'M1', criterion: 'Correct mathematical formula cited', allocatedMarks: 3 },
          { code: 'A1', criterion: 'Accurate numerical computation with units', allocatedMarks: 4 },
        ],
        examinerTips: 'Award M1 method marks even if a minor arithmetic slip occurs, provided the formula is correct.',
      },
      {
        questionNumber: '7',
        modelAnswer: 'Comprehensive analysis covering systemic challenges, quantitative verification, and mitigation strategies.',
        gradingBreakdown: [
          { code: 'B3', criterion: 'Three distinct valid challenges explained', allocatedMarks: 6 },
          { code: 'M2', criterion: 'Logical reasoning and analytical framework', allocatedMarks: 5 },
          { code: 'A2', criterion: 'Synthesized solutions and conclusion', allocatedMarks: 4 },
        ],
        examinerTips: 'Credit authentic Kenyan scenarios (KPSEA/KJSEA local agricultural or environmental examples).',
      },
    ],
  };
}

// 4. Standalone Diagram Fallback
export function generateCurriculumDiagram(params: {
  prompt: string;
  subject?: string;
}): GeneratedDiagramItem {
  const p = params.prompt.toLowerCase();
  let type: 'math' | 'science' | 'lever' | 'circuit' | 'lens' | 'generic' = 'generic';

  if (p.includes('lever') || p.includes('pivot') || p.includes('force')) type = 'lever';
  else if (p.includes('math') || p.includes('calculus') || p.includes('cone') || p.includes('rate')) type = 'math';

  const svgCode = createSvgDiagram(type, params.prompt.slice(0, 45));

  return {
    id: `diag-${Date.now()}`,
    title: params.prompt.slice(0, 40),
    caption: `Outlined schematic illustration: ${params.prompt}`,
    svgCode,
    componentsLegend: [
      { label: 'Component A', description: 'Input parameter / reference benchmark' },
      { label: 'Component B', description: 'Central operational axis or pivot' },
      { label: 'Component C', description: 'Resultant output force / equilibrium vector' },
    ],
    createdAt: new Date().toISOString(),
  };
}
