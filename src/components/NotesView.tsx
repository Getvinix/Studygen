import React, { useState, useEffect } from 'react';
import {
  Download,
  Printer,
  Bookmark,
  Check,
  Share2,
  FileText,
  Clock,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SimpleNote } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { generateNotesPdf } from '../utils/pdfGenerator';
import {
  WhatsAppIcon,
  TelegramIcon,
  getWhatsAppShareLink,
  getTelegramShareLink,
} from './SocialIcons';

interface NotesViewProps {
  note: SimpleNote | null;
  onSaveToLibrary: (note: SimpleNote) => void;
  isSaved: boolean;
  onGenerateExamFromNote: (note: SimpleNote) => void;
  onBackToSolver: () => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  note,
  onSaveToLibrary,
  isSaved,
  onGenerateExamFromNote,
  onBackToSolver,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [revealedAnswers, setRevealedAnswers] = useState<{ [qIndex: number]: boolean }>({});
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (note) {
      window.speechSynthesis.cancel();
      const text = `${note.title}. ${note.coreConcept}. Step by step: ${note.blueprintSteps?.map((s) => s.title).join('. ') || ''}. Final answer: ${note.workedSolution?.finalAnswer || ''}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (!note) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Study Notes Generated Yet</h2>
        <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm">
          Upload a problematic question or pick one from our presets to automatically generate simplified revision notes with outlined diagrams.
        </p>
        <button
          onClick={onBackToSolver}
          className="mt-6 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
        >
          Go to Question Solver
        </button>
      </div>
    );
  }

  const shareText = `*${note.title}* (${note.subject} - ${note.gradeLevel || 'Standard'})\n\n${note.coreConcept.slice(0, 160)}...`;
  const waShareUrl = getWhatsAppShareLink(shareText);
  const tgShareUrl = getTelegramShareLink(shareText);

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await generateNotesPdf(note);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
    setRevealedAnswers((prev) => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                {note.subject}
              </span>
              {note.gradeLevel && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                  {note.gradeLevel}
                </span>
              )}
              <span className="text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">{note.topic}</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" /> ~{note.estimatedReadTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {note.title}
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Audio Read-Aloud */}
            <button
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Stop listening' : 'Listen to note explanation'}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-600" /> : <Volume2 className="w-3.5 h-3.5 text-sky-600" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Listen Audio'}</span>
            </button>

            {/* Share to WhatsApp */}
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Share this note to WhatsApp study group"
              className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-all flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Share to Telegram */}
            <a
              href={tgShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Share this note to Telegram study group"
              className="px-3 py-2 rounded-xl text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-all flex items-center gap-1.5"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-sky-600" />
              <span>Telegram</span>
            </a>

            <button
              onClick={() => onSaveToLibrary(note)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-purple-600 text-purple-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPdf ? 'PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={() => onGenerateExamFromNote(note)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 print-container">
        {/* Print Only Header */}
        <div className="hidden print-only mb-6 pb-4 border-b border-slate-300">
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
            OpenLearn Free Study Notes • {note.subject} • Level: {note.gradeLevel || 'Standard'}
          </p>
          <h1 className="text-2xl font-black text-slate-900">{note.title}</h1>
          <p className="text-xs text-slate-600">Topic: {note.topic}</p>
        </div>

        {/* Section 1: The Trap & Common Misconceptions */}
        {note.commonMisconceptions && note.commonMisconceptions.length > 0 && (
          <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2.5 text-rose-800 font-extrabold text-base mb-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Common Student Traps &amp; Misconceptions (Beware!)</span>
            </div>
            <p className="text-xs text-rose-700 mb-4 font-medium">
              This is where over 80% of students lose marks on exam day. Avoid these pitfalls:
            </p>
            <div className="space-y-2.5">
              {note.commonMisconceptions.map((misc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-rose-950 font-medium">
                  <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span>{misc}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Core Concept & Plain-English Intuition */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h2 className="text-xl font-bold text-slate-900">Core Concept &amp; Intuition</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed bg-slate-50/60 p-6 rounded-2xl border border-slate-200">
            {note.coreConcept}
          </div>
        </section>

        {/* Section 3: Outlined Concept Diagram */}
        {note.outlinedDiagram && note.outlinedDiagram.svgCode && (
          <section className="print-avoid-break">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {note.outlinedDiagram.title || 'Outlined Concept Diagram'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Crisp schematic lines and annotations for easy visualization
                  </p>
                </div>
              </div>
            </div>

            <DiagramRenderer
              svgCode={note.outlinedDiagram.svgCode}
              title={note.outlinedDiagram.title}
              description={note.outlinedDiagram.description}
            />
          </section>
        )}

        {/* Section 4: Universal Step-by-Step Blueprint */}
        {note.blueprintSteps && note.blueprintSteps.length > 0 && (
          <section className="print-avoid-break">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Universal Problem-Solving Blueprint
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {note.blueprintSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-sky-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                    <span>STEP {step.stepNumber}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{step.explanation}</p>
                  {step.proTip && (
                    <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-900 font-medium flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{step.proTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Worked Example & Solution Demonstration */}
        {note.workedSolution && (
          <section className="print-avoid-break">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Worked Demonstration &amp; Model Solution
              </h2>
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider mb-2">
                Problem Statement
              </div>
              <p className="text-sm text-slate-200 font-mono leading-relaxed mb-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                {note.workedSolution.problemRestatement}
              </p>

              <div className="text-xs uppercase font-extrabold text-sky-400 tracking-wider mb-3">
                Step-by-Step Breakdown
              </div>
              <div className="space-y-3 mb-6">
                {note.workedSolution.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-sky-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed font-sans">{st}</span>
                  </div>
                ))}
              </div>

              {/* Final Answer Banner */}
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                  Final Result
                </span>
                <span className="font-mono font-bold text-base text-white">
                  {note.workedSolution.finalAnswer}
                </span>
                {note.workedSolution.keyTakeaway && (
                  <p className="text-xs text-emerald-300 mt-2 italic">
                    Key Takeaway: {note.workedSolution.keyTakeaway}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Key Formulas & Cheat Sheet */}
        {note.keyFormulas && note.keyFormulas.length > 0 && (
          <section className="print-avoid-break">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Key Formulas &amp; Definition Sheet
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {note.keyFormulas.map((kf, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {kf.name}
                  </div>
                  <div className="font-mono text-base font-extrabold text-sky-700 mb-1">
                    {kf.formula}
                  </div>
                  <p className="text-xs text-slate-600">{kf.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: Quick Self-Check Practice Drill (Interactive) */}
        {note.selfCheckDrill && note.selfCheckDrill.length > 0 && (
          <section className="no-print pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                6
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Quick Concept Self-Check</h2>
                <p className="text-xs text-slate-500">
                  Test your understanding right now with these 2 fast questions:
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {note.selfCheckDrill.map((q, qIndex) => {
                const userChoice = selectedAnswers[qIndex];
                const isRevealed = revealedAnswers[qIndex];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={qIndex}
                    className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs"
                  >
                    <p className="font-bold text-slate-900 text-sm sm:text-base mb-3">
                      {qIndex + 1}. {q.question}
                    </p>

                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        let btnStyle = 'border-slate-200 hover:border-sky-400 bg-white text-slate-800';

                        if (isRevealed) {
                          if (optIndex === q.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                          } else if (userChoice === optIndex) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                          } else {
                            btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectOption(qIndex, optIndex)}
                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </span>

                            {isRevealed && optIndex === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            )}
                            {isRevealed && userChoice === optIndex && optIndex !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isRevealed && (
                      <div
                        className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                            : 'bg-rose-50 border border-rose-200 text-rose-900'
                        }`}
                      >
                        <span className="font-bold block mb-1">
                          {isCorrect ? 'Correct!' : 'Incorrect.'}
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
