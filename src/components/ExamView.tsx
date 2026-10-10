import React, { useState, useEffect } from 'react';
import {
  Download,
  Printer,
  Bookmark,
  CheckCircle2,
  Eye,
  EyeOff,
  Timer,
  Play,
  Pause,
  RotateCcw,
  FileText,
  AlertCircle,
  HelpCircle,
  Check,
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { StandardExam } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { generateExamPdf } from '../utils/pdfGenerator';
import {
  WhatsAppIcon,
  TelegramIcon,
  WHATSAPP_DISPLAY,
  TELEGRAM_DISPLAY,
  getWhatsAppShareLink,
  getTelegramShareLink,
} from './SocialIcons';

interface ExamViewProps {
  exam: StandardExam | null;
  onSaveToLibrary: (exam: StandardExam) => void;
  isSaved: boolean;
  onBackToSolver: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  exam,
  onSaveToLibrary,
  isSaved,
  onBackToSolver,
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [showCbeRubric, setShowCbeRubric] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [includeMarkSchemeInPdf, setIncludeMarkSchemeInPdf] = useState(true);

  // Timer state for real timed student test practice
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (exam) {
      setTimerSeconds(exam.durationMinutes * 60);
      setTimerRunning(false);
    }
  }, [exam]);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">No Standard Exam Generated Yet</h2>
        <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm">
          Upload a problematic question or select a topic to generate an official standardized examination paper with vector diagrams and marking scheme.
        </p>
        <button
          onClick={onBackToSolver}
          className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
        >
          Go to Question Solver
        </button>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await generateExamPdf(exam, {
        includeMarkScheme: includeMarkSchemeInPdf,
        candidateName: candidateName.trim(),
      });
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Control Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {exam.subject}
              </span>
              {exam.gradeLevel && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                  {exam.gradeLevel}
                </span>
              )}
              <span className="text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">{exam.paperCode}</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Max: {exam.totalMarks} Marks</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {exam.paperTitle}
            </h1>
          </div>

          {/* Action buttons & exam options */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Timer practice widget */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-mono font-bold text-slate-800">
              <Timer className="w-3.5 h-3.5 text-sky-600" />
              <span>{formatTimer(timerSeconds)}</span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1 hover:bg-slate-200 rounded text-slate-700"
                title={timerRunning ? 'Pause Exam Timer' : 'Start Exam Timer'}
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(exam.durationMinutes * 60);
                }}
                className="p-1 hover:bg-slate-200 rounded text-slate-700"
                title="Reset Timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={() => onSaveToLibrary(exam)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isSaved
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-purple-600 text-purple-600' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Exam'}</span>
            </button>

            <button
              onClick={() => setShowMarkScheme(!showMarkScheme)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                showMarkScheme
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {showMarkScheme ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showMarkScheme ? 'Hide Mark Scheme' : 'Reveal Mark Scheme'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Vector</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPdf ? 'Building PDF...' : 'Download Exam PDF'}</span>
            </button>
          </div>
        </div>

        {/* Candidate name input & PDF toggle */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <label className="font-bold text-slate-700">Candidate Name for Header:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. John Doe (Optional)"
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowCbeRubric(!showCbeRubric)}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>{showCbeRubric ? 'Hide CBE Assessment Bands' : 'CBE Kenya Assessment Bands'}</span>
            </button>

            <label className="flex items-center gap-2 font-medium text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMarkSchemeInPdf}
                onChange={(e) => setIncludeMarkSchemeInPdf(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Include Examiner Marking Scheme in PDF Download</span>
            </label>
          </div>
        </div>

        {/* Share via WhatsApp / Telegram Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium">
            Share this exam paper with learners or study group:
          </span>
          <div className="flex items-center gap-2">
            <a
              href={getWhatsAppShareLink(`*${exam.paperTitle}*\nSubject: ${exam.subject} (${exam.gradeLevel || 'Standard'})\nPaper Code: ${exam.paperCode} • Total Marks: ${exam.totalMarks}\nDuration: ${exam.durationMinutes} minutes`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
              <span>Share on WhatsApp</span>
            </a>
            <a
              href={getTelegramShareLink(`*${exam.paperTitle}*\nSubject: ${exam.subject} (${exam.gradeLevel || 'Standard'})\nPaper Code: ${exam.paperCode} • Total Marks: ${exam.totalMarks}\nDuration: ${exam.durationMinutes} minutes`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold transition-colors"
            >
              <TelegramIcon className="w-3.5 h-3.5 fill-sky-600" />
              <span>Share on Telegram</span>
            </a>
          </div>
        </div>

        {/* CBE Kenya Performance Bands Card */}
        {showCbeRubric && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-800 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                Kenyan Competency-Based Education (CBE) Official Grading Bands
              </span>
              <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">
                KPSEA &amp; KJSEA Standard
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <p className="font-bold text-emerald-800">Exceeding Expectations (EE)</p>
                <p className="text-[11px] font-mono text-slate-600">80% – 100% (Level 4)</p>
                <p className="text-[11px] text-slate-600 mt-1">Exceptional conceptual mastery, independent problem-solving &amp; flawless reasoning.</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-sky-200">
                <p className="font-bold text-sky-800">Meeting Expectations (ME)</p>
                <p className="text-[11px] font-mono text-slate-600">65% – 79% (Level 3)</p>
                <p className="text-[11px] text-slate-600 mt-1">Accurate calculations, consistent grasp of core curriculum outcomes.</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <p className="font-bold text-amber-800">Approaching Expectations (AE)</p>
                <p className="text-[11px] font-mono text-slate-600">50% – 64% (Level 2)</p>
                <p className="text-[11px] text-slate-600 mt-1">Demonstrates basic recall, requires guidance with structured synthesis.</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                <p className="font-bold text-rose-800">Below Expectations (BE)</p>
                <p className="text-[11px] font-mono text-slate-600">0% – 49% (Level 1)</p>
                <p className="text-[11px] text-slate-600 mt-1">Needs targeted pedagogical intervention and remedial practice.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Exam Booklet Container (Formatted like authentic exam paper) */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-12 space-y-8 print-container font-serif">
        {/* Exam Header Box */}
        <div className="border-2 border-slate-900 p-6 rounded-lg space-y-4">
          <div className="text-center pb-4 border-b border-slate-400">
            <p className="text-xs tracking-widest font-sans font-bold text-slate-600 uppercase">
              STANDARDIZED ACADEMIC ASSESSMENT COMMISSION
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 uppercase tracking-wide">
              {exam.paperTitle}
            </h1>
            <p className="text-sm font-sans font-semibold text-slate-700 mt-1">
              {exam.paperSubtitle || 'Standard Assessment Test'} • {exam.subject.toUpperCase()}{' '}
              {exam.gradeLevel ? `• ${exam.gradeLevel.toUpperCase()}` : ''}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-sans text-xs pt-1">
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Paper Code</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{exam.paperCode}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Grade Level</span>
              <span className="font-bold text-indigo-900 text-sm">{exam.gradeLevel || 'Standard'}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Time Allowed</span>
              <span className="font-bold text-slate-900 text-sm">{exam.durationMinutes} Minutes</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Max Marks</span>
              <span className="font-bold text-slate-900 text-sm">{exam.totalMarks} Marks</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 col-span-2 sm:col-span-1">
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Candidate Name</span>
              <span className="font-bold text-slate-900 text-sm">
                {candidateName || '________________'}
              </span>
            </div>
          </div>

          {/* Instructions to Candidates */}
          {exam.candidateInstructions && exam.candidateInstructions.length > 0 && (
            <div className="pt-2 font-sans text-xs text-slate-700">
              <p className="font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                Instructions to Candidates:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
                {exam.candidateInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Formula & Reference Sheet */}
        {exam.formulaSheet && exam.formulaSheet.length > 0 && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-sans text-xs print-avoid-break">
            <p className="font-bold uppercase tracking-wider text-slate-800 mb-2">
              Formula &amp; Physical Constants Reference Sheet
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {exam.formulaSheet.map((f, i) => (
                <div key={i} className="p-2 bg-white rounded border border-slate-200">
                  <span className="font-semibold text-slate-800">{f.quantity}: </span>
                  <span className="font-mono text-sky-700 font-bold">{f.formula}</span>
                  {f.notes && <span className="text-[10px] text-slate-500 block">{f.notes}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exam Sections */}
        {exam.sections.map((section, sIndex) => (
          <div key={sIndex} className="space-y-8 pt-4">
            <div className="border-b-2 border-slate-900 pb-2">
              <div className="flex items-center justify-between font-sans">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase">
                  Section {section.sectionLetter}: {section.sectionTitle}
                </h2>
                <span className="font-bold text-sm text-slate-700">
                  [{section.sectionTotalMarks} MARKS]
                </span>
              </div>
              {section.sectionInstructions && (
                <p className="font-sans text-xs italic text-slate-600 mt-1">
                  {section.sectionInstructions}
                </p>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-10">
              {section.questions.map((q) => (
                <div key={q.id} className="space-y-4 print-avoid-break">
                  <div className="flex items-baseline justify-between gap-4 font-sans">
                    <span className="font-bold text-base text-slate-900 font-serif">
                      {q.questionNumber}
                    </span>
                    <span className="font-bold text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      [{q.marks} mark{q.marks > 1 ? 's' : ''}]
                    </span>
                  </div>

                  <p className="text-base text-slate-900 leading-relaxed font-serif">
                    {q.text}
                  </p>

                  {/* Outlined diagram embedded into question */}
                  {q.hasDiagram && q.diagramSvg && (
                    <div className="my-4 max-w-xl mx-auto">
                      <DiagramRenderer
                        svgCode={q.diagramSvg}
                        title={q.diagramTitle || `Figure ${q.questionNumber}`}
                        description={q.diagramTitle}
                      />
                    </div>
                  )}

                  {/* MCQ Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-sm pl-4">
                      {q.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        return (
                          <div key={optIndex} className="flex items-start gap-2 text-slate-800">
                            <span className="font-bold text-slate-900 w-5">{letter}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Student Writing / Ruled Working Lines */}
                  {(!q.options || q.options.length === 0) && (
                    <div className="pt-2 space-y-4">
                      {Array.from({ length: q.suggestedWorkingLines || (q.marks >= 4 ? 6 : 4) }).map((_, l) => (
                        <div key={l} className="border-b border-slate-200 h-6 w-full"></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Official Marking Scheme (Toggleable or Printable) */}
        {showMarkScheme && exam.markingScheme && exam.markingScheme.length > 0 && (
          <div className="mt-16 pt-8 border-t-4 border-slate-900 space-y-6 print-page-break">
            <div className="flex items-center justify-between pb-3 border-b border-slate-300 font-sans">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Official Confidential Grading Guide
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Examiner Marking Scheme &amp; Model Solutions
                </h3>
              </div>
              <Award className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="space-y-6 font-sans">
              {exam.markingScheme.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 print-avoid-break"
                >
                  <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                    <span>{item.questionNumber} Model Solution:</span>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed font-mono bg-white p-3 rounded-lg border border-slate-200">
                    {item.modelAnswer}
                  </p>

                  {item.gradingBreakdown && item.gradingBreakdown.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Mark Allocation Breakdown:
                      </p>
                      {item.gradingBreakdown.map((gb, gIdx) => (
                        <div
                          key={gIdx}
                          className="flex items-start justify-between text-xs text-slate-700 bg-white/70 px-3 py-1.5 rounded border border-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sky-700 font-mono">[{gb.code}]</span>
                            <span>{gb.criterion}</span>
                          </div>
                          <span className="font-semibold text-slate-900">
                            {gb.allocatedMarks} mark{gb.allocatedMarks > 1 ? 's' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.examinerTips && (
                    <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">Examiner Note:</strong> {item.examinerTips}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
