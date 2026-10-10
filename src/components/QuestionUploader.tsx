import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Layers,
  ChevronRight,
  Compass,
  Filter,
} from 'lucide-react';
import { PRESET_QUESTIONS, PresetQuestion } from '../data/sampleQuestions';
import { QuestionAnalysis, GRADE_LEVELS, getSubjectsForGradeLevel } from '../types';
import {
  WhatsAppIcon,
  TelegramIcon,
  WHATSAPP_DISPLAY,
  TELEGRAM_DISPLAY,
  getWhatsAppShareLink,
  getTelegramShareLink,
} from './SocialIcons';

interface QuestionUploaderProps {
  onGenerateNotes: (data: {
    question: string;
    subject: string;
    difficulty: string;
    topic?: string;
    gradeLevel: string;
  }) => void;
  onGenerateExam: (data: {
    question: string;
    subject: string;
    difficulty: string;
    examType: string;
    gradeLevel: string;
  }) => void;
  isLoading: boolean;
  loadingMessage: string;
}

export const QuestionUploader: React.FC<QuestionUploaderProps> = ({
  onGenerateNotes,
  onGenerateExam,
  isLoading,
  loadingMessage,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('image/jpeg');
  const [gradeLevel, setGradeLevel] = useState('Grade 8 (Junior School)');
  const [subject, setSubject] = useState('Pre-Technical Studies');
  const [isCustomSubject, setIsCustomSubject] = useState(false);
  const [customSubjectText, setCustomSubjectText] = useState('');
  const [difficulty, setDifficulty] = useState('Standard Academic');
  const [examType, setExamType] = useState<'targeted_drill' | 'standard_midterm' | 'comprehensive_mock'>('standard_midterm');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<QuestionAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [presetTierFilter, setPresetTierFilter] = useState<'all' | 'lower_primary' | 'upper_primary' | 'junior' | 'senior' | 'tertiary'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When grade level changes, adjust default subject
  const handleGradeLevelChange = (newGrade: string) => {
    setGradeLevel(newGrade);
    const availableGroups = getSubjectsForGradeLevel(newGrade);
    const allSubjects = availableGroups.flatMap((g) => g.subjects);
    if (!isCustomSubject && !allSubjects.includes(subject)) {
      setSubject(allSubjects[0] || 'Mathematics');
    }
  };

  // Handle file selection
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (PNG, JPG, or WebP).');
      return;
    }
    setErrorMessage(null);
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Clipboard paste support
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          handleFile(blob);
          break;
        }
      }
    }
  };

  // Preset loader
  const handleLoadPreset = (preset: PresetQuestion) => {
    setQuestionText(preset.questionText);
    setGradeLevel(preset.gradeLevel);
    setSubject(preset.subject);
    setIsCustomSubject(false);
    setDifficulty(preset.difficulty);
    setImagePreview(null);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const effectiveSubject = isCustomSubject ? customSubjectText.trim() || 'General' : subject;

  // Diagnose / Analyze Question
  const handleDiagnose = async () => {
    if (!questionText.trim() && !imagePreview) {
      setErrorMessage('Please enter question text or upload a question image first.');
      return;
    }
    setErrorMessage(null);
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: questionText.trim(),
          imageBase64: imagePreview,
          mimeType: imageMime,
          subject: effectiveSubject,
          gradeLevel,
          difficulty,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze question');
      setAnalysisResult(data);
      if (data.extractedQuestion && !questionText) {
        setQuestionText(data.extractedQuestion);
      }
      if (data.subject) {
        setSubject(data.subject);
      }
      if (data.gradeLevel) {
        setGradeLevel(data.gradeLevel);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error diagnosing question');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Trigger Notes
  const handleTriggerNotes = () => {
    const text = questionText.trim() || analysisResult?.extractedQuestion;
    if (!text && !imagePreview) {
      setErrorMessage('Please provide question text or an image.');
      return;
    }
    setErrorMessage(null);
    onGenerateNotes({
      question: text || 'Analyze and create notes for the uploaded problem image',
      subject: effectiveSubject,
      gradeLevel,
      difficulty,
      topic: analysisResult?.topic,
    });
  };

  // Trigger Exam
  const handleTriggerExam = () => {
    const text = questionText.trim() || analysisResult?.extractedQuestion;
    if (!text && !imagePreview) {
      setErrorMessage('Please provide question text or an image.');
      return;
    }
    setErrorMessage(null);
    onGenerateExam({
      question: text || 'Generate standard exam questions testing the uploaded problem',
      subject: effectiveSubject,
      gradeLevel,
      difficulty,
      examType,
    });
  };

  // Group grade levels by category
  const categories = Array.from(new Set(GRADE_LEVELS.map((g) => g.category)));
  const currentGradeObj = GRADE_LEVELS.find((g) => g.value === gradeLevel);
  const subjectGroups = getSubjectsForGradeLevel(gradeLevel);
  const isCbeKenya = gradeLevel.includes('CBE') || gradeLevel.includes('Primary') || gradeLevel.includes('Junior') || gradeLevel.includes('Senior') || gradeLevel.includes('KPSEA') || gradeLevel.includes('KJSEA');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" onPaste={handlePaste}>
      {/* Hero Intro */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5 text-emerald-700" />
          Kenyan CBE Curriculum (Lower/Upper Primary, Junior, Senior) &amp; Worldwide Higher Education
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Problematic Questions, Get Simple Notes &amp; Standard Exams
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
          Tailored to the official <strong>Kenyan Competency-Based Education (CBE)</strong> standards (KNEC &amp; KICD) across Lower Primary, Upper Primary, Junior School, Senior School, and <strong>Worldwide Higher Education</strong> degree levels.
        </p>
      </div>

      {/* Main Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Notice</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Configurations Row (Grade Level and Dynamic CBE Subject) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Grade Level Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                Target Educational Level
              </label>
            </div>
            <select
              value={gradeLevel}
              onChange={(e) => handleGradeLevelChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-emerald-300 bg-emerald-50/20 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {categories.map((cat) => (
                <optgroup key={cat} label={cat} className="font-bold text-slate-700 bg-slate-100">
                  {GRADE_LEVELS.filter((g) => g.category === cat).map((g) => (
                    <option key={g.value} value={g.value} className="font-normal text-slate-900 bg-white">
                      {g.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {currentGradeObj && (
              <p className="text-[11px] text-emerald-800 mt-1.5 font-medium leading-tight">
                {currentGradeObj.description}
              </p>
            )}
          </div>

          {/* Subject Selector (Dynamically populated with official CBE or Higher Ed subjects) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                {isCbeKenya ? 'Kenyan CBE Subject' : 'Academic Subject'}
              </label>
              <button
                type="button"
                onClick={() => setIsCustomSubject(!isCustomSubject)}
                className="text-[11px] text-sky-600 hover:text-sky-800 font-semibold underline"
              >
                {isCustomSubject ? 'Select from CBE list' : 'Type other subject'}
              </button>
            </div>

            {isCustomSubject ? (
              <input
                type="text"
                value={customSubjectText}
                onChange={(e) => setCustomSubjectText(e.target.value)}
                placeholder="e.g. Kiswahili, Aviation, Biochemistry..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            ) : (
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {subjectGroups.map((group) => (
                  <optgroup key={group.group} label={group.group} className="font-bold text-slate-700 bg-slate-100">
                    {group.subjects.map((subj) => (
                      <option key={subj} value={subj} className="font-normal text-slate-900 bg-white">
                        {subj}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}
            <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">
              {isCbeKenya
                ? 'Aligned with KICD & KNEC competency framework'
                : 'Aligned with worldwide university curriculum'}
            </p>
          </div>

          {/* Exam Type Format */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Assessment Format
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="targeted_drill">Targeted Drill (5 Questions on this problem)</option>
              <option value="standard_midterm">Standard Assessment (8-10 Questions + Diagrams)</option>
              <option value="comprehensive_mock">Full National Assessment Paper (Section A, B, C)</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">
              Includes mark scheme and printable PDF formatting
            </p>
          </div>
        </div>

        {/* Input area: Dual Mode (Image Upload + Text Area) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          {/* Left: Text Input */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                Problem Statement / Question
              </label>
              <span className="text-xs text-slate-500">Paste text, word problem, or equations</span>
            </div>

            {/* Quick Symbol Toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap mb-2 p-1.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                Quick Symbols:
              </span>
              {['√', 'π', 'θ', 'Δ', '∫', '∑', 'Ω', 'λ', '±', '²', '³', '÷', 'sh.', 'KES', '→', '⇌', '°C'].map(
                (sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => setQuestionText((prev) => prev + (prev.endsWith(' ') || prev === '' ? sym : ' ' + sym))}
                    className="px-2 py-0.5 rounded bg-white hover:bg-sky-100 hover:text-sky-800 text-xs font-mono font-bold text-slate-700 border border-slate-200 transition-colors shadow-2xs"
                    title={`Insert ${sym}`}
                  >
                    {sym}
                  </button>
                )
              )}
            </div>

            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder={`Enter any question for ${gradeLevel}... e.g. "If a train leaves at 3:15..." or "Calculate the derivative of f(x)..." or "Explain the role of chloroplasts in photosynthesis..."`}
              rows={8}
              className="w-full flex-1 p-4 rounded-xl border border-slate-300 font-mono text-sm leading-relaxed text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Right: Drag & Drop Image Uploader */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                Upload Photo / Worksheet / Paper
              </label>
              <span className="text-xs text-slate-500">PNG, JPG, or Screenshot</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative flex-1 rounded-xl border-2 border-indigo-200 bg-indigo-50/40 p-3 flex flex-col items-center justify-center overflow-hidden min-h-[200px]">
                <img
                  src={imagePreview}
                  alt="Uploaded problem"
                  className="max-h-48 max-w-full rounded-lg object-contain shadow-xs border border-white"
                />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="mt-2 text-xs font-semibold text-indigo-800">
                  Image attached • Ready for OCR &amp; analysis
                </p>
              </div>
            ) : (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 rounded-xl border-2 border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50/40 transition-all p-6 flex flex-col items-center justify-center cursor-pointer text-center min-h-[200px] group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center text-slate-500 group-hover:text-sky-600 transition-colors mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  Click or drag photo of worksheet/problem
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Or press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 text-[10px]">Ctrl+V</kbd> anywhere to paste screenshot
                </p>
                <span className="mt-3 text-[11px] font-medium text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                  Handwritten, book page, or diagram
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Analysis Panel (if generated) */}
        {analysisResult && (
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Diagnostic Breakdown ({analysisResult.gradeLevel || gradeLevel})
                </h3>
              </div>
              <span className="px-2.5 py-0.5 bg-amber-200/60 text-amber-900 rounded-full font-bold text-xs">
                {analysisResult.gradeLevel || gradeLevel}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="bg-white/80 p-3.5 rounded-lg border border-amber-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  Core Concept Tested
                </span>
                <p className="font-semibold text-slate-900">{analysisResult.keyConcept}</p>
                <p className="text-xs text-slate-600 mt-1">
                  Topic: {analysisResult.topic} ({analysisResult.difficulty})
                </p>
              </div>

              <div className="bg-white/80 p-3.5 rounded-lg border border-amber-100">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block mb-1">
                  The Specific Stumbling Block / Pitfall
                </span>
                <p className="text-slate-800">{analysisResult.whyTricky}</p>
              </div>
            </div>

            {analysisResult.formulas && analysisResult.formulas.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Key Rules / Formulas:</span>
                {analysisResult.formulas.map((f, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white font-mono rounded-md border border-amber-200 text-slate-800">
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Direct WhatsApp and Telegram Contact for this Tricky Question */}
            <div className="mt-4 pt-3 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-xs font-semibold text-amber-950 flex items-center gap-1.5">
                <span>Stuck on this concept? Send to tutor for 1-on-1 guidance:</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={getWhatsAppShareLink(`*Problematic Question Help Request* (${gradeLevel} - ${effectiveSubject}):\n\n"${questionText || analysisResult.extractedQuestion}"\n\n*Core concept tested:* ${analysisResult.keyConcept}\n*Stumbling block:* ${analysisResult.whyTricky}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
                <a
                  href={getTelegramShareLink(`*Problematic Question Help Request* (${gradeLevel} - ${effectiveSubject}):\n\n"${questionText || analysisResult.extractedQuestion}"\n\n*Core concept tested:* ${analysisResult.keyConcept}\n*Stumbling block:* ${analysisResult.whyTricky}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  <TelegramIcon className="w-3.5 h-3.5 fill-white" />
                  <span>Telegram: {TELEGRAM_DISPLAY}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={handleDiagnose}
            disabled={isLoading || isAnalyzing || (!questionText && !imagePreview)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{isAnalyzing ? 'Diagnosing...' : 'Diagnose Stumbling Block'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerNotes}
              disabled={isLoading || isAnalyzing || (!questionText && !imagePreview)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-sm font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BookOpen className="w-4 h-4" />
              <span>Generate Simple Notes &amp; Diagrams</span>
            </button>

            <button
              onClick={handleTriggerExam}
              disabled={isLoading || isAnalyzing || (!questionText && !imagePreview)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Generate Standard Exam (PDF)</span>
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-6 p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3 animate-pulse">
            <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
            <div>
              <p className="text-sm font-bold text-sky-900">{loadingMessage || 'Synthesizing with AI...'}</p>
              <p className="text-xs text-sky-700 mt-0.5">
                Calibrating explanations, vector diagrams, and mark scheme for <strong>{gradeLevel}</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preset Problematic Questions Bank Across Grade Levels */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Try Ready Presets by Grade Tier
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any sample problem below to test notes, outlined diagrams, and PDF exams across Kenyan CBE and worldwide tiers:
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-full shrink-0">
            CBE Kenya &amp; Worldwide Presets
          </span>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Tier:
          </span>
          {[
            { id: 'all', label: 'All Presets' },
            { id: 'lower_primary', label: 'Lower Primary (Grades 1-3)' },
            { id: 'upper_primary', label: 'Upper Primary (Grades 4-6 / KPSEA)' },
            { id: 'junior', label: 'Junior School (Grades 7-9 / KJSEA)' },
            { id: 'senior', label: 'Senior School (Grades 10-12)' },
            { id: 'tertiary', label: 'Higher Education (Worldwide)' },
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setPresetTierFilter(tier.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                presetTierFilter === tier.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Filtered Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESET_QUESTIONS.filter((p) => {
            if (presetTierFilter === 'all') return true;
            if (presetTierFilter === 'lower_primary') return p.gradeLevel.includes('Lower Primary') || p.gradeLevel.includes('Grade 1') || p.gradeLevel.includes('Grade 2') || p.gradeLevel.includes('Grade 3');
            if (presetTierFilter === 'upper_primary') return p.gradeLevel.includes('Upper Primary') || p.gradeLevel.includes('Grade 4') || p.gradeLevel.includes('Grade 5') || p.gradeLevel.includes('Grade 6') || p.gradeLevel.includes('KPSEA');
            if (presetTierFilter === 'junior') return p.gradeLevel.includes('Junior School') || p.gradeLevel.includes('Grade 7') || p.gradeLevel.includes('Grade 8') || p.gradeLevel.includes('Grade 9') || p.gradeLevel.includes('KJSEA');
            if (presetTierFilter === 'senior') return p.gradeLevel.includes('Senior School') || p.gradeLevel.includes('Grade 10') || p.gradeLevel.includes('Grade 11') || p.gradeLevel.includes('Grade 12');
            if (presetTierFilter === 'tertiary') return p.curriculum === 'Higher Education (Worldwide)' || p.gradeLevel.includes('Undergraduate') || p.gradeLevel.includes('Master') || p.gradeLevel.includes('Doctoral');
            return true;
          }).map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`font-extrabold px-2 py-0.5 rounded text-[11px] ${
                      preset.curriculum === 'CBE Kenya'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}>
                      {preset.curriculum}
                    </span>
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {preset.gradeLevel}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[11px] font-medium">{preset.subject}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                  {preset.shortSummary}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-600">
                <span className="font-semibold flex items-center gap-1 text-[11px]">
                  Outlined Diagram Included
                </span>
                <span className="font-bold flex items-center gap-0.5">
                  Load <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
