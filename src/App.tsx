import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuestionUploader } from './components/QuestionUploader';
import { NotesView } from './components/NotesView';
import { ExamView } from './components/ExamView';
import { DiagramStudio } from './components/DiagramStudio';
import { LibraryView } from './components/LibraryView';
import { SimpleNote, StandardExam, GeneratedDiagramItem } from './types';
import { CheckCircle2, AlertCircle, Sparkles, BookOpen, FileText } from 'lucide-react';
import { FloatingTutorWidget } from './components/FloatingTutorWidget';
import {
  WhatsAppIcon,
  TelegramIcon,
  WHATSAPP_DISPLAY,
  TELEGRAM_DISPLAY,
  WHATSAPP_LINK,
  TELEGRAM_LINK,
} from './components/SocialIcons';
import { generateNotesApi, generateExamApi } from './utils/apiClient';

const STORAGE_NOTES_KEY = 'openlearn_saved_notes_v1';
const STORAGE_EXAMS_KEY = 'openlearn_saved_exams_v1';
const STORAGE_DIAGRAMS_KEY = 'openlearn_saved_diagrams_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'notes' | 'exam' | 'diagrams' | 'library'>('upload');
  const [currentNote, setCurrentNote] = useState<SimpleNote | null>(null);
  const [currentExam, setCurrentExam] = useState<StandardExam | null>(null);

  const [savedNotes, setSavedNotes] = useState<SimpleNote[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_NOTES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedExams, setSavedExams] = useState<StandardExam[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_EXAMS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedDiagrams, setSavedDiagrams] = useState<GeneratedDiagramItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_DIAGRAMS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(savedNotes));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedNotes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EXAMS_KEY, JSON.stringify(savedExams));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedExams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DIAGRAMS_KEY, JSON.stringify(savedDiagrams));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedDiagrams]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Generate Notes
  const handleGenerateNotes = async (params: {
    question: string;
    subject: string;
    difficulty: string;
    topic?: string;
    gradeLevel: string;
  }) => {
    setIsLoading(true);
    setLoadingMessage(`Synthesizing simple notes & diagrams for ${params.gradeLevel}...`);
    try {
      const data = await generateNotesApi(params);

      const fullNote: SimpleNote = {
        ...data,
        id: `note-${Date.now()}`,
        gradeLevel: params.gradeLevel || data.gradeLevel,
        createdAt: new Date().toISOString(),
      };
      setCurrentNote(fullNote);
      setActiveTab('notes');
      showToast(`Notes generated for ${params.gradeLevel}!`);
    } catch (err: any) {
      showToast(err.message || 'Error generating notes');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  // Generate Exam
  const handleGenerateExam = async (params: {
    question: string;
    subject: string;
    difficulty: string;
    examType: string;
    gradeLevel: string;
  }) => {
    setIsLoading(true);
    setLoadingMessage(`Compiling standardized exam paper for ${params.gradeLevel}...`);
    try {
      const data = await generateExamApi({
        topic: params.question.slice(0, 80),
        baseQuestion: params.question,
        subject: params.subject,
        gradeLevel: params.gradeLevel,
        difficulty: params.difficulty,
        examType: params.examType,
      });

      const fullExam: StandardExam = {
        ...data,
        id: `exam-${Date.now()}`,
        gradeLevel: params.gradeLevel || data.gradeLevel,
        createdAt: new Date().toISOString(),
      };
      setCurrentExam(fullExam);
      setActiveTab('exam');
      showToast(`Standard exam paper generated for ${params.gradeLevel}!`);
    } catch (err: any) {
      showToast(err.message || 'Error generating exam');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  // Save / Bookmark Handlers
  const handleSaveNote = (note: SimpleNote) => {
    if (!savedNotes.some((n) => n.id === note.id)) {
      setSavedNotes([note, ...savedNotes]);
      showToast('Note saved to library!');
    } else {
      showToast('Already saved in library.');
    }
  };

  const handleSaveExam = (exam: StandardExam) => {
    if (!savedExams.some((e) => e.id === exam.id)) {
      setSavedExams([exam, ...savedExams]);
      showToast('Exam saved to library!');
    } else {
      showToast('Already saved in library.');
    }
  };

  const handleSaveDiagram = (diagram: GeneratedDiagramItem) => {
    if (!savedDiagrams.some((d) => d.id === diagram.id)) {
      setSavedDiagrams([diagram, ...savedDiagrams]);
      showToast('Diagram saved to library!');
    }
  };

  // Delete Handlers
  const handleDeleteNote = (id: string) => {
    setSavedNotes(savedNotes.filter((n) => n.id !== id));
    showToast('Note removed.');
  };

  const handleDeleteExam = (id: string) => {
    setSavedExams(savedExams.filter((e) => e.id !== id));
    showToast('Exam removed.');
  };

  const handleDeleteDiagram = (id: string) => {
    setSavedDiagrams(savedDiagrams.filter((d) => d.id !== id));
    showToast('Diagram removed.');
  };

  // Backup Export & Import
  const handleExportBackup = () => {
    const backupData = {
      notes: savedNotes,
      exams: savedExams,
      diagrams: savedDiagrams,
      exportedAt: new Date().toISOString(),
      version: 1,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `openlearn_library_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Library backup file exported!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.notes && Array.isArray(parsed.notes)) {
          setSavedNotes((prev) => [...parsed.notes, ...prev]);
        }
        if (parsed.exams && Array.isArray(parsed.exams)) {
          setSavedExams((prev) => [...parsed.exams, ...prev]);
        }
        if (parsed.diagrams && Array.isArray(parsed.diagrams)) {
          setSavedDiagrams((prev) => [...parsed.diagrams, ...prev]);
        }
        showToast('Library backup restored successfully!');
      } catch {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const totalSavedCount = savedNotes.length + savedExams.length + savedDiagrams.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-fade-in no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={totalSavedCount}
      />

      {/* Viewport Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'upload' && (
          <QuestionUploader
            onGenerateNotes={handleGenerateNotes}
            onGenerateExam={handleGenerateExam}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
          />
        )}

        {activeTab === 'notes' && (
          <NotesView
            note={currentNote}
            onSaveToLibrary={handleSaveNote}
            isSaved={!!currentNote && savedNotes.some((n) => n.id === currentNote.id)}
            onGenerateExamFromNote={(n) =>
              handleGenerateExam({
                question: `${n.title}: ${n.coreConcept}`,
                subject: n.subject,
                gradeLevel: n.gradeLevel || 'Grade 10',
                difficulty: 'Standard Academic Level',
                examType: 'standard_midterm',
              })
            }
            onBackToSolver={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'exam' && (
          <ExamView
            exam={currentExam}
            onSaveToLibrary={handleSaveExam}
            isSaved={!!currentExam && savedExams.some((e) => e.id === examIdOrEmpty(currentExam))}
            onBackToSolver={() => setActiveTab('upload')}
          />
        )}

        {activeTab === 'diagrams' && (
          <DiagramStudio onSaveDiagram={handleSaveDiagram} />
        )}

        {activeTab === 'library' && (
          <LibraryView
            savedNotes={savedNotes}
            savedExams={savedExams}
            savedDiagrams={savedDiagrams}
            onOpenNote={(n) => {
              setCurrentNote(n);
              setActiveTab('notes');
            }}
            onOpenExam={(e) => {
              setCurrentExam(e);
              setActiveTab('exam');
            }}
            onDeleteNote={handleDeleteNote}
            onDeleteExam={handleDeleteExam}
            onDeleteDiagram={handleDeleteDiagram}
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
          />
        )}
      </main>

      {/* Floating Tutor Help Desk Speed-Dial Widget */}
      <FloatingTutorWidget
        currentQuestionText={currentNote?.coreConcept || currentExam?.paperTitle}
        currentSubject={currentNote?.subject || currentExam?.subject}
        currentGradeLevel={currentNote?.gradeLevel || currentExam?.gradeLevel}
      />

      {/* Footer (No print) */}
      <footer className="bg-white border-t border-slate-200 pt-10 pb-8 text-xs text-slate-600 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
                  OL
                </div>
                <span className="font-extrabold text-base text-slate-900 tracking-tight">OpenLearn</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                100% Free Open Educational Resource. Solves problematic questions, provides simplified revision notes with vector outlined diagrams, and outputs standard exams in PDF format.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Zero Login • Zero Credits • 100% Free
                </span>
              </div>
            </div>

            {/* Col 2: Kenyan CBE Curriculum Coverage */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Kenyan CBE Curriculum
              </h5>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li>• <strong>Lower Primary:</strong> Grades 1 - 3 Foundation</li>
                <li>• <strong>Upper Primary:</strong> Grades 4 - 6 (KPSEA Prep)</li>
                <li>• <strong>Junior School:</strong> Grades 7 - 9 (KJSEA Assessment)</li>
                <li>• <strong>Senior School:</strong> Grades 10 - 12 (STEM, Social Sciences, Arts)</li>
              </ul>
            </div>

            {/* Col 3: Higher Education Worldwide */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Higher Education (Worldwide)
              </h5>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li>• <strong>Undergraduate:</strong> Freshman &amp; Sophomore Core</li>
                <li>• <strong>Advanced Degree:</strong> Engineering, Medicine &amp; Science</li>
                <li>• <strong>Postgraduate:</strong> Master's (MSc / MA / MBA) Research</li>
                <li>• <strong>Doctoral:</strong> PhD Proofs &amp; Deep Technical Analysis</li>
              </ul>
            </div>

            {/* Col 4: Tutor Hotline & Direct Contact */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Tutor Hotline &amp; Support
              </h5>
              <p className="text-slate-500 text-[11px]">
                Need one-on-one help with an exam question, marking scheme, or syllabus guidance?
              </p>
              
              <div className="space-y-2 pt-1">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white">
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-700 font-normal leading-none">WhatsApp Tutor</p>
                    <p className="font-mono text-xs">{WHATSAPP_DISPLAY}</p>
                  </div>
                </a>

                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-bold text-xs transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-sky-600 flex items-center justify-center text-white">
                    <TelegramIcon className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-sky-700 font-normal leading-none">Telegram Tutor</p>
                    <p className="font-mono text-xs">{TELEGRAM_DISPLAY}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} OpenLearn — Free Study Notes &amp; Standard Exam Generator with Outlined Diagrams.
            </p>
            <div className="flex items-center gap-4">
              <span>A4 Print Ready</span>
              <span>•</span>
              <span>Vector SVG Diagrams</span>
              <span>•</span>
              <span>Kenya CBE + Worldwide Syllabi</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function examIdOrEmpty(exam: StandardExam | null): string {
  return exam ? exam.id : '';
}
