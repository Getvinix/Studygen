export interface PresetQuestion {
  id: string;
  subject: string;
  topic: string;
  difficulty: string;
  gradeLevel: string;
  curriculum: 'CBE Kenya' | 'Higher Education (Worldwide)';
  title: string;
  shortSummary: string;
  questionText: string;
  diagramConcept: string;
}

export const PRESET_QUESTIONS: PresetQuestion[] = [
  // 1. Lower Primary School (CBE Kenya)
  {
    id: 'cbe-lower-primary-maths',
    subject: 'Mathematics Activities',
    topic: 'Money Activities & Word Problems (Kenyan Shillings)',
    difficulty: 'Lower Primary (CBE Kenya)',
    gradeLevel: 'Grade 2 (Lower Primary)',
    curriculum: 'CBE Kenya',
    title: 'Local Market Fruit Shopping with Kenyan Shillings (KES)',
    shortSummary: 'Addition, subtraction, and giving change with KES coins and 50/100 shilling notes',
    questionText: 'Amina goes to the local market with a sh. 100 note. At the grocery stall: (a) She buys 3 oranges at sh. 15 each and 2 bananas at sh. 10 each. Calculate the total amount of money Amina spends. (b) How much change should the fruit seller give Amina from her sh. 100 note? (c) If she wants to buy one pineapple costing sh. 50, does she have enough change left? Explain why or why not.',
    diagramConcept: 'Market fruit stall display with price tags (Oranges sh. 15, Bananas sh. 10, Pineapple sh. 50) and outlined coins/notes showing the calculation steps.',
  },

  // 2. Upper Primary School (CBE Kenya / KPSEA)
  {
    id: 'cbe-upper-primary-agric',
    subject: 'Agriculture and Nutrition',
    topic: 'Soil Conservation & Soil Erosion Control Methods',
    difficulty: 'Upper Primary (CBE Kenya)',
    gradeLevel: 'Grade 5 (Upper Primary)',
    curriculum: 'CBE Kenya',
    title: 'Contour Farming, Terracing & Sheet Erosion Barriers',
    shortSummary: 'Identifying types of soil erosion and soil conservation structures on sloped land',
    questionText: 'A farmer in Murang\'a has a farm on a steep hill where heavy rains wash away topsoil. (a) Name the type of soil erosion where a uniform thin layer of topsoil is washed away by running water. (b) Explain how building contour ridges and planting grass strips (Napier grass) across the slope prevents soil from being carried away into the river. (c) Why is mulching important for conserving soil moisture and controlling weeds in a vegetable nursery bed?',
    diagramConcept: 'Sloping farmland profile outline showing contour stone lines, Napier grass buffer strip, rainwater runoff direction, and fertile topsoil retention.',
  },

  // 3. Junior School (CBE Kenya / KJSEA)
  {
    id: 'cbe-junior-school-pretech',
    subject: 'Pre-Technical Studies',
    topic: 'Simple Machines: Levers & Mechanical Advantage',
    difficulty: 'Junior School (CBE Kenya)',
    gradeLevel: 'Grade 8 (Junior School)',
    curriculum: 'CBE Kenya',
    title: 'First-Class Lever: Fulcrum, Effort Arm & Mechanical Advantage',
    shortSummary: 'Principle of moments, effort force calculations, and workshop tools classification',
    questionText: 'During a Pre-Technical workshop activity, a learner uses a 1.5-meter metal crowbar to lift a heavy stone slab of mass 120 kg (Weight = 1200 N). The pivot (fulcrum) is placed 0.3 meters from the stone slab. (a) Classify this crowbar as a first-class, second-class, or third-class lever and justify your answer. (b) Calculate the length of the effort arm. (c) Using the principle of moments (Clockwise moments = Anticlockwise moments), calculate the minimum downward effort force the learner must apply at the end of the crowbar to balance the stone slab. (d) Calculate the Mechanical Advantage (MA) of this lever system.',
    diagramConcept: 'First-class lever beam diagram showing pivot/fulcrum, load of 1200 N at load arm 0.3 m, effort force F applied at effort arm 1.2 m, and pivot normal reaction.',
  },

  // 4. Senior School - STEM Pathway (CBE Kenya)
  {
    id: 'cbe-senior-school-physics',
    subject: 'Physics',
    topic: 'Electromagnetic Induction & Faraday-Lenz Laws',
    difficulty: 'Senior School (CBE Kenya)',
    gradeLevel: 'Grade 11 (Senior School)',
    curriculum: 'CBE Kenya',
    title: 'Induced EMF in a Conductor Moving Through Uniform Magnetic Field',
    shortSummary: 'Magnetic flux linkage, Fleming\'s right-hand rule, and Lenz\'s law opposing force',
    questionText: 'A straight metal rod PQ of length L = 0.40 m moves at a constant horizontal speed v = 5.0 m/s perpendicular to a uniform horizontal magnetic field B = 0.60 T directed into the plane of the paper. The rod slides smoothly along two frictionless conducting rails connected to an external resistor of resistance R = 3.0 ohms. (a) By applying Faraday\'s law of electromagnetic induction, derive and calculate the induced electromotive force (EMF) across the rod. (b) State Fleming\'s Right-Hand Rule and determine whether current flows from P to Q or Q to P. (c) Explain why an external mechanical force is required to maintain the constant speed of the rod, and calculate the electrical power dissipated in the resistor.',
    diagramConcept: 'Two parallel conducting rails with resistor R, rod PQ moving right with velocity vector v, uniform magnetic field represented by crosses (into page), and induced current arrows.',
  },

  // 5. Senior School - Social Sciences Pathway (CBE Kenya)
  {
    id: 'cbe-senior-school-geography',
    subject: 'Geography',
    topic: 'Tectonic Faulting & Formation of the Great Rift Valley',
    difficulty: 'Senior School (CBE Kenya)',
    gradeLevel: 'Grade 10 (Senior School)',
    curriculum: 'CBE Kenya',
    title: 'Faulting Processes: Graben (Rift Valley) & Horst (Block Mountain)',
    shortSummary: 'Tensional vs compressional theories, fault scarps, and Rift Valley lakes',
    questionText: 'The Gregory Rift Valley is a prominent physiographic feature cutting through Kenya from Lake Turkana to Lake Magadi. (a) With the aid of outlined geological diagrams, explain the Tensional Force Theory of Rift Valley formation, clearly illustrating the central block slipping down between normal faults. (b) Distinguish between a horst (block mountain) and a graben (rift valley). (c) Discuss three economic activities favored by the Rift Valley landscape in Kenya (e.g. geothermal energy in Olkaria, tourism, flamingo soda lakes).',
    diagramConcept: 'Three-stage cross-section geological diagram: (1) Crust undergoing horizontal tensional pull, (2) Development of parallel normal fault fracture lines, (3) Central block subsided into a rift valley graben with fault scarps (escarpments).',
  },

  // 6. Higher Education Worldwide (Tertiary / University)
  {
    id: 'higher-ed-worldwide-quantum',
    subject: 'Physics (Classical, Quantum, Electromagnetism)',
    topic: 'Quantum Mechanics: 1D Finite Potential Well',
    difficulty: 'Higher Education (Worldwide)',
    gradeLevel: 'Undergraduate Year 3 & 4',
    curriculum: 'Higher Education (Worldwide)',
    title: 'Wavefunction Continuity & Bound State Transcendental Equations',
    shortSummary: 'Time-independent Schrödinger equation, evanescent decay, and parity',
    questionText: 'A quantum particle of mass m is confined in a symmetric one-dimensional finite square well potential V(x) = 0 for |x| < a, and V(x) = V0 for |x| >= a. (a) Formulate the time-independent Schrödinger equation inside and outside the well. (b) Applying boundary conditions for continuity of psi(x) and dpsi/dx at x = +/-a, derive the transcendental equation for even parity bound state energy eigenvalues: xi * tan(xi) = sqrt(xi0^2 - xi^2). (c) Explain the quantum tunneling penetration depth into the classically forbidden barrier.',
    diagramConcept: 'Finite potential well diagram showing potential barrier V0, width 2a, oscillating sinusoidal wavefunction psi(x) inside well, and exponential evanescent decay tails in barrier regions.',
  },
];
