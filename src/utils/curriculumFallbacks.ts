import {
  QuestionAnalysis,
  SimpleNote,
  StandardExam,
  GeneratedDiagramItem,
} from '../types';

export type DomainType =
  | 'cs'
  | 'math'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'agriculture'
  | 'pretechnical'
  | 'business'
  | 'language'
  | 'general';

export type CsSubTopic =
  | 'database'
  | 'network'
  | 'data_structures'
  | 'oop'
  | 'algorithms'
  | 'architecture'
  | 'os_deadlock'
  | 'security'
  | 'recursion'
  | 'general_cs';

// Detect domain category from subject and question text
export function detectDomain(subject: string = '', text: string = ''): DomainType {
  const combined = `${subject} ${text}`.toLowerCase();
  if (
    combined.includes('comput') ||
    combined.includes('program') ||
    combined.includes('coding') ||
    combined.includes('algorithm') ||
    combined.includes('software') ||
    combined.includes('ict') ||
    combined.includes('database') ||
    combined.includes('sql') ||
    combined.includes('network') ||
    combined.includes('data struct') ||
    combined.includes('binary') ||
    combined.includes('stack') ||
    combined.includes('queue') ||
    combined.includes('deadlock') ||
    combined.includes('cyber') ||
    combined.includes('oop') ||
    combined.includes('object-oriented') ||
    combined.includes('python') ||
    combined.includes('java') ||
    combined.includes('c++') ||
    combined.includes('html') ||
    combined.includes('css') ||
    combined.includes('logic gate') ||
    combined.includes('truth table') ||
    combined.includes('cpu')
  ) {
    return 'cs';
  }
  if (
    combined.includes('bio') ||
    combined.includes('cell') ||
    combined.includes('nephron') ||
    combined.includes('photosynthesis') ||
    combined.includes('genetics') ||
    combined.includes('dna') ||
    combined.includes('respirat') ||
    combined.includes('heart') ||
    combined.includes('organ') ||
    combined.includes('enzyme')
  ) {
    return 'biology';
  }
  if (
    combined.includes('chem') ||
    combined.includes('mole') ||
    combined.includes('titrat') ||
    combined.includes('reaction') ||
    combined.includes('acid') ||
    combined.includes('base') ||
    combined.includes('galvanic') ||
    combined.includes('electron') ||
    combined.includes('periodic')
  ) {
    return 'chemistry';
  }
  if (
    combined.includes('agric') ||
    combined.includes('soil') ||
    combined.includes('erosion') ||
    combined.includes('crop') ||
    combined.includes('napier') ||
    combined.includes('terrace') ||
    combined.includes('farm') ||
    combined.includes('mulch')
  ) {
    return 'agriculture';
  }
  if (
    combined.includes('pre-tech') ||
    combined.includes('workshop') ||
    combined.includes('lever') ||
    combined.includes('pulley') ||
    combined.includes('tool') ||
    combined.includes('crowbar')
  ) {
    return 'pretechnical';
  }
  if (
    combined.includes('physic') ||
    combined.includes('lens') ||
    combined.includes('circuit') ||
    combined.includes('velocity') ||
    combined.includes('force') ||
    combined.includes('magnetic') ||
    combined.includes('ohm') ||
    combined.includes('ray optics')
  ) {
    return 'physics';
  }
  if (
    combined.includes('math') ||
    combined.includes('calculus') ||
    combined.includes('algebra') ||
    combined.includes('geometr') ||
    combined.includes('trigonometr') ||
    combined.includes('fraction') ||
    combined.includes('ratio') ||
    combined.includes('integral') ||
    combined.includes('derivative')
  ) {
    return 'math';
  }
  if (
    combined.includes('business') ||
    combined.includes('econom') ||
    combined.includes('supply') ||
    combined.includes('demand') ||
    combined.includes('account') ||
    combined.includes('profit') ||
    combined.includes('ledger')
  ) {
    return 'business';
  }
  if (
    combined.includes('english') ||
    combined.includes('kiswahili') ||
    combined.includes('sarufi') ||
    combined.includes('fasihi') ||
    combined.includes('grammar') ||
    combined.includes('essay')
  ) {
    return 'language';
  }
  return 'general';
}

// Sub-topic classifier for Computer Science
export function detectCsSubTopic(text: string = ''): CsSubTopic {
  const t = text.toLowerCase();
  if (
    t.includes('sql') ||
    t.includes('database') ||
    t.includes('dbms') ||
    t.includes('table') ||
    t.includes('normalization') ||
    t.includes('1nf') ||
    t.includes('2nf') ||
    t.includes('3nf') ||
    t.includes('foreign key') ||
    t.includes('primary key') ||
    t.includes('relational') ||
    t.includes('join') ||
    t.includes('acid') ||
    t.includes('query')
  ) {
    return 'database';
  }
  if (
    t.includes('network') ||
    t.includes('ip') ||
    t.includes('tcp') ||
    t.includes('udp') ||
    t.includes('packet') ||
    t.includes('router') ||
    t.includes('switch') ||
    t.includes('topology') ||
    t.includes('lan') ||
    t.includes('wan') ||
    t.includes('osi') ||
    t.includes('dns') ||
    t.includes('subnet') ||
    t.includes('port')
  ) {
    return 'network';
  }
  if (
    t.includes('deadlock') ||
    t.includes('process') ||
    t.includes('thread') ||
    t.includes('mutex') ||
    t.includes('semaphore') ||
    t.includes('scheduling') ||
    t.includes('round robin') ||
    t.includes('paging') ||
    t.includes('virtual memory') ||
    t.includes('operating system')
  ) {
    return 'os_deadlock';
  }
  if (
    t.includes('oop') ||
    t.includes('object-oriented') ||
    t.includes('class') ||
    t.includes('inheritance') ||
    t.includes('polymorphism') ||
    t.includes('encapsulation') ||
    t.includes('abstraction') ||
    t.includes('constructor') ||
    t.includes('method') ||
    t.includes('override')
  ) {
    return 'oop';
  }
  if (
    t.includes('security') ||
    t.includes('cyber') ||
    t.includes('encrypt') ||
    t.includes('cipher') ||
    t.includes('rsa') ||
    t.includes('firewall') ||
    t.includes('malware') ||
    t.includes('phishing') ||
    t.includes('hash') ||
    t.includes('public key') ||
    t.includes('private key')
  ) {
    return 'security';
  }
  if (
    t.includes('stack') ||
    t.includes('queue') ||
    t.includes('linked list') ||
    t.includes('array') ||
    t.includes('lifo') ||
    t.includes('fifo') ||
    t.includes('pointer') ||
    t.includes('node')
  ) {
    return 'data_structures';
  }
  if (
    t.includes('search') ||
    t.includes('sort') ||
    t.includes('bubble') ||
    t.includes('merge') ||
    t.includes('quicksort') ||
    t.includes('binary search') ||
    t.includes('big o') ||
    t.includes('complexity') ||
    t.includes('asymptotic')
  ) {
    return 'algorithms';
  }
  if (
    t.includes('logic gate') ||
    t.includes('truth table') ||
    t.includes('and gate') ||
    t.includes('or gate') ||
    t.includes('not gate') ||
    t.includes('nand') ||
    t.includes('nor') ||
    t.includes('xor') ||
    t.includes('boolean') ||
    t.includes('cpu') ||
    t.includes('alu') ||
    t.includes('register') ||
    t.includes('fetch decode') ||
    t.includes('binary arithmetic')
  ) {
    return 'architecture';
  }
  if (
    t.includes('recursion') ||
    t.includes('recursive') ||
    t.includes('base case') ||
    t.includes('stack overflow') ||
    t.includes('call tree') ||
    t.includes('factorial') ||
    t.includes('fibonacci')
  ) {
    return 'recursion';
  }
  return 'general_cs';
}

