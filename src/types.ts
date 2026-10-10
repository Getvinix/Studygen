export interface GradeLevelOption {
  value: string;
  label: string;
  category: 'Lower Primary School (CBE Kenya)' | 'Upper Primary School (CBE Kenya)' | 'Junior School (CBE Kenya)' | 'Senior School (CBE Kenya)' | 'Higher Education (Worldwide)';
  description: string;
}

export const GRADE_LEVELS: GradeLevelOption[] = [
  // Lower Primary School (CBE Kenya: Grades 1 - 3)
  {
    value: 'Grade 1 (Lower Primary)',
    label: 'Grade 1 (Lower Primary - CBE Kenya)',
    category: 'Lower Primary School (CBE Kenya)',
    description: 'Foundational literacy, numeracy, environment & creative movement activities'
  },
  {
    value: 'Grade 2 (Lower Primary)',
    label: 'Grade 2 (Lower Primary - CBE Kenya)',
    category: 'Lower Primary School (CBE Kenya)',
    description: 'Basic operations, hygiene, nutrition & environmental exploration'
  },
  {
    value: 'Grade 3 (Lower Primary)',
    label: 'Grade 3 (Lower Primary - CBE Kenya)',
    category: 'Lower Primary School (CBE Kenya)',
    description: 'Numeracy consolidation, language fluency & basic science activities'
  },

  // Upper Primary School (CBE Kenya: Grades 4 - 6 / KPSEA)
  {
    value: 'Grade 4 (Upper Primary)',
    label: 'Grade 4 (Upper Primary - CBE Kenya)',
    category: 'Upper Primary School (CBE Kenya)',
    description: 'Science & technology intro, agriculture, social studies & creative arts'
  },
  {
    value: 'Grade 5 (Upper Primary)',
    label: 'Grade 5 (Upper Primary - CBE Kenya)',
    category: 'Upper Primary School (CBE Kenya)',
    description: 'Fractions, soil & farming, Kenyan geography & applied science'
  },
  {
    value: 'Grade 6 (KPSEA)',
    label: 'Grade 6 (Upper Primary - KPSEA National Assessment)',
    category: 'Upper Primary School (CBE Kenya)',
    description: 'Kenya Primary School Education Assessment (KPSEA) transition year'
  },

  // Junior School / Junior Secondary (CBE Kenya: Grades 7 - 9 / KJSEA)
  {
    value: 'Grade 7 (Junior School)',
    label: 'Grade 7 (Junior School - CBE Kenya)',
    category: 'Junior School (CBE Kenya)',
    description: 'Integrated Science, Pre-Technical studies, Health Education & Agriculture'
  },
  {
    value: 'Grade 8 (Junior School)',
    label: 'Grade 8 (Junior School - CBE Kenya)',
    category: 'Junior School (CBE Kenya)',
    description: 'Advanced pre-technical tools, business studies, ICT & integrated science'
  },
  {
    value: 'Grade 9 (KJSEA)',
    label: 'Grade 9 (Junior School - KJSEA National Assessment)',
    category: 'Junior School (CBE Kenya)',
    description: 'Kenya Junior School Education Assessment (KJSEA) pathway preparation'
  },

  // Senior School (CBE Kenya: Grades 10 - 12 - STEM, Social Sciences & Arts Pathways)
  {
    value: 'Grade 10 (Senior School)',
    label: 'Grade 10 (Senior School - CBE Kenya)',
    category: 'Senior School (CBE Kenya)',
    description: 'Pathway specialization: STEM, Social Sciences or Arts & Sports Science'
  },
  {
    value: 'Grade 11 (Senior School)',
    label: 'Grade 11 (Senior School - CBE Kenya)',
    category: 'Senior School (CBE Kenya)',
    description: 'Pure/Applied Maths, Physics, Chemistry, Biology, History, CRE, Business'
  },
  {
    value: 'Grade 12 (Senior School)',
    label: 'Grade 12 (Senior School - CBE Kenya)',
    category: 'Senior School (CBE Kenya)',
    description: 'Senior School National Assessment & pre-university transition'
  },

  // Higher Education Worldwide (Tertiary, University, Postgraduate & Professional)
  {
    value: 'Undergraduate Year 1',
    label: 'Undergraduate Year 1 (University Freshman - Worldwide)',
    category: 'Higher Education (Worldwide)',
    description: 'Foundational university courses: Calculus, University Sciences, Intro CS, Economics'
  },
  {
    value: 'Undergraduate Year 2',
    label: 'Undergraduate Year 2 (University Sophomore - Worldwide)',
    category: 'Higher Education (Worldwide)',
    description: 'Intermediate university courses: Multivariable Calculus, Organic Chemistry, Mechanics'
  },
  {
    value: 'Undergraduate Year 3 & 4',
    label: 'Undergraduate Year 3-4 (Senior Bachelor\'s - Worldwide)',
    category: 'Higher Education (Worldwide)',
    description: 'Advanced degree specializations: Engineering, Medicine, Law, Algorithms, Data Science'
  },
  {
    value: 'Postgraduate / Master\'s',
    label: 'Postgraduate / Master\'s Level (MSc / MA / MBA - Worldwide)',
    category: 'Higher Education (Worldwide)',
    description: 'Graduate thesis & advanced academic/professional research'
  },
  {
    value: 'Doctoral / Higher Tertiary',
    label: 'Doctoral / Higher Tertiary (PhD / Postdoctoral - Worldwide)',
    category: 'Higher Education (Worldwide)',
    description: 'Frontier research, formal mathematical proofs & doctoral scholarship'
  },
];

