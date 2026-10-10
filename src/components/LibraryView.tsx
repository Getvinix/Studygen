import React, { useState } from 'react';
import {
  FolderArchive,
  BookOpen,
  FileText,
  PenTool,
  Trash2,
  Download,
  Upload,
  ArrowRight,
  ExternalLink,
  Calendar,
  Layers,
} from 'lucide-react';
import { SimpleNote, StandardExam, GeneratedDiagramItem } from '../types';

interface LibraryViewProps {
  savedNotes: SimpleNote[];
  savedExams: StandardExam[];
  savedDiagrams: GeneratedDiagramItem[];
  onOpenNote: (note: SimpleNote) => void;
  onOpenExam: (exam: StandardExam) => void;
  onDeleteNote: (id: string) => void;
  onDeleteExam: (id: string) => void;
  onDeleteDiagram: (id: string) => void;
  onExportBackup: () => void;
  onImportBackup: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  savedNotes,
  savedExams,
  savedDiagrams,
  onOpenNote,
  onOpenExam,
  onDeleteNote,
  onDeleteExam,
  onDeleteDiagram,
  onExportBackup,
  onImportBackup,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'notes' | 'exams' | 'diagrams'>('all');

  const totalItems = savedNotes.length + savedExams.length + savedDiagrams.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold mb-2">
            <FolderArchive className="w-3.5 h-3.5 text-purple-600" />
            Local Offline Storage • Zero Account Needed
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Study &amp; Exam Library
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            All your notes, exams, and outlined diagrams are saved privately in your browser storage.
          </p>
        </div>

        {/* Backup / Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExportBackup}
            disabled={totalItems === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={onImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Items ({totalItems})
        </button>
        <button
          onClick={() => setActiveFilter('notes')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'notes'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Notes ({savedNotes.length})</span>
        </button>
        <button
          onClick={() => setActiveFilter('exams')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'exams'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Standard Exams ({savedExams.length})</span>
        </button>
        <button
          onClick={() => setActiveFilter('diagrams')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeFilter === 'diagrams'
              ? 'bg-amber-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Outlined Diagrams ({savedDiagrams.length})</span>
        </button>
      </div>

      {/* Empty State */}
      {totalItems === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FolderArchive className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">Your library is currently empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Solve problematic questions, generate notes, or create standard exam papers and click "Save" to keep them here indefinitely!
          </p>
        </div>
      )}

      {/* Grid of Saved Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Saved Notes */}
        {(activeFilter === 'all' || activeFilter === 'notes') &&
          savedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-sky-400 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {note.subject}
                    </span>
                    {note.gradeLevel && (
                      <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {note.gradeLevel}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 text-[11px]">Note</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{note.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{note.topic}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenNote(note)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>Open Note</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete from library"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        {/* Saved Exams */}
        {(activeFilter === 'all' || activeFilter === 'exams') &&
          savedExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-emerald-400 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {exam.subject}
                    </span>
                    {exam.gradeLevel && (
                      <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {exam.gradeLevel}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">{exam.paperCode}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{exam.paperTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {exam.durationMinutes} mins • {exam.totalMarks} marks • PDF Ready
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenExam(exam)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Open Exam Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteExam(exam.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete from library"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        {/* Saved Diagrams */}
        {(activeFilter === 'all' || activeFilter === 'diagrams') &&
          savedDiagrams.map((diag) => (
            <div
              key={diag.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Diagram
                  </span>
                  <span className="text-slate-400 text-[11px]">Vector SVG</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{diag.title}</h3>
                <div
                  className="my-3 max-h-24 overflow-hidden border border-slate-100 rounded bg-slate-50 p-2 flex items-center justify-center pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: diag.svgCode }}
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Outlined graphic</span>
                <button
                  onClick={() => onDeleteDiagram(diag.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete diagram"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