// Generate Outlined SVG Diagrams strictly tailored to the domain and topic
export function createSvgDiagram(domain: DomainType, title: string = 'Core Concept', csSub?: CsSubTopic): string {
  // 1. Computer Science Diagrams
  if (domain === 'cs') {
    const sub = csSub || detectCsSubTopic(title);

    // A. CS: Relational Database & SQL Schema
    if (sub === 'database') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">RELATIONAL DATABASE: SCHEMA NORMALIZATION &amp; SQL RELATIONS</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Table 1: STUDENTS -->
  <rect x="50" y="100" width="220" height="180" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <rect x="50" y="100" width="220" height="32" rx="6" fill="#2563eb" />
  <text x="160" y="122" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle" fill="#ffffff">TABLE: students</text>
  <text x="65" y="155" font-family="monospace" font-size="12" font-weight="700" fill="#1e40af">PK: student_id (INT)</text>
  <line x1="60" y1="165" x2="260" y2="165" stroke="#bfdbfe" stroke-width="1" />
  <text x="65" y="185" font-family="monospace" font-size="11" fill="#334155">first_name (VARCHAR)</text>
  <text x="65" y="205" font-family="monospace" font-size="11" fill="#334155">last_name (VARCHAR)</text>
  <text x="65" y="225" font-family="monospace" font-size="11" fill="#334155">grade_level (VARCHAR)</text>
  <text x="65" y="245" font-family="monospace" font-size="11" fill="#334155">created_at (TIMESTAMP)</text>

  <!-- Table 2: ENROLLMENTS -->
  <rect x="370" y="100" width="220" height="180" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <rect x="370" y="100" width="220" height="32" rx="6" fill="#16a34a" />
  <text x="480" y="122" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle" fill="#ffffff">TABLE: enrollments</text>
  <text x="385" y="155" font-family="monospace" font-size="12" font-weight="700" fill="#15803d">PK: enrollment_id (INT)</text>
  <line x1="380" y1="165" x2="580" y2="165" stroke="#bbf7d0" stroke-width="1" />
  <text x="385" y="185" font-family="monospace" font-size="12" font-weight="700" fill="#dc2626">FK: student_id (INT)</text>
  <text x="385" y="205" font-family="monospace" font-size="11" fill="#334155">course_code (VARCHAR)</text>
  <text x="385" y="225" font-family="monospace" font-size="11" fill="#334155">term (VARCHAR)</text>
  <text x="385" y="245" font-family="monospace" font-size="11" fill="#334155">exam_score (NUMERIC)</text>

  <!-- Connector (1 to Many Relation) -->
  <path d="M 270 152 L 320 152 L 320 182 L 370 182" fill="none" stroke="#2563eb" stroke-width="2.5" />
  <circle cx="270" cy="152" r="4" fill="#2563eb" />
  <polygon points="364,178 372,182 364,186" fill="#2563eb" />
  <text x="320" y="145" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle" fill="#2563eb">1 : N (FK)</text>

  <!-- SQL Query Box -->
  <rect x="50" y="300" width="540" height="55" rx="6" fill="#0f172a" />
  <text x="65" y="322" font-family="monospace" font-size="11" fill="#38bdf8">SELECT s.first_name, e.course_code, e.exam_score FROM students s</text>
  <text x="65" y="340" font-family="monospace" font-size="11" fill="#4ade80">INNER JOIN enrollments e ON s.student_id = e.student_id WHERE e.exam_score &gt;= 70;</text>
</svg>`;
    }

    // B. CS: Network Topology & OSI/TCP Layering
    if (sub === 'network') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">COMPUTER NETWORKING: TOPOLOGY &amp; PACKET TRANSMISSION</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Core Switch / Router -->
  <rect x="260" y="160" width="120" height="60" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
  <text x="320" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#ffffff">Switch / Router</text>
  <text x="320" y="202" font-family="monospace" font-size="10" text-anchor="middle" fill="#38bdf8">Gateway 192.168.1.1</text>

  <!-- Client 1 -->
  <rect x="60" y="90" width="110" height="50" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="115" y="115" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#1e40af">Workstation A</text>
  <text x="115" y="130" font-family="monospace" font-size="9" text-anchor="middle" fill="#64748b">192.168.1.10</text>
  <line x1="170" y1="120" x2="260" y2="180" stroke="#2563eb" stroke-width="2" />

  <!-- Client 2 -->
  <rect x="60" y="230" width="110" height="50" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="115" y="255" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#1e40af">Workstation B</text>
  <text x="115" y="270" font-family="monospace" font-size="9" text-anchor="middle" fill="#64748b">192.168.1.11</text>
  <line x1="170" y1="250" x2="260" y2="200" stroke="#2563eb" stroke-width="2" />

  <!-- Database / Server -->
  <rect x="470" y="90" width="120" height="55" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="530" y="115" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#15803d">Web &amp; DB Server</text>
  <text x="530" y="132" font-family="monospace" font-size="9" text-anchor="middle" fill="#64748b">Port 80/443 (HTTPS)</text>
  <line x1="380" y1="180" x2="470" y2="120" stroke="#16a34a" stroke-width="2" />

  <!-- Firewall / Internet Cloud -->
  <rect x="470" y="230" width="120" height="55" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <text x="530" y="255" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#991b1b">Firewall &amp; WAN</text>
  <text x="530" y="272" font-family="monospace" font-size="9" text-anchor="middle" fill="#64748b">NAT &amp; Public IP</text>
  <line x1="380" y1="200" x2="470" y2="250" stroke="#dc2626" stroke-width="2" />

  <!-- Packet Frame Breakdown -->
  <rect x="60" y="315" width="520" height="42" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
  <text x="75" y="340" font-family="monospace" font-size="11" font-weight="700" fill="#0f172a">[IP Header (Src/Dst)] | [TCP Header (Seq/Ack/Port)] | [Data Payload] | [CRC Checksum]</text>
</svg>`;
    }

    // C. CS: Operating Systems, Concurrency & Deadlock
    if (sub === 'os_deadlock') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">OPERATING SYSTEMS: CONCURRENCY &amp; CIRCULAR WAIT DEADLOCK</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Process 1 -->
  <circle cx="180" cy="150" r="38" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />
  <text x="180" y="155" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#1e40af">Process 1</text>
  <text x="180" y="100" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#2563eb">Holds Res 1, Requests Res 2</text>

  <!-- Process 2 -->
  <circle cx="460" cy="150" r="38" fill="#fef2f2" stroke="#dc2626" stroke-width="2.5" />
  <text x="460" y="155" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#991b1b">Process 2</text>
  <text x="460" y="100" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#dc2626">Holds Res 2, Requests Res 1</text>

  <!-- Resource 1 -->
  <rect x="270" y="110" width="100" height="45" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="320" y="138" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#15803d">Resource R1</text>

  <!-- Resource 2 -->
  <rect x="270" y="210" width="100" height="45" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="320" y="238" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#b45309">Resource R2</text>

  <!-- Allocation & Request Edges -->
  <!-- R1 is held by P1 -->
  <line x1="270" y1="132" x2="218" y2="138" stroke="#16a34a" stroke-width="2.5" />
  <polygon points="220,133 212,140 221,143" fill="#16a34a" />

  <!-- P1 requests R2 -->
  <line x1="195" y1="184" x2="270" y2="225" stroke="#2563eb" stroke-width="2" stroke-dasharray="4" />
  <polygon points="262,224 272,226 266,218" fill="#2563eb" />

  <!-- R2 is held by P2 -->
  <line x1="370" y1="230" x2="425" y2="175" stroke="#d97706" stroke-width="2.5" />
  <polygon points="423,181 429,171 419,173" fill="#d97706" />

  <!-- P2 requests R1 -->
  <line x1="440" y1="120" x2="370" y2="128" stroke="#dc2626" stroke-width="2" stroke-dasharray="4" />
  <polygon points="378,124 368,128 377,133" fill="#dc2626" />

  <!-- Deadlock Conditions Summary -->
  <rect x="50" y="285" width="540" height="70" rx="6" fill="#0f172a" />
  <text x="65" y="310" font-family="monospace" font-size="11" font-weight="700" fill="#f87171">4 COFFMAN CONDITIONS FOR DEADLOCK:</text>
  <text x="65" y="328" font-family="monospace" font-size="10" fill="#e2e8f0">1. Mutual Exclusion  2. Hold and Wait  3. No Preemption  4. Circular Wait Cycle</text>
  <text x="65" y="344" font-family="monospace" font-size="10" fill="#38bdf8">Resolution: Resource ordering hierarchy or Banker's Algorithm deadlock avoidance</text>
</svg>`;
    }

    // D. CS: Object-Oriented Programming (UML Class Diagram)
    if (sub === 'oop') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">OBJECT-ORIENTED PROGRAMMING: CLASS INHERITANCE &amp; POLYMORPHISM</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Superclass: User / Account -->
  <rect x="230" y="90" width="180" height="110" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <rect x="230" y="90" width="180" height="28" rx="6" fill="#2563eb" />
  <text x="320" y="110" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle" fill="#ffffff">User (Superclass)</text>
  <text x="245" y="135" font-family="monospace" font-size="10" fill="#334155">- id: int</text>
  <text x="245" y="150" font-family="monospace" font-size="10" fill="#334155">- username: string</text>
  <line x1="230" y1="160" x2="410" y2="160" stroke="#bfdbfe" stroke-width="1" />
  <text x="245" y="178" font-family="monospace" font-size="10" fill="#1e40af">+ login(): boolean</text>
  <text x="245" y="193" font-family="monospace" font-size="10" fill="#1e40af">+ getRole(): string [abstract]</text>

  <!-- Subclass 1: Student -->
  <rect x="80" y="250" width="180" height="100" rx="6" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <rect x="80" y="250" width="180" height="26" rx="6" fill="#16a34a" />
  <text x="170" y="268" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#ffffff">Student (Subclass)</text>
  <text x="95" y="292" font-family="monospace" font-size="10" fill="#334155">- gradeLevel: string</text>
  <line x1="80" y1="302" x2="260" y2="302" stroke="#bbf7d0" stroke-width="1" />
  <text x="95" y="320" font-family="monospace" font-size="10" fill="#15803d">+ getRole(): "Student"</text>
  <text x="95" y="335" font-family="monospace" font-size="10" fill="#15803d">+ submitExam(): void</text>

  <!-- Subclass 2: Teacher -->
  <rect x="380" y="250" width="180" height="100" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <rect x="380" y="250" width="180" height="26" rx="6" fill="#dc2626" />
  <text x="470" y="268" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#ffffff">Teacher (Subclass)</text>
  <text x="395" y="292" font-family="monospace" font-size="10" fill="#334155">- subjectSpecialty: string</text>
  <line x1="380" y1="302" x2="560" y2="302" stroke="#fecaca" stroke-width="1" />
  <text x="395" y="320" font-family="monospace" font-size="10" fill="#991b1b">+ getRole(): "Teacher"</text>
  <text x="395" y="335" font-family="monospace" font-size="10" fill="#991b1b">+ gradeSubmission(): void</text>

  <!-- Inheritance Arrows (Hollow Triangle pointing to Superclass) -->
  <line x1="170" y1="250" x2="170" y2="225" stroke="#0f172a" stroke-width="2" />
  <line x1="170" y1="225" x2="320" y2="225" stroke="#0f172a" stroke-width="2" />
  <line x1="470" y1="250" x2="470" y2="225" stroke="#0f172a" stroke-width="2" />
  <line x1="470" y1="225" x2="320" y2="225" stroke="#0f172a" stroke-width="2" />
  <line x1="320" y1="225" x2="320" y2="208" stroke="#0f172a" stroke-width="2" />
  <polygon points="312,208 320,198 328,208" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
  <text x="320" y="240" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#2563eb">Inherits ("is-a" relationship)</text>
</svg>`;
    }

    // E. CS: Digital Logic Gates & Truth Table
    if (sub === 'architecture') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">COMPUTER ARCHITECTURE: LOGIC GATES &amp; BOOLEAN TRUTH TABLE</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- AND Gate -->
  <g transform="translate(60, 110)">
    <text x="60" y="-10" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#0f172a">AND Gate: Y = A &middot; B</text>
    <!-- Inputs -->
    <line x1="0" y1="20" x2="40" y2="20" stroke="#0f172a" stroke-width="2" />
    <line x1="0" y1="50" x2="40" y2="50" stroke="#0f172a" stroke-width="2" />
    <text x="-10" y="24" font-family="monospace" font-size="11" font-weight="700">A</text>
    <text x="-10" y="54" font-family="monospace" font-size="11" font-weight="700">B</text>
    <!-- Gate Body -->
    <path d="M 40 10 L 70 10 A 25 25 0 0 1 70 60 L 40 60 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5" />
    <!-- Output -->
    <line x1="95" y1="35" x2="135" y2="35" stroke="#0f172a" stroke-width="2" />
    <text x="145" y="39" font-family="monospace" font-size="11" font-weight="700" fill="#2563eb">Y</text>
  </g>

  <!-- OR Gate -->
  <g transform="translate(60, 220)">
    <text x="60" y="-10" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#0f172a">OR Gate: Y = A + B</text>
    <line x1="0" y1="20" x2="40" y2="20" stroke="#0f172a" stroke-width="2" />
    <line x1="0" y1="50" x2="40" y2="50" stroke="#0f172a" stroke-width="2" />
    <text x="-10" y="24" font-family="monospace" font-size="11" font-weight="700">A</text>
    <text x="-10" y="54" font-family="monospace" font-size="11" font-weight="700">B</text>
    <!-- Curved OR Gate Body -->
    <path d="M 40 10 Q 55 35 40 60 Q 75 60 95 35 Q 75 10 40 10 Z" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5" />
    <line x1="95" y1="35" x2="135" y2="35" stroke="#0f172a" stroke-width="2" />
    <text x="145" y="39" font-family="monospace" font-size="11" font-weight="700" fill="#16a34a">Y</text>
  </g>

  <!-- Truth Table (Right Side) -->
  <g transform="translate(320, 100)">
    <rect x="0" y="0" width="260" height="210" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="1.5" />
    <rect x="0" y="0" width="260" height="32" rx="8" fill="#1e293b" />
    <text x="130" y="22" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#ffffff">BOOLEAN TRUTH TABLE</text>

    <!-- Headers -->
    <text x="30" y="52" font-family="monospace" font-size="12" font-weight="700" fill="#0f172a">A</text>
    <text x="75" y="52" font-family="monospace" font-size="12" font-weight="700" fill="#0f172a">B</text>
    <text x="130" y="52" font-family="monospace" font-size="12" font-weight="700" fill="#2563eb">A &middot; B</text>
    <text x="195" y="52" font-family="monospace" font-size="12" font-weight="700" fill="#16a34a">A + B</text>
    <line x1="10" y1="62" x2="250" y2="62" stroke="#94a3b8" stroke-width="1" />

    <!-- Rows -->
    <text x="30" y="90" font-family="monospace" font-size="12">0</text>
    <text x="75" y="90" font-family="monospace" font-size="12">0</text>
    <text x="140" y="90" font-family="monospace" font-size="12" font-weight="700" fill="#2563eb">0</text>
    <text x="205" y="90" font-family="monospace" font-size="12" font-weight="700" fill="#16a34a">0</text>

    <text x="30" y="125" font-family="monospace" font-size="12">0</text>
    <text x="75" y="125" font-family="monospace" font-size="12">1</text>
    <text x="140" y="125" font-family="monospace" font-size="12" font-weight="700" fill="#2563eb">0</text>
    <text x="205" y="125" font-family="monospace" font-size="12" font-weight="700" fill="#16a34a">1</text>

    <text x="30" y="160" font-family="monospace" font-size="12">1</text>
    <text x="75" y="160" font-family="monospace" font-size="12">0</text>
    <text x="140" y="160" font-family="monospace" font-size="12" font-weight="700" fill="#2563eb">0</text>
    <text x="205" y="160" font-family="monospace" font-size="12" font-weight="700" fill="#16a34a">1</text>

    <text x="30" y="195" font-family="monospace" font-size="12">1</text>
    <text x="75" y="195" font-family="monospace" font-size="12">1</text>
    <text x="140" y="195" font-family="monospace" font-size="12" font-weight="700" fill="#2563eb">1</text>
    <text x="205" y="195" font-family="monospace" font-size="12" font-weight="700" fill="#16a34a">1</text>
  </g>

  <!-- Universal Gates Note -->
  <text x="320" y="345" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#0f172a">Universal Logic: NAND and NOR gates can implement ANY Boolean function.</text>