/**
 * Returns the official CBE Kenyan subjects or worldwide higher education subjects
 * matching the selected grade tier.
 */
export function getSubjectsForGradeLevel(gradeLevel: string): { group: string; subjects: string[] }[] {
  if (
    gradeLevel.includes('Grade 1') ||
    gradeLevel.includes('Grade 2') ||
    gradeLevel.includes('Grade 3')
  ) {
    return [
      {
        group: 'Lower Primary School (CBE Kenya)',
        subjects: [
          'Mathematics Activities',
          'English Language Activities',
          'Kiswahili Language Activities',
          'Environmental Activities',
          'Hygiene and Nutrition Activities',
          'Movement and Creative Activities (Art, Music, PE)',
          'Christian Religious Education (CRE) Activities',
          'Islamic Religious Education (IRE) Activities',
          'Hindu Religious Education (HRE) Activities',
          'Indigenous Language Activities',
        ],
      },
      {
        group: 'General Foundation',
        subjects: ['Early Numeracy & Counting', 'Reading & Phonics', 'Basic Science Concepts'],
      },
    ];
  }

  if (
    gradeLevel.includes('Grade 4') ||
    gradeLevel.includes('Grade 5') ||
    gradeLevel.includes('Grade 6') ||
    gradeLevel.includes('KPSEA')
  ) {
    return [
      {
        group: 'Upper Primary School (CBE Kenya / KPSEA)',
        subjects: [
          'Mathematics',
          'English',
          'Kiswahili',
          'Science and Technology',
          'Agriculture and Nutrition',
          'Social Studies',
          'Creative Arts and Sports',
          'Christian Religious Education (CRE)',
          'Islamic Religious Education (IRE)',
          'Hindu Religious Education (HRE)',
          'Kenya Sign Language (KSL)',
          'Foreign Languages (French, German, Arabic, Mandarin)',
        ],
      },
      {
        group: 'Cross-Curricular & STEM',
        subjects: ['General Elementary Science', 'Computer Literacy', 'Environmental Conservation'],
      },
    ];
  }

  if (
    gradeLevel.includes('Grade 7') ||
    gradeLevel.includes('Grade 8') ||
    gradeLevel.includes('Grade 9') ||
    gradeLevel.includes('KJSEA')
  ) {
    return [
      {
        group: 'Junior School Core Subjects (CBE Kenya / KJSEA)',
        subjects: [
          'Mathematics',
          'English',
          'Kiswahili',
          'Integrated Science',
          'Health Education',
          'Social Studies',
          'Agriculture and Nutrition',
          'Pre-Technical Studies',
          'Business Studies',
          'Computer Science / ICT',
          'Creative Arts and Sports',
          'Christian Religious Education (CRE)',
          'Islamic Religious Education (IRE)',
          'Life Skills Education',
        ],
      },
      {
        group: 'Optional & Foreign Languages',
        subjects: ['French', 'German', 'Arabic', 'Kenya Sign Language', 'Indigenous Languages'],
      },
    ];
  }

  if (
    gradeLevel.includes('Grade 10') ||
    gradeLevel.includes('Grade 11') ||
    gradeLevel.includes('Grade 12')
  ) {
    return [
      {
        group: 'Senior School - STEM Pathway (CBE Kenya)',
        subjects: [
          'Pure Mathematics',
          'Applied Mathematics',
          'Physics',
          'Chemistry',
          'Biology',
          'Computer Studies / ICT',
          'General Science',
          'Agriculture',
          'Aviation Technology',
          'Electrical and Electronics Technology',
          'Building Construction',
        ],
      },
      {
        group: 'Senior School - Social Sciences Pathway (CBE Kenya)',
        subjects: [
          'History and Citizenship',
          'Geography',
          'Christian Religious Education (CRE)',
          'Islamic Religious Education (IRE)',
          'Hindu Religious Education (HRE)',
          'Business Studies',
          'Economics',
          'Literature in English',
          'Fasihi ya Kiswahili',
        ],
      },
      {
        group: 'Senior School - Arts & Sports Science Pathway',
        subjects: [
          'Visual Arts',
          'Performing Arts (Music, Dance, Theatre)',
          'Physical Education & Sports Science',
        ],
      },
      {
        group: 'Senior School - Core Compulsory',
        subjects: ['English', 'Kiswahili', 'Mathematics', 'Community Service Learning'],
      },
    ];
  }

  // Higher Education Worldwide
  return [
    {
      group: 'Higher Education - Natural & Physical Sciences (Worldwide)',
      subjects: [
        'Physics (Classical, Quantum, Electromagnetism)',
        'Chemistry (Organic, Physical, Analytical, Inorganic)',
        'Mathematics (Calculus, Linear Algebra, Real Analysis)',
        'Statistics, Probability & Actuarial Science',
        'Biochemistry & Molecular Biology',
        'Astronomy & Astrophysics',
      ],
    },
    {
      group: 'Higher Education - Engineering & Technology (Worldwide)',
      subjects: [
        'Computer Science & Software Engineering',
        'Artificial Intelligence & Machine Learning',
        'Electrical and Electronic Engineering',
        'Mechanical & Mechatronics Engineering',
        'Civil and Structural Engineering',
        'Chemical and Process Engineering',
        'Biomedical Engineering',
      ],
    },
    {
      group: 'Higher Education - Health & Medical Sciences (Worldwide)',
      subjects: [
        'Medicine, Surgery & Clinical Practice',
        'Human Anatomy & Physiology',
        'Pharmacology & Pharmaceutical Sciences',
        'Nursing and Healthcare Sciences',
        'Public Health & Epidemiology',
      ],
    },
    {
      group: 'Higher Education - Business, Law & Social Sciences (Worldwide)',
      subjects: [
        'Economics, Macroeconomics & Econometrics',
        'Accounting, Finance & Banking',
        'Law, Constitutional Law & Jurisprudence',
        'International Relations & Political Science',
        'Psychology & Cognitive Science',
        'Sociology & Anthropology',
      ],
    },
    {
      group: 'Higher Education - Humanities & Arts (Worldwide)',
      subjects: [
        'Philosophy & Logic',
        'Linguistics & Comparative Literature',
        'History & African Studies',
        'Architecture & Design',
      ],
    },
  ];
}