</svg>`;
    }

    // F. CS: Data Structures (Stack & Queue)
    if (sub === 'data_structures') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">DATA STRUCTURES: STACK (LIFO) vs QUEUE (FIFO) MEMORY MODEL</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Stack (Left) -->
  <g transform="translate(60, 95)">
    <text x="90" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#2563eb">STACK (LIFO)</text>
    <text x="90" y="34" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#64748b">Last-In, First-Out</text>

    <!-- Stack Container (open top) -->
    <line x1="30" y1="50" x2="30" y2="190" stroke="#0f172a" stroke-width="3" />
    <line x1="30" y1="190" x2="150" y2="190" stroke="#0f172a" stroke-width="3" />
    <line x1="150" y1="190" x2="150" y2="50" stroke="#0f172a" stroke-width="3" />

    <!-- Elements -->
    <rect x="36" y="152" width="108" height="32" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" />
    <text x="90" y="172" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#1e40af">Item 1 (Bottom)</text>

    <rect x="36" y="114" width="108" height="32" rx="4" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" />
    <text x="90" y="134" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#1e40af">Item 2</text>

    <rect x="36" y="76" width="108" height="32" rx="4" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2" />
    <text x="90" y="96" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#1d4ed8">Item 3 [TOP]</text>

    <!-- Push/Pop Arrow -->
    <path d="M 170 80 Q 200 60 170 40" fill="none" stroke="#dc2626" stroke-width="2" />
    <polygon points="168,44 162,38 171,35" fill="#dc2626" />
    <text x="210" y="55" font-family="monospace" font-size="11" font-weight="700" fill="#dc2626">Push / Pop</text>
  </g>

  <!-- Queue (Right) -->
  <g transform="translate(340, 95)">
    <text x="130" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#16a34a">QUEUE (FIFO)</text>
    <text x="130" y="34" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#64748b">First-In, First-Out</text>

    <!-- Queue Tube (open ends) -->
    <line x1="40" y1="80" x2="220" y2="80" stroke="#0f172a" stroke-width="2.5" />
    <line x1="40" y1="140" x2="220" y2="140" stroke="#0f172a" stroke-width="2.5" />

    <!-- Queue Items -->
    <rect x="50" y="88" width="50" height="44" rx="4" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5" />
    <text x="75" y="115" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#15803d">Front</text>

    <rect x="105" y="88" width="50" height="44" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" />
    <text x="130" y="115" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#15803d">Mid</text>

    <rect x="160" y="88" width="50" height="44" rx="4" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" />
    <text x="185" y="115" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#15803d">Rear</text>

    <!-- Dequeue Arrow (Front Left) -->
    <line x1="40" y1="110" x2="5" y2="110" stroke="#dc2626" stroke-width="2" />
    <polygon points="12,105 2,110 12,115" fill="#dc2626" />
    <text x="0" y="98" font-family="monospace" font-size="10" font-weight="700" fill="#dc2626">Dequeue()</text>

    <!-- Enqueue Arrow (Rear Right) -->
    <line x1="255" y1="110" x2="225" y2="110" stroke="#16a34a" stroke-width="2" />
    <polygon points="232,105 222,110 232,115" fill="#16a34a" />
    <text x="225" y="98" font-family="monospace" font-size="10" font-weight="700" fill="#16a34a">Enqueue()</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="295" width="540" height="55" rx="6" fill="#0f172a" />
  <text x="65" y="320" font-family="monospace" font-size="11" fill="#38bdf8">Stack Time Complexity: Push = O(1), Pop = O(1), Peek = O(1)</text>
  <text x="65" y="338" font-family="monospace" font-size="11" fill="#4ade80">Queue Time Complexity: Enqueue = O(1), Dequeue = O(1) [Circular or Linked List]</text>
</svg>`;
    }

    // G. Default CS / Algorithms & Call Tree
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">COMPUTER SCIENCE: ${title.toUpperCase().slice(0, 48)}</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Root Node -->
  <circle cx="320" cy="115" r="26" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="320" y="120" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle" fill="#1e40af">Root(n)</text>
  <text x="320" y="80" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#64748b">Initial State</text>

  <!-- Branch Lines -->
  <line x1="300" y1="135" x2="200" y2="190" stroke="#0f172a" stroke-width="2" />
  <line x1="340" y1="135" x2="440" y2="190" stroke="#0f172a" stroke-width="2" />

  <!-- Level 1 Left -->
  <circle cx="200" cy="205" r="24" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="200" y="210" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#15803d">Left(n/2)</text>
  <text x="135" y="210" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#64748b">Subproblem A</text>

  <!-- Level 1 Right -->
  <circle cx="440" cy="205" r="24" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <text x="440" y="210" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#991b1b">Right(n/2)</text>
  <text x="505" y="210" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#64748b">Subproblem B</text>

  <!-- Sub-branch lines -->
  <line x1="185" y1="225" x2="140" y2="280" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3" />
  <line x1="215" y1="225" x2="260" y2="280" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3" />
  <line x1="425" y1="225" x2="380" y2="280" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3" />
  <line x1="455" y1="225" x2="500" y2="280" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3" />

  <!-- Base Cases -->
  <rect x="110" y="280" width="60" height="30" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <text x="140" y="300" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#0f172a">Base</text>

  <rect x="230" y="280" width="60" height="30" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <text x="260" y="300" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#0f172a">Base</text>

  <rect x="350" y="280" width="60" height="30" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <text x="380" y="300" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#0f172a">Base</text>

  <rect x="470" y="280" width="60" height="30" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5" />
  <text x="500" y="300" font-family="monospace" font-size="11" font-weight="700" text-anchor="middle" fill="#0f172a">Base</text>

  <text x="320" y="345" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#2563eb">Computational Complexity: O(log n) or O(n) | Execution Tree Verification</text>
</svg>`;
  }

  // 2. Biology Diagram
  if (domain === 'biology') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">BIOLOGY: CELLULAR STRUCTURE &amp; ORGANELLE SCHEMATIC</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <rect x="120" y="100" width="400" height="230" rx="30" fill="#f0fdf4" stroke="#16a34a" stroke-width="3" />
  <rect x="135" y="115" width="370" height="200" rx="20" fill="#ffffff" stroke="#15803d" stroke-width="1.5" stroke-dasharray="4" />

  <circle cx="250" cy="210" r="45" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <circle cx="250" cy="210" r="18" fill="#fee2e2" stroke="#b91c1c" stroke-width="1.5" />
  <text x="250" y="214" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#991b1b">Nucleolus</text>
  <text x="250" y="270" font-family="system-ui, sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="#0f172a">Nucleus (DNA)</text>

  <ellipse cx="400" cy="160" rx="35" ry="20" fill="#fef3c7" stroke="#d97706" stroke-width="2" />
  <text x="400" y="195" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#b45309">Mitochondrion (ATP)</text>

  <ellipse cx="380" cy="255" rx="50" ry="30" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
  <text x="380" y="259" font-family="system-ui, sans-serif" font-size="11" font-weight="600" text-anchor="middle" fill="#0369a1">Central Vacuole</text>

  <text x="320" y="355" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" fill="#64748b">Outlined Biological Structure with Membrane Transport Pathways</text>
</svg>`;
  }

  // 3. Chemistry Diagram
  if (domain === 'chemistry') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">CHEMISTRY: GALVANIC ELECTROCHEMICAL CELL &amp; SALT BRIDGE</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <rect x="100" y="150" width="160" height="170" rx="6" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" />
  <rect x="105" y="220" width="150" height="95" fill="#e0f2fe" opacity="0.6" />
  <rect x="140" y="120" width="25" height="140" fill="#94a3b8" stroke="#0f172a" stroke-width="2" />
  <text x="152" y="280" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#0f172a">Zn Anode (-)</text>

  <rect x="380" y="150" width="160" height="170" rx="6" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" />
  <rect x="385" y="220" width="150" height="95" fill="#dbeafe" opacity="0.7" />
  <rect x="475" y="120" width="25" height="140" fill="#f97316" stroke="#0f172a" stroke-width="2" />
  <text x="487" y="280" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#ffffff">Cu Cathode (+)</text>

  <path d="M 220 220 L 220 160 Q 220 140 250 140 L 390 140 Q 420 140 420 160 L 420 220" fill="none" stroke="#d97706" stroke-width="12" />
  <text x="320" y="130" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle" fill="#b45309">Salt Bridge (KNO3)</text>

  <text x="320" y="365" font-family="monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#0f172a">Zn(s) + Cu2+(aq) &rarr; Zn2+(aq) + Cu(s) | E&deg;cell = +1.10 V</text>
</svg>`;
  }

  // 4. Default / Universal Schematic
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="100%" height="100%">
  <rect width="640" height="400" fill="#f8fafc" rx="12" />
  <rect x="25" y="25" width="590" height="350" fill="#ffffff" stroke="#0f172a" stroke-width="2" rx="8" />
  <text x="45" y="58" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0f172a">${title.toUpperCase().slice(0, 48)}</text>
  <line x1="45" y1="72" x2="595" y2="72" stroke="#e2e8f0" stroke-width="1.5" />

  <rect x="70" y="110" width="120" height="180" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2" />
  <text x="130" y="140" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#1e40af">1. Given Inputs</text>
  <circle cx="130" cy="195" r="28" fill="#ffffff" stroke="#2563eb" stroke-width="2" />
  <text x="130" y="200" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#1e40af">Params</text>
  <text x="130" y="255" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#1e40af">Conditions</text>

  <polygon points="245,195 260,200 245,205" fill="#0f172a" />
  <line x1="200" y1="200" x2="255" y2="200" stroke="#0f172a" stroke-width="2" />

  <rect x="270" y="110" width="150" height="180" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" />
  <text x="345" y="140" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#15803d">2. Governing Law</text>
  <rect x="285" y="170" width="120" height="50" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" />
  <text x="345" y="200" font-family="monospace" font-size="13" font-weight="700" text-anchor="middle" fill="#15803d">f(x) &rarr; y</text>
  <text x="345" y="255" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#15803d">Transformation</text>

  <polygon points="445,195 460,200 445,205" fill="#0f172a" />
  <line x1="420" y1="200" x2="455" y2="200" stroke="#0f172a" stroke-width="2" />

  <rect x="470" y="110" width="120" height="180" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2" />
  <text x="530" y="140" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#991b1b">3. Verified Output</text>
  <circle cx="530" cy="195" r="28" fill="#ffffff" stroke="#dc2626" stroke-width="2" />
  <text x="530" y="200" font-family="monospace" font-size="14" font-weight="700" text-anchor="middle" fill="#991b1b">Target</text>
  <text x="530" y="255" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" fill="#991b1b">Solution</text>

  <text x="320" y="340" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" fill="#475569">Structured Conceptual Framework for ${title.slice(0, 40)}</text>
</svg>`;
}

// 1. Analyze Fallback: Subject and Concept Aware
export function generateCurriculumAnalysis(params: {
  questionText?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
}): QuestionAnalysis {
  const grade = params.gradeLevel || 'Secondary Level';
  const subject = params.subject || 'Computer Science';
  const qText = params.questionText?.trim() || `Core ${subject} concept query`;
  const domain = detectDomain(subject, qText);

  if (domain === 'cs') {
    const csSub = detectCsSubTopic(qText);

    if (csSub === 'database') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Relational Databases & SQL Normalization',
        difficulty: params.difficulty || 'Intermediate',
        gradeLevel: grade,
        keyConcept: 'Relational Schema Design, Normalization (1NF to 3NF) & Foreign Key Constraints',
        whyTricky: 'Learners struggle to eliminate partial and transitive dependencies (3NF) and often construct accidental Cartesian products instead of proper INNER/LEFT JOINs.',
        formulas: [
          'First Normal Form (1NF): Atomic column values and unique primary key',
          'Second Normal Form (2NF): 1NF + No partial key dependencies on composite keys',
          'Third Normal Form (3NF): 2NF + No transitive non-prime dependencies (X -> Y -> Z)',
          'SQL Syntax: SELECT col FROM A INNER JOIN B ON A.id = B.fk_id WHERE condition;',
        ],
        suggestedDiagramDescription: 'Outlined relational schema showing tables (students, enrollments), primary/foreign key connections, and SQL query breakdown.',
      };
    }

    if (csSub === 'network') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Computer Networks & Layered Protocols',
        difficulty: params.difficulty || 'Intermediate',
        gradeLevel: grade,
        keyConcept: 'OSI / TCP-IP 4-Layer Model, IP Subnetting & Packet Routing',
        whyTricky: 'Students often confuse connection-oriented TCP (reliable, sequencing, flow control) with connectionless UDP, or struggle to calculate subnet broadcast addresses.',
        formulas: [
          'OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application',
          'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK',
          'Subnet Masking: Network ID = IP Address & Subnet Mask (Bitwise AND)',
        ],
        suggestedDiagramDescription: 'Network topology diagram with central switch, workstations, web/DB server, and packet frame header encapsulation.',
      };
    }

    if (csSub === 'os_deadlock') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Operating Systems & Deadlock Resolution',
        difficulty: params.difficulty || 'Advanced',
        gradeLevel: grade,
        keyConcept: 'Process Concurrency, Resource Allocation Graphs & Coffman Deadlock Conditions',
        whyTricky: 'Identifying circular wait conditions in resource allocation graphs and distinguishing between deadlock prevention, avoidance (Banker’s algorithm), and detection.',
        formulas: [
          'Coffman Conditions: 1. Mutual Exclusion  2. Hold & Wait  3. No Preemption  4. Circular Wait',
          'Banker’s Algorithm: Need[i][j] = Max[i][j] - Allocation[i][j] <= Available[j]',
          'Turnaround Time = Completion Time - Arrival Time',
        ],
        suggestedDiagramDescription: 'Resource allocation graph showing processes P1, P2 holding and requesting resources R1, R2 in a circular wait deadlock cycle.',
      };
    }

    if (csSub === 'oop') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Object-Oriented Programming (OOP) & Inheritance',
        difficulty: params.difficulty || 'Intermediate',
        gradeLevel: grade,
        keyConcept: 'Encapsulation, Class Hierarchies, and Polymorphic Method Overriding',
        whyTricky: 'Distinguishing method overriding (runtime polymorphism) from method overloading (compile-time), and understanding access modifiers (private vs protected vs public).',
        formulas: [
          'Class Definition: class Derived extends Base { @Override void method() { ... } }',
          'Polymorphism: Base ref = new Derived(); // Invokes Derived.method() at runtime',
          'Encapsulation: Private state variables accessed via public getters and setters',
        ],
        suggestedDiagramDescription: 'UML class hierarchy diagram with Superclass User and Subclasses Student/Teacher showing attributes, methods, and inheritance links.',
      };
    }

    if (csSub === 'architecture') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Computer Architecture & Digital Logic Gates',
        difficulty: params.difficulty || 'Standard',
        gradeLevel: grade,
        keyConcept: 'Boolean Algebra, Logic Gate Circuits & CPU Fetch-Decode-Execute Cycle',
        whyTricky: 'Learners struggle to simplify composite boolean logic expressions using De Morgan’s laws and evaluate truth tables with inversion bubbles on NAND/NOR gates.',
        formulas: [
          'De Morgan’s Laws: !(A & B) = !A | !B  and  !(A | B) = !A & !B',
          'AND Gate: Y = A & B  |  OR Gate: Y = A | B  |  XOR: Y = (A & !B) | (!A & B)',
          'CPU Performance: Execution Time = Instructions * CPI * Clock Cycle Time',
        ],
        suggestedDiagramDescription: 'Digital logic circuit with AND and OR gates alongside a 4-row Boolean Truth Table.',
      };
    }

    if (csSub === 'data_structures') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Linear Data Structures (Stacks & Queues)',
        difficulty: params.difficulty || 'Intermediate',
        gradeLevel: grade,
        keyConcept: 'Last-In First-Out (LIFO) vs First-In First-Out (FIFO) Memory Access Patterns',
        whyTricky: 'Managing pointer updates in linked structures without orphan memory leaks, and recognizing stack overflow or queue underflow boundary states.',
        formulas: [
          'Stack (LIFO): Push(val) [O(1)], Pop() [O(1)], Top() [O(1)]',
          'Queue (FIFO): Enqueue(val) [O(1)], Dequeue() [O(1)], Front() [O(1)]',
          'Node Linkage: newNode.next = head; head = newNode;',
        ],
        suggestedDiagramDescription: 'Dual memory diagram showing Stack vertical container with LIFO push/pop and Queue horizontal tube with FIFO enqueue/dequeue.',
      };
    }

    if (csSub === 'algorithms') {
      return {
        extractedQuestion: qText,
        subject: 'Computer Science',
        topic: qText.length > 3 ? qText.slice(0, 60) : 'Algorithm Efficiency & Binary Search',
        difficulty: params.difficulty || 'Intermediate',
        gradeLevel: grade,
        keyConcept: 'Divide-and-Conquer Paradigm and Asymptotic Big-O Complexity',
        whyTricky: 'Forgetting that Binary Search strictly requires sorted input data, and causing infinite loops through off-by-one errors in midpoint calculations.',
        formulas: [
          'Midpoint Calculation: mid = low + floor((high - low) / 2)',
          'Binary Search Time Complexity: T(n) = O(log2 n)',
          'Linear vs Binary Search: O(n) vs O(log n)',
        ],
        suggestedDiagramDescription: 'Array partition tree showing sorted interval division at each comparison step.',
      };
    }

    // Default CS
    return {
      extractedQuestion: qText,
      subject: 'Computer Science',
      topic: qText.length > 3 ? qText.slice(0, 60) : 'Computer Science Fundamentals',
      difficulty: params.difficulty || 'Intermediate',
      gradeLevel: grade,
      keyConcept: `Core Computational Principles of ${qText.slice(0, 45)}`,
      whyTricky: 'Understanding the underlying abstraction, boundary conditions, and memory efficiency required in programmatic execution.',
      formulas: [
        'Deterministic Logic: Input -> Transform(state) -> Expected Output',
        'Time & Space Complexity: O(1) < O(log n) < O(n) < O(n log n) < O(n^2)',
        'Defensive Coding: Validate all preconditions and handle exception states',
      ],
      suggestedDiagramDescription: 'Outlined execution and data flow diagram showing input parameters, transformation logic, and verified output.',
    };
  }

  if (domain === 'biology') {
    return {
      extractedQuestion: qText,
      subject: 'Biology',
      topic: qText.length > 3 ? qText.slice(0, 50) : 'Cell Biology & Membrane Transport',
      difficulty: params.difficulty || 'Standard',
      gradeLevel: grade,
      keyConcept: 'Cellular Structure, Membrane Transport, and Physiological Homeostasis',
      whyTricky: 'Learners frequently confuse active transport (requiring ATP) with passive diffusion and osmosis across semi-permeable membranes.',
      formulas: [
        'Photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2',
        'Aerobic Respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + 38 ATP',
        'Water Potential: Psi = Psi_s + Psi_p',
      ],
      suggestedDiagramDescription: 'Outlined cellular anatomy diagram with labeled organelles, nucleus, mitochondria, and transport vectors.',
    };
  }

  if (domain === 'chemistry') {
    return {
      extractedQuestion: qText,
      subject: 'Chemistry',
      topic: qText.length > 3 ? qText.slice(0, 50) : 'Stoichiometry & Reaction Kinetics',
      difficulty: params.difficulty || 'Standard',
      gradeLevel: grade,
      keyConcept: 'Mole Concept, Conservation of Mass, and Electrochemical Potentials',
      whyTricky: 'Students often forget stoichiometric coefficients when balancing mole ratios or calculate molar concentrations with incorrect volumetric units.',
      formulas: [
        'Number of Moles: n = Mass (g) / Molar Mass (g/mol)',
        'Molarity / Concentration: C = n / Volume (dm3)',
        'Standard Cell Potential: E_cell = E_cathode - E_anode',
      ],
      suggestedDiagramDescription: 'Outlined galvanic electrochemical cell with zinc/copper electrodes, salt bridge, and electron flow direction.',
    };
  }

  if (domain === 'agriculture') {
    return {
      extractedQuestion: qText,
      subject: 'Agriculture and Nutrition',
      topic: qText.length > 3 ? qText.slice(0, 50) : 'Soil Conservation & Farming Practices',
      difficulty: params.difficulty || 'Upper Primary / Junior CBE',
      gradeLevel: grade,
      keyConcept: 'Contour Terracing, Organic Mulching, and Sustainable Crop Management',
      whyTricky: 'Learners struggle to differentiate between sheet erosion, rill erosion, and gully erosion, and choose the incorrect conservation barrier.',
      formulas: [
        'Terrace Spacing = Slope Gradient Ratio',
        'Contour Ridge Alignment = Perpendicular to Slope Runoff',
      ],
      suggestedDiagramDescription: 'Cross-section profile of sloped hillside showing contour stone lines, Napier grass buffer strip, and topsoil preservation.',
    };
  }

  // Default / Math / Science
  return {
    extractedQuestion: qText,
    subject: subject,
    topic: qText.length > 3 ? qText.slice(0, 50) : `${subject} Core Principles`,
    difficulty: params.difficulty || 'Standard',
    gradeLevel: grade,
    keyConcept: `Fundamental Laws & Analytical Methodology of ${subject}`,
    whyTricky: `Students frequently stumble when substituting given constraints or verifying dimensional consistency in ${subject}.`,
    formulas: [
      'Governing Relation: Output = Law(Inputs)',
      'Equilibrium Condition: Clockwise Moments = Anticlockwise Moments',
      'Dimensional Homogeneity: Units(Left Hand Side) = Units(Right Hand Side)',
    ],
    suggestedDiagramDescription: `Outlined scientific vector diagram illustrating the key interactions and governing laws in ${subject}.`,
  };
}