export interface QuestionAnalysis {
  extractedQuestion: string;
  subject: string;
  topic: string;
  difficulty: string;
  gradeLevel?: string;
  keyConcept: string;
  whyTricky: string;
  formulas: string[];
  suggestedDiagramDescription: string;
}

export interface BlueprintStep {
  stepNumber: number;
  title: string;
  explanation: string;
  proTip: string;
}

export interface KeyFormula {
  name: string;
  formula: string;
  explanation: string;
}

export interface WorkedSolution {
  problemRestatement: string;
  steps: string[];
  finalAnswer: string;
  keyTakeaway: string;
}

export interface SelfCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface OutlinedDiagram {
  title: string;
  description: string;
  svgCode: string;
}

export interface SimpleNote {
  id: string;
  createdAt: string;
  title: string;
  subject: string;
  topic: string;
  gradeLevel?: string;
  estimatedReadTimeMinutes: number;
  coreConcept: string;
  commonMisconceptions: string[];
  blueprintSteps: BlueprintStep[];
  workedSolution: WorkedSolution;
  keyFormulas: KeyFormula[];
  cheatSheetBullets: string[];
  outlinedDiagram: OutlinedDiagram;
  selfCheckDrill: SelfCheckQuestion[];
}

export interface ExamQuestion {
  id: string;
  questionNumber: string;
  text: string;
  questionType: string;
  marks: number;
  options?: string[];
  hasDiagram?: boolean;
  diagramTitle?: string;
  diagramSvg?: string;
  suggestedWorkingLines?: number;
}

export interface ExamSection {
  sectionLetter: string;
  sectionTitle: string;
  sectionInstructions: string;
  sectionTotalMarks: number;
  questions: ExamQuestion[];
}

export interface GradingCriterion {
  code: string;
  criterion: string;
  allocatedMarks: number;
}

export interface MarkingSchemeItem {
  questionNumber: string;
  modelAnswer: string;
  gradingBreakdown: GradingCriterion[];
  examinerTips: string;
}

export interface FormulaItem {
  quantity: string;
  formula: string;
  notes: string;
}

export interface StandardExam {
  id: string;
  createdAt: string;
  paperTitle: string;
  paperSubtitle: string;
  paperCode: string;
  subject: string;
  gradeLevel?: string;
  durationMinutes: number;
  totalMarks: number;
  candidateInstructions: string[];
  formulaSheet: FormulaItem[];
  sections: ExamSection[];
  markingScheme: MarkingSchemeItem[];
}

export interface GeneratedDiagramItem {
  id: string;
  title: string;
  caption: string;
  svgCode: string;
  componentsLegend: Array<{ label: string; description: string }>;
  createdAt: string;
}