// 2. Simple Notes Fallback: Subject and Concept Aware
export function generateCurriculumNotes(params: {
  question: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  topic?: string;
}): SimpleNote {
  const grade = params.gradeLevel || 'Secondary Level';
  const subject = params.subject || 'Computer Science';
  const question = params.question || `Study Problem in ${subject}`;
  const rawTopic = params.topic || question.slice(0, 45) || `${subject} Core Mastery`;
  const domain = detectDomain(subject, question);

  if (domain === 'cs') {
    const csSub = detectCsSubTopic(`${rawTopic} ${question}`);
    const svgDiagram = createSvgDiagram('cs', rawTopic, csSub);

    if (csSub === 'database') {
      const topic = rawTopic.toLowerCase().includes('sql') || rawTopic.toLowerCase().includes('database')
        ? rawTopic
        : `${rawTopic} (Databases & SQL Normalization)`;
      return {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        title: `${topic} - Simplified Revision Notes`,
        subject: 'Computer Science',
        topic,
        gradeLevel: grade,
        estimatedReadTimeMinutes: 5,
        coreConcept: `A Relational Database organizes information into tables with rows and columns, linked by Primary and Foreign Keys. Normalization (1NF, 2NF, 3NF) systematically decomposes tables to eliminate duplicate data, avoid insertion/deletion anomalies, and ensure relational integrity.`,
        commonMisconceptions: [
          'Confusing Primary Keys with Foreign Keys (Primary Key uniquely identifies a row in its own table; Foreign Key references a Primary Key in another table).',
          'Omitting the ON condition in SQL JOINs, which produces a massive Cartesian product (cross-join) instead of matching related rows.',
          'Believing storing repeated text across multiple rows is harmless (it causes update anomalies and wastes disk space).',
        ],
        blueprintSteps: [
          {
            stepNumber: 1,
            title: 'Identify Entities, Primary Keys & Attributes',
            explanation: 'List each distinct real-world entity (e.g. Students, Courses) and assign an immutable unique Primary Key (PK).',
            proTip: 'Use integer auto-increment IDs for clean, fast indexing.',
          },
          {
            stepNumber: 2,
            title: 'Apply 1NF (Atomicity) and 2NF (No Partial Key Dependencies)',
            explanation: 'Ensure all attribute values are atomic (no comma-separated lists), and every non-key column depends on the whole primary key.',
            proTip: 'If a table has a composite primary key (A, B), verify that no column depends on only A or only B.',
          },
          {
            stepNumber: 3,
            title: 'Enforce 3NF (Eliminate Transitive Dependencies)',
            explanation: 'Remove non-key columns that depend on other non-key columns (e.g. Department Name depending on Department ID).',
            proTip: 'Move the dependent attributes into their own separate table and reference it via Foreign Key.',
          },
          {
            stepNumber: 4,
            title: 'Formulate Optimized SQL Queries with Constraints',
            explanation: 'Write clean SELECT, INNER JOIN, and WHERE clauses, adding foreign key CASCADE constraints to prevent orphaned records.',
            proTip: 'Always filter with WHERE before aggregating with GROUP BY.',
          },
        ],
        workedSolution: {
          problemRestatement: question,
          steps: [
            'Step 1: Deconstruct the problem requirements and identify the involved database tables and fields.',
            'Step 2: Check relational constraints (verify Primary Key uniqueness and Foreign Key relationships).',
            'Step 3: Construct the SQL query or schema structure with appropriate data types and JOIN conditions.',
            'Step 4: Verify that no anomalies (insertion, update, deletion) can occur under normalized design.',
          ],
          finalAnswer: 'Normalized 3NF relational schema established with enforced referential integrity and optimized SQL queries.',
          keyTakeaway: 'Always normalize up to 3NF to prevent duplicate data, and always join on Primary Key = Foreign Key.',
        },
        keyFormulas: [
          {
            name: 'SQL Inner Join',
            formula: 'SELECT cols FROM TableA A INNER JOIN TableB B ON A.id = B.table_a_id;',
            explanation: 'Combines matching records from both tables where the relational key aligns.',
          },
          {
            name: 'Third Normal Form (3NF) Rule',
            formula: 'X -> Y is valid if X is a superkey OR Y is part of a candidate key',
            explanation: 'Guarantees no transitive dependency between non-key attributes.',
          },
        ],
        cheatSheetBullets: [
          'Primary Key (PK) = Unique identifier for each row in a table.',
          'Foreign Key (FK) = Column referencing a Primary Key in another table.',
          '1NF = Atomic values only; 2NF = No partial dependency; 3NF = No transitive dependency.',
          'ACID = Atomicity, Consistency, Isolation, Durability for reliable transactions.',
        ],
        outlinedDiagram: {
          title: 'Relational Database Schema & SQL Normalization',
          description: 'Vector schema diagram showing normalized tables, PK-FK connectors, and SQL syntax.',
          svgCode: svgDiagram,
        },
        selfCheckDrill: [
          {
            question: 'What is the primary objective of normalizing a database to Third Normal Form (3NF)?',
            options: [
              'To increase the file size on the hard disk',
              'To eliminate transitive functional dependencies and reduce redundant data',
              'To combine all tables into a single giant flat file',
              'To disable all security permissions',
            ],
            correctIndex: 1,
            explanation: '3NF ensures that non-key attributes depend only on the primary key, eliminating duplicate records and update anomalies.',
          },
          {
            question: 'What happens if you execute a SQL SELECT query joining two tables without an ON clause?',
            options: [
              'The query generates an error immediately in all SQL engines',
              'It produces a Cartesian product (cross join), combining every row of table A with every row of table B',
              'It automatically deletes all records from both tables',
              'It sorts the records alphabetically by default',
            ],
            correctIndex: 1,
            explanation: 'Without a join condition, relational databases compute a Cartesian product, multiplying row counts.',
          },
        ],
      };
    }

    if (csSub === 'network') {
      const topic = rawTopic.toLowerCase().includes('network') ? rawTopic : `${rawTopic} (Networking & Protocols)`;
      return {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        title: `${topic} - Simplified Revision Notes`,
        subject: 'Computer Science',
        topic,
        gradeLevel: grade,
        estimatedReadTimeMinutes: 5,
        coreConcept: `Computer Networks allow autonomous devices to exchange data using standardized protocols. Data is partitioned into packets containing headers (source/destination IP, port, sequence numbers) and payload, traveling through physical and logical network layers from sender to receiver.`,
        commonMisconceptions: [
          'Confusing IP addresses (logical, Layer 3 network routing) with MAC addresses (physical hardware, Layer 2 local framing).',
          'Assuming TCP and UDP are interchangeable (TCP is reliable and guarantees packet delivery order; UDP is fast and connectionless, ideal for video streaming).',
          'Believing routers and switches do the same thing (switches forward frames inside a LAN using MAC addresses; routers route packets between different networks using IP addresses).',
        ],
        blueprintSteps: [
          {
            stepNumber: 1,
            title: 'Identify the Communication Layer & Protocol',
            explanation: 'Determine whether the problem relates to the Application (HTTP/DNS), Transport (TCP/UDP), Network (IP), or Data Link layer.',
            proTip: 'Remember the acronym: Please Do Not Throw Sausage Pizza Away (Physical to Application).',
          },
          {
            stepNumber: 2,
            title: 'Trace Packet Encapsulation & Header Fields',
            explanation: 'Follow data as headers are prepended on transmission and stripped upon arrival.',
            proTip: 'Transport layer adds Port numbers; Network layer adds IP addresses.',
          },
          {
            stepNumber: 3,
            title: 'Analyze Network Topology & Device Roles',
            explanation: 'Identify the topology (Star, Mesh, Bus) and the forwarding role of Switches, Routers, and Gateways.',
            proTip: 'In a Star topology, failure of a single cable only disconnects one node, not the whole network.',
          },
          {
            stepNumber: 4,
            title: 'Verify Bandwidth, Latency & Error Checking',
            explanation: 'Check packet acknowledgment (ACK) mechanisms and calculate round-trip time (RTT) or checksum verification.',
            proTip: 'TCP automatically retransmits lost packets when sequence acknowledgments time out.',
          },
        ],
        workedSolution: {
          problemRestatement: question,
          steps: [
            'Step 1: Identify the communicating nodes, protocol requirements, and target network configuration.',
            'Step 2: Inspect packet addressing (Source/Destination IP and Port numbers).',
            'Step 3: Trace transmission pathway across switches, routers, and firewalls.',
            'Step 4: Verify error-checking protocols and confirm delivery acknowledgment.',
          ],
          finalAnswer: 'Structured networking model verified with proper protocol layering and packet routing.',
          keyTakeaway: 'Routers connect different networks using IP addresses; switches connect local devices using MAC addresses.',
        },
        keyFormulas: [
          {
            name: 'TCP 3-Way Handshake',
            formula: '1. Client -> SYN | 2. Server -> SYN-ACK | 3. Client -> ACK',
            explanation: 'Establishes a reliable, bidirectional connection before transmitting payload data.',
          },
          {
            name: 'Throughput Relation',
            formula: 'Throughput (bps) = Data Size (bits) / Transfer Time (seconds)',
            explanation: 'Measures effective transmission rate over a network channel.',
          },
        ],
        cheatSheetBullets: [
          'IP Address = Logical network address (e.g. 192.168.1.1).',
          'MAC Address = 48-bit unique hardware address burned into the NIC.',
          'TCP = Reliable, ordered, connection-oriented (HTTP, Email).',
          'UDP = Fast, connectionless, no retransmission (Streaming, Gaming, DNS).',
        ],
        outlinedDiagram: {
          title: 'Computer Network Topology & Packet Transmission',
          description: 'Vector diagram showing router gateway, switch, client nodes, server, and packet frame header breakdown.',
          svgCode: svgDiagram,
        },
        selfCheckDrill: [
          {
            question: 'Which network protocol ensures that packets arrive in correct order and retransmits lost data?',
            options: [
              'UDP (User Datagram Protocol)',
              'TCP (Transmission Control Protocol)',
              'IP (Internet Protocol)',
              'ARP (Address Resolution Protocol)',
            ],
            correctIndex: 1,
            explanation: 'TCP uses sequence numbers and ACK acknowledgments to guarantee complete, in-order packet delivery.',
          },
          {
            question: 'What is the primary role of a router in a computer network?',
            options: [
              'To amplify electrical signals along a single wire',
              'To forward data packets between different IP networks using logical routing tables',
              'To permanently store user passwords in plaintext',
              'To display web pages on client screens',
            ],
            correctIndex: 1,
            explanation: 'Routers operate at Layer 3 (Network Layer) and direct traffic between distinct networks based on IP addresses.',
          },
        ],
      };
    }

    if (csSub === 'os_deadlock') {
      const topic = rawTopic.toLowerCase().includes('deadlock') ? rawTopic : `${rawTopic} (Operating Systems & Deadlock)`;
      return {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        title: `${topic} - Simplified Revision Notes`,
        subject: 'Computer Science',
        topic,
        gradeLevel: grade,
        estimatedReadTimeMinutes: 5,
        coreConcept: `In multi-threaded and multi-process operating systems, Deadlock is a state where a set of processes are permanently blocked because each process holds a resource that another process needs. Without intervention, none of the processes can ever proceed.`,
        commonMisconceptions: [
          'Confusing Deadlock (all processes permanently waiting) with Starvation (one low-priority process is indefinitely delayed while others make progress).',
          'Assuming having multiple CPU cores prevents deadlocks (deadlocks are caused by resource locking logic, not CPU clock speeds).',
          'Believing deadlocks can resolve themselves without operating system intervention or process termination.',
        ],
        blueprintSteps: [
          {
            stepNumber: 1,
            title: 'Verify the 4 Necessary Coffman Conditions',
            explanation: 'Check whether Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait are all simultaneously active.',
            proTip: 'Breaking ANY ONE of these 4 conditions guarantees that deadlock cannot occur.',
          },
          {
            stepNumber: 2,
            title: 'Construct the Resource Allocation Graph (RAG)',
            explanation: 'Draw circles for Processes and rectangles for Resources. Draw allocation arrows (Resource -> Process) and request arrows (Process -> Resource).',
            proTip: 'A cycle in a single-instance resource graph is a definitive indicator of deadlock.',
          },
          {
            stepNumber: 3,
            title: 'Apply Deadlock Prevention / Avoidance',
            explanation: 'Enforce strict resource ordering hierarchy (preventing circular wait) or use Banker’s Algorithm to test safe states before granting requests.',
            proTip: 'Require processes to acquire all resources at once or release current locks before acquiring new ones.',
          },
          {
            stepNumber: 4,
            title: 'Define Recovery Protocols (Detection & Preemption)',
            explanation: 'If deadlock occurs, terminate the lowest-cost process or roll back to a prior checkpoint to release locks.',
            proTip: 'Implement timeout thresholds on mutex locks so threads release resources if blocked too long.',
          },
        ],
        workedSolution: {
          problemRestatement: question,
          steps: [
            'Step 1: Identify the processes, shared mutex locks/resources, and requested access order.',
            'Step 2: Trace lock acquisition sequence to detect circular wait dependency.',
            'Step 3: Analyze whether the state is safe or unsafe using allocation vectors.',
            'Step 4: Propose a deadlock prevention mechanism (e.g. strict global resource numbering).',
          ],
          finalAnswer: 'Deadlock cycle analyzed and resolved by breaking circular wait through hierarchical resource acquisition.',
          keyTakeaway: 'Deadlock requires 4 conditions simultaneously; breaking circular wait with consistent lock ordering prevents deadlocks permanently.',
        },
        keyFormulas: [
          {
            name: 'Coffman 4 Conditions',
            formula: 'Deadlock <=> (MutualExclusion AND HoldAndWait AND NoPreemption AND CircularWait)',
            explanation: 'All four must hold true for a system to enter a deadlocked state.',
          },
          {
            name: 'Banker’s Safety Check',
            formula: 'Need <= Available, then Available = Available + Allocation',
            explanation: 'Tests whether all processes can successfully finish without deadlocking.',
          },
        ],
        cheatSheetBullets: [
          'Deadlock = Permanent freeze where processes wait on each other’s locks.',
          'Starvation = Process delayed indefinitely due to unfair scheduling.',
          'Resource Allocation Graph = Cycle indicates deadlock in single-unit resources.',
          'Prevention = Impose global ordering on all lock acquisitions.',
        ],
        outlinedDiagram: {
          title: 'Operating Systems Concurrency & Deadlock Cycle',
          description: 'Resource allocation graph showing processes holding and requesting resources in a circular wait.',
          svgCode: svgDiagram,
        },
        selfCheckDrill: [
          {
            question: 'Which of the following is NOT one of the four necessary Coffman conditions for deadlock?',
            options: [
              'Mutual Exclusion',
              'Hold and Wait',
              'Fast Clock Speed',
              'Circular Wait',
            ],
            correctIndex: 2,
            explanation: 'Hardware clock speed has no bearing on deadlock; the four conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait.',
          },
          {
            question: 'How does imposing a global ordering on all resource acquisitions prevent deadlocks?',
            options: [
              'It speeds up hard drive read times',
              'It completely eliminates the possibility of a Circular Wait cycle',
              'It turns off the CPU cooling fan',
              'It bypasses operating system security',
            ],
            correctIndex: 1,
            explanation: 'If processes must always request resources in strictly ascending numerical order, circular wait cycles become mathematically impossible.',
          },
        ],
      };
    }

    if (csSub === 'oop') {
      const topic = rawTopic.toLowerCase().includes('oop') ? rawTopic : `${rawTopic} (Object-Oriented Programming)`;
      return {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        title: `${topic} - Simplified Revision Notes`,
        subject: 'Computer Science',
        topic,
        gradeLevel: grade,
        estimatedReadTimeMinutes: 5,
        coreConcept: `Object-Oriented Programming (OOP) models software systems around "Objects" that bundle data (attributes) with behavior (methods). The four core pillars are Encapsulation (hiding internal state), Abstraction (simplifying interface), Inheritance (reusing code across parent-child hierarchies), and Polymorphism (enabling different classes to respond to the same method call in specialized ways).`,
        commonMisconceptions: [
          'Confusing a Class with an Object (a Class is the blueprint/template; an Object is a concrete instance living in memory).',
          'Confusing Method Overriding with Method Overloading (Overloading = same method name with different parameters in the same class; Overriding = subclass re-defining parent method).',
          'Breaking encapsulation by making all attributes public instead of using private fields with validated getters/setters.',
        ],
        blueprintSteps: [
          {
            stepNumber: 1,
            title: 'Define Class Blueprint with Encapsulated State',
            explanation: 'Declare private instance fields to protect data integrity, exposing only essential public methods.',
            proTip: 'Never allow direct external mutation of internal list or balance variables.',
          },
          {
            stepNumber: 2,
            title: 'Establish Inheritance ("is-a" Relationships)',
            explanation: 'Identify common attributes/methods in a Superclass and use "extends" in Subclasses to reuse logic.',
            proTip: 'Prefer composition ("has-a") over inheritance when relationships are not strictly hierarchical.',
          },
          {
            stepNumber: 3,
            title: 'Implement Polymorphic Method Overriding',
            explanation: 'Define abstract or virtual methods in the base class and override them in derived classes with specialized behavior.',
            proTip: 'Annotate overridden methods with @Override to catch signature typos at compile time.',
          },
          {
            stepNumber: 4,
            title: 'Instantiate and Execute via Polymorphic References',
            explanation: 'Reference subclass objects using their superclass or interface type to build flexible, modular code.',
            proTip: 'Example: List<Shape> shapes = [new Circle(), new Rectangle()]; shapes.forEach(s -> s.draw());',
          },
        ],
        workedSolution: {
          problemRestatement: question,
          steps: [
            'Step 1: Identify domain entities, their attributes, and their operational methods.',
            'Step 2: Organize classes into an inheritance hierarchy with encapsulated data.',
            'Step 3: Implement concrete constructors and override target polymorphic methods.',
            'Step 4: Instantiate objects and verify runtime polymorphic dispatch.',
          ],
          finalAnswer: 'Robust object-oriented architecture designed adhering to Encapsulation, Inheritance, and Polymorphism.',
          keyTakeaway: 'Always encapsulate state with private fields and use polymorphic interfaces to write maintainable code.',
        },
        keyFormulas: [
          {
            name: 'Class Inheritance Syntax',
            formula: 'class SubClass extends SuperClass { ... }',
            explanation: 'Subclass inherits all non-private fields and methods from the superclass.',
          },
          {
            name: 'Polymorphic Dispatch',
            formula: 'SuperClass obj = new SubClass(); obj.method();',
            explanation: 'Calls the SubClass overridden implementation at runtime based on the actual object type.',
          },
        ],
        cheatSheetBullets: [
          'Class = Template/Blueprint; Object = Instance in RAM.',
          'Encapsulation = Private attributes + public accessors.',
          'Inheritance = Reusing common code in superclasses ("is-a").',
          'Polymorphism = One interface, multiple concrete implementations.',
        ],
        outlinedDiagram: {
          title: 'Object-Oriented Programming UML Class Diagram',
          description: 'UML diagram illustrating superclass, subclasses, inheritance connectors, attributes, and methods.',
          svgCode: svgDiagram,
        },
        selfCheckDrill: [
          {
            question: 'What is the primary difference between Method Overloading and Method Overriding?',
            options: [
              'There is no difference; they are exact synonyms',
              'Overloading occurs in the same class with different parameters; Overriding occurs in a subclass with the exact same signature',
              'Overloading deletes the method from memory',
              'Overriding is only allowed in functional programming',
            ],
            correctIndex: 1,
            explanation: 'Overloading is compile-time polymorphism within one class; Overriding is runtime polymorphism across an inheritance hierarchy.',
          },
          {
            question: 'Why is Encapsulation considered a best practice in software engineering?',
            options: [
              'It makes programs run 100 times faster',
              'It hides internal state and prevents unauthorized direct modification of object data',
              'It converts source code into machine code without an interpreter',
              'It removes all memory limitations',
            ],
            correctIndex: 1,
            explanation: 'Encapsulation safeguards internal state by requiring interactions to pass through validated public methods.',
          },
        ],
      };
    }

    // Default CS
    const topic = rawTopic;
    return {
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: `${topic} - Simplified Computer Science Notes`,
      subject: 'Computer Science',
      topic,
      gradeLevel: grade,
      estimatedReadTimeMinutes: 5,
      coreConcept: `In Computer Science, "${topic}" represents a foundational computational concept. By breaking the system down into input parameters, deterministic state transformations, and output validation, complex algorithms and systems become manageable and provably correct.`,
      commonMisconceptions: [
        'Assuming code executes without considering memory boundaries and system resources.',
        'Overlooking boundary edge cases such as empty inputs, zero values, or maximum array indexes.',
        'Failing to isolate distinct computational responsibilities into modular procedures.',
      ],
      blueprintSteps: [
        {
          stepNumber: 1,
          title: 'Analyze Preconditions & Constraints',
          explanation: `Clarify all input data types, value ranges, and system constraints for "${topic}".`,
          proTip: 'Write down two sample test cases with expected outputs before implementing the logic.',
        },
        {
          stepNumber: 2,
          title: 'Define Deterministic State Transitions',
          explanation: 'Establish the exact logical steps or instructions needed to transition from the initial state to the target state.',
          proTip: 'Trace variable changes line-by-line on paper or in a dry-run table.',
        },
        {
          stepNumber: 3,
          title: 'Optimize Time & Space Complexity',
          explanation: 'Review the approach to ensure minimal unnecessary loops or redundant memory allocations.',
          proTip: 'Look for opportunities to replace nested loops with hash lookups or binary search.',
        },
        {
          stepNumber: 4,
          title: 'Validate Output & Handle Edge Cases',
          explanation: 'Verify that all terminal conditions correctly halt execution and return valid outputs.',
          proTip: 'Check zero, null, single-element, and maximum capacity inputs.',
        },
      ],
      workedSolution: {
        problemRestatement: question,
        steps: [
          'Step 1: Parse the problem requirements and identify the computational target.',
          'Step 2: Formulate the governing algorithm or system architecture.',
          'Step 3: Execute step-by-step logic tracing all states and variables.',
          'Step 4: Confirm output accuracy and compute algorithmic complexity.',
        ],
        finalAnswer: `Correct solution verified for ${topic} with optimal efficiency and validated boundary handling.`,
        keyTakeaway: 'Always verify edge cases first, trace states systematically, and measure algorithmic complexity.',
      },
      keyFormulas: [
        {
          name: 'Big-O Growth Hierarchy',
          formula: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
          explanation: 'Standard ordering of algorithmic time and space complexity growth rates.',
        },
        {
          name: 'Deterministic State Function',
          formula: 'State(t + 1) = Transition(State(t), Input)',
          explanation: 'The mathematical foundation of computational systems and state machines.',
        },
      ],
      cheatSheetBullets: [
        'Always validate input boundaries before starting computations.',
        'Dry-run algorithms with simple test cases to verify logic.',
        'Keep procedures modular and focused on a single responsibility.',
        'Measure Big-O complexity for both execution time and memory consumption.',
      ],
      outlinedDiagram: {
        title: `${topic} Conceptual Architecture`,
        description: 'Outlined vector diagram illustrating input conditions, transformation logic, and verified outputs.',
        svgCode: svgDiagram,
      },
      selfCheckDrill: [
        {
          question: `What is the most effective approach to debugging complex logic in ${topic}?`,
          options: [
            'Delete the codebase and start over randomly',
            'Dry-run inputs line-by-line using a trace table and verify boundary conditions',
            'Ignore compiler warnings',
            'Guess the output without running the algorithm',
          ],
          correctIndex: 1,
          explanation: 'Systematic trace tables reveal off-by-one errors and state discrepancies immediately.',
        },
        {
          question: 'Why is asymptotic complexity (Big-O) used to measure algorithms?',
          options: [
            'Because it measures the physical weight of the computer',
            'It describes how resource consumption scales as input size (n) grows towards infinity, independent of hardware',
            'It is purely decorative',
            'It measures the electricity cost per kilowatt hour',
          ],
          correctIndex: 1,
          explanation: 'Big-O characterizes scaling efficiency across different computer architectures and speeds.',
        },
      ],
    };
  }

  // General / Subject-tailored fallback
  const topic = rawTopic;
  const svgDiagram = createSvgDiagram(domain, `${subject}: ${topic}`);

  return {
    id: `note-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `${topic} - Simplified Revision Notes`,
    subject: subject,
    topic: topic,
    gradeLevel: grade,
    estimatedReadTimeMinutes: 5,
    coreConcept: `This lesson breaks down "${topic}" in ${subject}. By focusing on the core laws and relationship between known variables, you can approach any exam question in this subject with confidence and structured logic.`,
    commonMisconceptions: [
      `Rushing into calculations or writing answers before reading the full question in ${subject}.`,
      'Omitting units or scientific terminology required by official CBE grading guidelines.',
      'Failing to verify the final result against real-world physical constraints.',
    ],
    blueprintSteps: [
      {
        stepNumber: 1,
        title: 'Extract Given Parameters and Define the Target',
        explanation: `Carefully read the problem in ${subject}, listing all provided values, constraints, and the target unknown.`,
        proTip: 'Highlight keywords and verify all measurement units before starting.',
      },
      {
        stepNumber: 2,
        title: 'State the Governing Law or Principle',
        explanation: `Write out the standard law, rule, or formula in ${subject} before substituting numerical values.`,
        proTip: 'Writing the formula first guarantees method marks in national examinations.',
      },
      {
        stepNumber: 3,
        title: 'Perform Step-by-Step Substitution & Reasoning',
        explanation: 'Work through the solution cleanly, showing every algebraic or logical transition.',
        proTip: 'Keep your working neatly organized to avoid careless slips.',
      },
      {
        stepNumber: 4,
        title: 'Verify Results and Attach Units',
        explanation: 'State the final answer clearly with appropriate units and conduct a sanity check.',
        proTip: 'Ask yourself: Does this answer make physical and logical sense?',
      },
    ],
    workedSolution: {
      problemRestatement: question,
      steps: [
        'Step 1: Identify given facts and define the unknown.',
        'Step 2: Apply the governing principle for this topic.',
        'Step 3: Simplify expressions systematically.',
        'Step 4: Check boundary conditions and write the final statement.',
      ],
      finalAnswer: `Systematic resolution of ${topic} conforming to curriculum criteria.`,
      keyTakeaway: `Always state the governing principle first, show clear working, and verify units.`,
    },
    keyFormulas: [
      {
        name: `Core Principle of ${subject}`,
        formula: 'Output = GoverningRelation(Inputs)',
        explanation: 'The fundamental relation connecting known parameters to the target result.',
      },
    ],
    cheatSheetBullets: [
      `Identify knowns and targets immediately.`,
      `Show full working for method marks in ${subject}.`,
      `Double-check diagrams and labeling.`,
    ],
    outlinedDiagram: {
      title: `${topic} Outlined Schematic`,
      description: `Subject schematic diagram for ${subject}.`,
      svgCode: svgDiagram,
    },
    selfCheckDrill: [
      {
        question: `What is the most effective first step when analyzing a problem in ${subject}?`,
        options: [
          'Guess the final answer',
          'Identify given parameters, constraints, and governing laws',
          'Skip the question',
          'Use arbitrary numbers',
        ],
        correctIndex: 1,
        explanation: 'Listing knowns and governing laws prevents mistakes and secures method marks.',
      },
      {
        question: `Why is clear step-by-step working critical in standardized assessments?`,
        options: [
          'It allows examiners to award partial method marks even if a minor arithmetic slip occurs',
          'It is purely decorative',
          'It has no impact on scores',
          'Working is strictly forbidden',
        ],
        correctIndex: 0,
        explanation: 'National assessment schemes award distinct Method (M) and Accuracy (A) marks.',
      },
    ],
  };
}

// 3. Standard Exam Fallback: Subject and Concept Aware
export function generateCurriculumExam(params: {
  question?: string;
  subject?: string;
  gradeLevel?: string;
  difficulty?: string;
  examType?: string;
}): StandardExam {
  const grade = params.gradeLevel || 'Secondary Level';
  const subject = params.subject || 'Computer Science';
  const rawTopic = params.question?.slice(0, 50) || `${subject} Assessment`;
  const domain = detectDomain(subject, rawTopic);

  const paperCode = `EXAM-${subject.slice(0, 3).toUpperCase()}-2026`;
  const paperTitle = `${subject.toUpperCase()} STANDARDIZED EXAMINATION PAPER`;

  if (domain === 'cs') {
    const csSub = detectCsSubTopic(rawTopic);
    const examSvg = createSvgDiagram('cs', rawTopic, csSub);

    if (csSub === 'database') {
      return {
        id: `exam-${Date.now()}`,
        createdAt: new Date().toISOString(),
        paperTitle,
        paperSubtitle: `${subject.toUpperCase()} • RELATIONAL DATABASES & SQL ASSESSMENT`,
        paperCode,
        subject,
        gradeLevel: grade,
        durationMinutes: 60,
        totalMarks: 50,
        candidateInstructions: [
          'Write your Candidate Name and Index Number clearly.',
          'Answer ALL questions in Section A, Section B, and Section C.',
          'All SQL queries must conform to standard ANSI SQL syntax.',
          'Diagrams must be neatly labeled with Primary and Foreign Keys indicated.',
        ],
        formulaSheet: [
          {
            quantity: 'Third Normal Form (3NF) Condition',
            formula: 'For any functional dependency X -> Y, X must be a superkey or Y must be a prime attribute',
            notes: 'Eliminates transitive dependencies across tables',
          },
          {
            quantity: 'Relational Join Condition',
            formula: 'FROM A INNER JOIN B ON A.primary_key = B.foreign_key',
            notes: 'Ensures relational referential consistency without Cartesian products',
          },
        ],
        sections: [
          {
            sectionLetter: 'A',
            sectionTitle: 'Foundational Knowledge & SQL Syntax',
            sectionInstructions: 'Answer all questions in this section (15 Marks).',
            sectionTotalMarks: 15,
            questions: [
              {
                id: 'db-q1',
                questionNumber: '1',
                text: 'Explain the essential distinction between a Primary Key and a Foreign Key in a relational database management system (RDBMS).',
                questionType: 'short_answer',
                marks: 4,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
              {
                id: 'db-q2',
                questionNumber: '2',
                text: 'Which normal form requires that all non-key attributes are fully functionally dependent on the entire composite primary key, with zero partial dependencies?',
                questionType: 'mcq',
                marks: 2,
                options: [
                  'A: First Normal Form (1NF)',
                  'B: Second Normal Form (2NF)',
                  'C: Third Normal Form (3NF)',
                  'D: Boyce-Codd Normal Form (BCNF)',
                ],
                hasDiagram: false,
              },
              {
                id: 'db-q3',
                questionNumber: '3',
                text: 'State the four ACID properties of database transactions and briefly describe what Atomicity guarantees.',
                questionType: 'short_answer',
                marks: 4,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
              {
                id: 'db-q4',
                questionNumber: '4',
                text: 'Write a standard SQL query to display the student_id and exam_score of all students in table "enrollments" who scored greater than or equal to 75, sorted in descending order of score.',
                questionType: 'short_answer',
                marks: 5,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
            ],
          },
          {
            sectionLetter: 'B',
            sectionTitle: 'Structured Schema Normalization & Query Design',
            sectionInstructions: 'Study Figure 1 and show all working clearly (20 Marks).',
            sectionTotalMarks: 20,
            questions: [
              {
                id: 'db-q5',
                questionNumber: '5',
                text: 'Study the vector schema diagram provided in Figure 1 below. (a) Identify the Primary Key of the "students" table and the Foreign Key of the "enrollments" table. (b) Explain what an orphaned record is and how Foreign Key CASCADE constraints prevent it. (c) Write an SQL query using an INNER JOIN to retrieve each student’s first_name alongside their course_code and exam_score.',
                questionType: 'structured',
                marks: 10,
                hasDiagram: true,
                diagramTitle: 'Figure 1: Normalized Relational Schema & Foreign Key Connector',
                diagramSvg: examSvg,
                suggestedWorkingLines: 10,
              },
              {
                id: 'db-q6',
                questionNumber: '6',
                text: 'A school stores data in an unnormalized table: Student_Records(StudentID, StudentName, CourseCode, CourseTitle, LecturerName, LecturerOffice). (a) Identify the transitive dependency present in this table. (b) Decompose this table step-by-step into Third Normal Form (3NF), listing the resulting tables and their respective primary/foreign keys.',
                questionType: 'structured',
                marks: 10,
                hasDiagram: false,
                suggestedWorkingLines: 8,
              },
            ],
          },
          {
            sectionLetter: 'C',
            sectionTitle: 'Enterprise Database System Scenario',
            sectionInstructions: 'Answer the extended architectural question (15 Marks).',
            sectionTotalMarks: 15,
            questions: [
              {
                id: 'db-q7',
                questionNumber: '7',
                text: 'A Kenyan county health center requires an automated medical records and inventory system. (a) Design an Entity-Relationship (ER) diagram outline with four entities: Patient, Doctor, Appointment, and Medication. (b) Formulate the data dictionary specifying data types and integrity constraints for each table. (c) Evaluate the security measures needed to protect sensitive patient records against SQL injection and unauthorized data exfiltration.',
                questionType: 'extended',
                marks: 15,
                hasDiagram: false,
                suggestedWorkingLines: 14,
              },
            ],
          },
        ],
        markingScheme: [
          {
            questionNumber: '1',
            modelAnswer: 'Primary Key uniquely identifies each tuple/row within its own relation. Foreign Key is an attribute in one table that references the Primary Key of another table, enforcing referential integrity.',
            gradingBreakdown: [
              { code: 'B2', criterion: 'Clear definition of Primary Key uniqueness', allocatedMarks: 2 },
              { code: 'B2', criterion: 'Clear definition of Foreign Key and referential integrity', allocatedMarks: 2 },
            ],
            examinerTips: 'Do not award full marks if the candidate claims Foreign Keys can only reference columns with the same name.',
          },
          {
            questionNumber: '2',
            modelAnswer: 'Option B: Second Normal Form (2NF).',
            gradingBreakdown: [
              { code: 'A1', criterion: 'Correct option selected', allocatedMarks: 2 },
            ],
            examinerTips: '2NF specifically targets elimination of partial functional dependencies.',
          },
          {
            questionNumber: '5',
            modelAnswer: '(a) PK: student_id in students table; FK: student_id in enrollments table. (b) Orphaned record occurs when a child row references a non-existent parent ID. ON DELETE CASCADE automatically removes child records when the parent is deleted. (c) SELECT s.first_name, e.course_code, e.exam_score FROM students s INNER JOIN enrollments e ON s.student_id = e.student_id;',
            gradingBreakdown: [
              { code: 'B2', criterion: 'Correct identification of PK and FK', allocatedMarks: 2 },
              { code: 'B3', criterion: 'Explanation of orphaned records and CASCADE behavior', allocatedMarks: 3 },
              { code: 'A5', criterion: 'Accurate SQL INNER JOIN syntax with matching ON condition', allocatedMarks: 5 },
            ],
            examinerTips: 'Reward aliases (s, e) and correct dot notation.',
          },
        ],
      };
    }

    if (csSub === 'network') {
      return {
        id: `exam-${Date.now()}`,
        createdAt: new Date().toISOString(),
        paperTitle,
        paperSubtitle: `${subject.toUpperCase()} • NETWORKING & PROTOCOLS ASSESSMENT`,
        paperCode,
        subject,
        gradeLevel: grade,
        durationMinutes: 60,
        totalMarks: 50,
        candidateInstructions: [
          'Write your Candidate Name and Index Number clearly.',
          'Answer ALL questions in Section A, Section B, and Section C.',
          'Show all calculations for subnetting and transmission rates.',
        ],
        formulaSheet: [
          {
            quantity: 'Subnet Usable Hosts',
            formula: 'H = 2^(32 - prefix) - 2',
            notes: 'Excludes network ID and broadcast address',
          },
          {
            quantity: 'Throughput',
            formula: 'R = Data Transferred / Time Elapsed',
            notes: 'Measured in bits per second (bps)',
          },
        ],
        sections: [
          {
            sectionLetter: 'A',
            sectionTitle: 'Network Fundamentals & Protocols',
            sectionInstructions: 'Answer all questions in this section (15 Marks).',
            sectionTotalMarks: 15,
            questions: [
              {
                id: 'net-q1',
                questionNumber: '1',
                text: 'Explain the functional differences between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol), citing an appropriate application for each.',
                questionType: 'short_answer',
                marks: 4,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
              {
                id: 'net-q2',
                questionNumber: '2',
                text: 'Which layer of the OSI 7-layer reference model is responsible for logical IP addressing and packet routing across intermediate networks?',
                questionType: 'mcq',
                marks: 2,
                options: [
                  'A: Layer 2 - Data Link Layer',
                  'B: Layer 3 - Network Layer',
                  'C: Layer 4 - Transport Layer',
                  'D: Layer 7 - Application Layer',
                ],
                hasDiagram: false,
              },
              {
                id: 'net-q3',
                questionNumber: '3',
                text: 'Given the IPv4 address 192.168.10.45/26, determine: (a) The subnet mask in dotted-decimal notation. (b) The total number of usable host addresses in this subnet.',
                questionType: 'short_answer',
                marks: 5,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
              {
                id: 'net-q4',
                questionNumber: '4',
                text: 'State two advantages and two disadvantages of a Star network topology compared to a Mesh network topology.',
                questionType: 'short_answer',
                marks: 4,
                hasDiagram: false,
                suggestedWorkingLines: 4,
              },
            ],
          },
          {
            sectionLetter: 'B',
            sectionTitle: 'Network Architecture & Packet Tracing',
            sectionInstructions: 'Study Figure 1 and show all calculations (20 Marks).',
            sectionTotalMarks: 20,
            questions: [
              {
                id: 'net-q5',
                questionNumber: '5',
                text: 'Study Figure 1 below. (a) Trace the step-by-step path taken by a packet sent from Workstation A to the Web & DB Server. (b) Explain how the switch learns and populates its MAC address table. (c) Describe the role of the Firewall in filtering ingress and egress network traffic.',
                questionType: 'structured',
                marks: 10,
                hasDiagram: true,
                diagramTitle: 'Figure 1: Network Topology & Packet Transmission Model',
                diagramSvg: examSvg,
                suggestedWorkingLines: 10,
              },
              {
                id: 'net-q6',
                questionNumber: '6',
                text: 'An institution transfers a 500 Megabyte file over a dedicated 100 Mbps fiber connection. (a) Convert 500 MB into Megabits (Mb). (b) Assuming 85% network efficiency, calculate the total transfer time in seconds. (c) Explain why TCP windowing improves transmission throughput across high-latency links.',
                questionType: 'structured',
                marks: 10,
                hasDiagram: false,
                suggestedWorkingLines: 8,
              },
            ],
          },
          {
            sectionLetter: 'C',
            sectionTitle: 'Campus Network Design Scenario',
            sectionInstructions: 'Answer the extended design problem (15 Marks).',
            sectionTotalMarks: 15,
            questions: [
              {
                id: 'net-q7',
                questionNumber: '7',
                text: 'A university campus in Kenya is expanding to accommodate 3,000 students and 200 staff across 5 separate faculty buildings. (a) Design a hierarchical three-layer network architecture (Core, Distribution, Access). (b) Propose an IP subnetting allocation plan using the private 10.0.0.0/16 address space. (c) Outline wireless network security measures (WPA3 Enterprise, 802.1X, VLAN segmentation) to isolate student traffic from administrative finance databases.',
                questionType: 'extended',
                marks: 15,
                hasDiagram: false,
                suggestedWorkingLines: 14,
              },
            ],
          },
        ],
        markingScheme: [
          {
            questionNumber: '1',
            modelAnswer: 'TCP provides connection-oriented, ordered, error-checked, and acknowledged delivery (e.g. web pages, email). UDP is connectionless, lightweight, and transmits without retransmissions (e.g. live video streaming, VoIP).',
            gradingBreakdown: [
              { code: 'B2', criterion: 'Accurate distinction between reliability and connection type', allocatedMarks: 2 },
              { code: 'B2', criterion: 'Valid application examples cited for both', allocatedMarks: 2 },
            ],
            examinerTips: 'Credit mentions of 3-way handshake or packet overhead.',
          },
          {
            questionNumber: '2',
            modelAnswer: 'Option B: Layer 3 - Network Layer.',
            gradingBreakdown: [
              { code: 'A1', criterion: 'Correct option selected', allocatedMarks: 2 },
            ],
            examinerTips: 'Network layer handles IP routing and path determination.',
          },
        ],
      };
    }

    // Default CS Exam
    const examSvgGen = createSvgDiagram('cs', rawTopic);
    return {
      id: `exam-${Date.now()}`,
      createdAt: new Date().toISOString(),
      paperTitle,
      paperSubtitle: `${subject.toUpperCase()} • COMPETENCY ASSESSMENT`,
      paperCode,
      subject,
      gradeLevel: grade,
      durationMinutes: 60,
      totalMarks: 50,
      candidateInstructions: [
        'Write your Candidate Name and Index Number in the spaces provided.',
        'Answer ALL questions in Section A, Section B, and Section C.',
        'All pseudocode or algorithmic implementations must be clearly structured.',
        'Marks are awarded for valid logic, proper variable naming, and diagrammatic accuracy.',
      ],
      formulaSheet: [
        {
          quantity: 'Time Complexity Growth',
          formula: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2)',
          notes: 'Standard Big-O comparative scaling',
        },
        {
          quantity: 'Deterministic Function',
          formula: 'Output = Algorithm(Inputs, State)',
          notes: 'Every procedure must reach a verified terminal condition',
        },
      ],
      sections: [
        {
          sectionLetter: 'A',
          sectionTitle: `Foundational Knowledge in ${rawTopic}`,
          sectionInstructions: 'Answer all questions in this section (15 Marks).',
          sectionTotalMarks: 15,
          questions: [
            {
              id: 'cs-q1',
              questionNumber: '1',
              text: `Define the primary principles governing ${rawTopic} in Computer Science and state two prerequisite conditions for its implementation.`,
              questionType: 'short_answer',
              marks: 4,
              hasDiagram: false,
              suggestedWorkingLines: 4,
            },
            {
              id: 'cs-q2',
              questionNumber: '2',
              text: `Which of the following best describes the asymptotic behavior of a standard solution for ${rawTopic}?`,
              questionType: 'mcq',
              marks: 2,
              options: [
                'A: O(1) Constant Time',
                'B: O(log n) Logarithmic Time',
                'C: O(n) Linear Scaling',
                'D: Depends directly on problem constraints and memory allocation',
              ],
              hasDiagram: false,
            },
            {
              id: 'cs-q3',
              questionNumber: '3',
              text: `Identify two common traps or edge-case errors students make when developing solutions for ${rawTopic}.`,
              questionType: 'short_answer',
              marks: 4,
              hasDiagram: false,
              suggestedWorkingLines: 4,
            },
            {
              id: 'cs-q4',
              questionNumber: '4',
              text: 'Explain the difference between compile-time syntax errors and runtime logic errors, giving one example of each.',
              questionType: 'short_answer',
              marks: 5,
              hasDiagram: false,
              suggestedWorkingLines: 4,
            },
          ],
        },
        {
          sectionLetter: 'B',
          sectionTitle: 'Structured Analytical & Diagrammatic Problems',
          sectionInstructions: 'Study Figure 1 and show all working clearly (20 Marks).',
          sectionTotalMarks: 20,
          questions: [
            {
              id: 'cs-q5',
              questionNumber: '5',
              text: `Study the vector diagram provided in Figure 1 below. (a) Analyze how the system processes input parameters to produce verified outputs in ${rawTopic}. (b) Explain the role of state transition boundaries. (c) Write a structured pseudocode algorithm solving this problem safely with all edge cases handled.`,
              questionType: 'structured',
              marks: 10,
              hasDiagram: true,
              diagramTitle: `Figure 1: ${rawTopic} Conceptual Architecture & Execution Model`,
              diagramSvg: examSvgGen,
              suggestedWorkingLines: 10,
            },
            {
              id: 'cs-q6',
              questionNumber: '6',
              text: `Given an input dataset representing ${rawTopic}, trace the step-by-step state changes using a trace table. (a) Record all variable states at each iteration. (b) Calculate the total operational steps and state the overall Big-O time complexity.`,
              questionType: 'structured',
              marks: 10,
              hasDiagram: false,
              suggestedWorkingLines: 8,
            },
          ],
        },
        {
          sectionLetter: 'C',
          sectionTitle: 'Applied System Scenario',
          sectionInstructions: 'Answer the extended synthesis problem (15 Marks).',
          sectionTotalMarks: 15,
          questions: [
            {
              id: 'cs-q7',
              questionNumber: '7',
              text: `An enterprise application in Kenya requires an automated system to manage ${rawTopic}. (a) Formulate the architectural specifications and modular data structures. (b) Discuss two critical security practices required to protect system integrity. (c) Evaluate the trade-offs between memory consumption and execution speed in your proposed design.`,
              questionType: 'extended',
              marks: 15,
              hasDiagram: false,
              suggestedWorkingLines: 14,
            },
          ],
        },
      ],
      markingScheme: [
        {
          questionNumber: '1',
          modelAnswer: `Clear and precise definition of ${rawTopic} principles with prerequisite conditions correctly identified.`,
          gradingBreakdown: [
            { code: 'B2', criterion: 'Accurate definition of core concept', allocatedMarks: 2 },
            { code: 'B2', criterion: 'Prerequisite boundary conditions identified', allocatedMarks: 2 },
          ],
          examinerTips: 'Reward standard algorithmic and computational terminology.',
        },
      ],
    };
  }

  // General Subject Exam
  const examSvg = createSvgDiagram(domain, `Figure 1: ${subject} Concept Diagram`);
  return {
    id: `exam-${Date.now()}`,
    createdAt: new Date().toISOString(),
    paperTitle,
    paperSubtitle: `${subject.toUpperCase()} • STANDARDIZED ASSESSMENT`,
    paperCode,
    subject,
    gradeLevel: grade,
    durationMinutes: 60,
    totalMarks: 50,
    candidateInstructions: [
      'Write your Candidate Name and Index Number in the spaces provided.',
      'Answer ALL questions in Section A, Section B, and Section C.',
      'All working and mathematical derivations must be clearly shown.',
      'Marks are awarded for correct formulas, units, and clear reasoning.',
    ],
    formulaSheet: [
      {
        quantity: `Governing ${subject} Relation`,
        formula: 'Output = Law(Inputs)',
        notes: 'Apply consistently across all sections',
      },
    ],
    sections: [
      {
        sectionLetter: 'A',
        sectionTitle: 'Foundational Knowledge & Objective Questions',
        sectionInstructions: 'Answer all questions in this section (15 Marks).',
        sectionTotalMarks: 15,
        questions: [
          {
            id: 'gen-q1',
            questionNumber: '1',
            text: `Define the primary governing principle of ${subject} tested in this unit (${rawTopic}), and state two essential conditions for its application.`,
            questionType: 'short_answer',
            marks: 4,
            hasDiagram: false,
            suggestedWorkingLines: 4,
          },
          {
            id: 'gen-q2',
            questionNumber: '2',
            text: `Which of the following best represents the standard relationship in ${subject}?`,
            questionType: 'mcq',
            marks: 2,
            options: [
              'A: Standard Equilibrium Condition',
              'B: Inverse Proportional Condition',
              'C: Dynamic Rate Condition',
              'D: Null State',
            ],
            hasDiagram: false,
          },
          {
            id: 'gen-q3',
            questionNumber: '3',
            text: `State two everyday applications of ${subject} in Kenyan or global society.`,
            questionType: 'short_answer',
            marks: 4,
            hasDiagram: false,
            suggestedWorkingLines: 4,
          },
          {
            id: 'gen-q4',
            questionNumber: '4',
            text: `Identify two common calculation or conceptual errors students make when solving problems in ${rawTopic}.`,
            questionType: 'short_answer',
            marks: 5,
            hasDiagram: false,
            suggestedWorkingLines: 4,
          },
        ],
      },
      {
        sectionLetter: 'B',
        sectionTitle: 'Structured Analytical & Diagrammatic Problems',
        sectionInstructions: 'Show all working and logic clearly (20 Marks).',
        sectionTotalMarks: 20,
        questions: [
          {
            id: 'gen-q5',
            questionNumber: '5',
            text: `Examine the schematic outline in Figure 1. (a) Identify the components labeled in the diagram. (b) Explain how changing input parameters affects the measured output. (c) Show all steps to calculate the resulting value under balanced conditions.`,
            questionType: 'structured',
            marks: 10,
            hasDiagram: true,
            diagramTitle: `Figure 1: ${subject} Operational Framework`,
            diagramSvg: examSvg,
            suggestedWorkingLines: 8,
          },
          {
            id: 'gen-q6',
            questionNumber: '6',
            text: `Apply the governing formulas of ${subject} to calculate the unknown parameter given standard boundary conditions. Show all substitution steps and attach appropriate SI units.`,
            questionType: 'structured',
            marks: 10,
            hasDiagram: false,
            suggestedWorkingLines: 8,
          },
        ],
      },
      {
        sectionLetter: 'C',
        sectionTitle: 'Applied Problem Solving & System Scenarios',
        sectionInstructions: 'Answer the extended synthesis problem (15 Marks).',
        sectionTotalMarks: 15,
        questions: [
          {
            id: 'gen-q7',
            questionNumber: '7',
            text: `Analyze an applied real-world scenario in ${subject} (${rawTopic}). Formulate the governing model, carry out rigorous analytical derivation, and discuss three practical recommendations to optimize performance.`,
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
        modelAnswer: `Clear and precise definition of ${subject} core concept with both prerequisite conditions identified.`,
        gradingBreakdown: [
          { code: 'B2', criterion: 'Accurate definition', allocatedMarks: 2 },
          { code: 'B2', criterion: 'Two conditions stated clearly', allocatedMarks: 2 },
        ],
        examinerTips: `Reward standard scientific and curricular terminology in ${subject}.`,
      },
    ],
  };
}

// 4. Standalone Diagram Fallback: Subject and Topic Aware
export function generateCurriculumDiagram(params: {
  prompt: string;
  subject?: string;
}): GeneratedDiagramItem {
  const subject = params.subject || 'Computer Science';
  const domain = detectDomain(subject, params.prompt);
  let csSub: CsSubTopic | undefined;

  if (domain === 'cs') {
    csSub = detectCsSubTopic(params.prompt);
  }

  const svgCode = createSvgDiagram(domain, params.prompt.slice(0, 45), csSub);

  return {
    id: `diag-${Date.now()}`,
    title: params.prompt.slice(0, 40),
    caption: `Outlined scientific illustration for ${subject}: ${params.prompt}`,
    svgCode,
    componentsLegend: domain === 'cs'
      ? csSub === 'database'
        ? [
            { label: 'Primary Key (PK)', description: 'Unique identifier for records in a table' },
            { label: 'Foreign Key (FK)', description: 'Referential relationship linking child to parent table' },
            { label: '1 : N Relationship', description: 'One-to-many cardinality line connecting schema tables' },
          ]
        : csSub === 'network'
        ? [
            { label: 'Central Switch / Router', description: 'Core gateway and packet forwarding hub' },
            { label: 'Client Workstations', description: 'Local area endpoints transmitting packets' },
            { label: 'Packet Encapsulation', description: 'IP header, TCP port, and payload data unit' },
          ]
        : csSub === 'os_deadlock'
        ? [
            { label: 'Processes P1 & P2', description: 'Active threads holding resources and waiting for locks' },
            { label: 'Resources R1 & R2', description: 'Mutually exclusive locks creating a circular wait' },
            { label: 'Allocation & Request Edges', description: 'Solid line = held by; Dashed line = requested by' },
          ]
        : csSub === 'oop'
        ? [
            { label: 'Superclass', description: 'Base blueprint containing shared attributes and abstract methods' },
            { label: 'Subclasses', description: 'Specialized derived classes overriding parent behaviors' },
            { label: 'Inheritance Connector', description: 'Hollow arrow indicating "is-a" relationship' },
          ]
        : [
            { label: 'Root Node / Frame 0', description: 'Initial state and entry-point function' },
            { label: 'Child Subtrees', description: 'Divided subproblems moving towards termination' },
            { label: 'Base Case Leaves', description: 'Halting conditions preventing stack overflow' },
          ]
      : [
          { label: 'Input Condition A', description: 'Primary reference state' },
          { label: 'Transformation Axis B', description: 'Governing relationship or pivot' },
          { label: 'Output C', description: 'Resultant verified equilibrium state' },
        ],
    createdAt: new Date().toISOString(),
  };
}
