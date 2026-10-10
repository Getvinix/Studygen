import React, { useState } from 'react';
import { PenTool, Sparkles, Download, Copy, Check, Search, BookOpen, Layers } from 'lucide-react';
import { GeneratedDiagramItem } from '../types';
import { DiagramRenderer } from './DiagramRenderer';

interface DiagramStudioProps {
  onSaveDiagram?: (diagram: GeneratedDiagramItem) => void;
}

const PRESET_DIAGRAM_IDEAS = [
  {
    title: 'Converging Lens Ray Optics',
    subject: 'Physics',
    prompt: 'Converging convex lens with principal axis, focal points F and 2F, object arrow beyond 2F, and three standard principal rays forming a real inverted image.',
  },
  {
    title: 'Wheatstone Bridge Electric Circuit',
    subject: 'Physics',
    prompt: 'Standard diamond Wheatstone bridge circuit with four resistors R1, R2, R3, Rx, central galvanometer G with zero deflection, and DC voltage source.',
  },
  {
    title: 'Human Nephron & Countercurrent Flow',
    subject: 'Biology',
    prompt: 'Human kidney nephron schematic showing Bowman capsule, glomerulus, proximal convoluted tubule, Loop of Henle with descending and ascending limbs, and collecting duct.',
  },
  {
    title: 'Galvanic Electrochemical Cell',
    subject: 'Chemistry',
    prompt: 'Electrochemical Galvanic cell with zinc anode, copper cathode, electrolyte solutions, voltmeter, and inverted U-tube salt bridge with ion flow arrows.',
  },
  {
    title: 'Inverted Cone Calculus Related Rates',
    subject: 'Mathematics',
    prompt: 'Inverted conical water tank showing water level height h, instantaneous radius r, total height 10m, top radius 4m, and inflow rate arrow dV/dt.',
  },
  {
    title: 'AVL Tree Left-Right Rotation',
    subject: 'Computer Science',
    prompt: 'Binary Search Tree before and after Left-Right (LR) double rotation showing nodes with balance factors and step-by-step balanced tree state.',
  },
];

export const DiagramStudio: React.FC<DiagramStudioProps> = ({ onSaveDiagram }) => {
  const [prompt, setPrompt] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDiagram, setCurrentDiagram] = useState<GeneratedDiagramItem | null>(null);
  const [recentDiagrams, setRecentDiagrams] = useState<GeneratedDiagramItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async (customPrompt?: string, customSubject?: string) => {
    const textPrompt = (customPrompt || prompt).trim();
    if (!textPrompt) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textPrompt,
          subject: customSubject || subject,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate diagram');

      const newItem: GeneratedDiagramItem = {
        id: `diag-${Date.now()}`,
        title: data.title || textPrompt.slice(0, 30),
        caption: data.caption || '',
        svgCode: data.svgCode,
        componentsLegend: data.componentsLegend || [],
        createdAt: new Date().toISOString(),
      };

      setCurrentDiagram(newItem);
      setRecentDiagrams((prev) => [newItem, ...prev.slice(0, 9)]);
      if (onSaveDiagram) onSaveDiagram(newItem);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error generating diagram');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold mb-3">
          <PenTool className="w-3.5 h-3.5 text-amber-700" />
          Outlined Vector Diagram Studio
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Scientific &amp; Academic Outlined Diagrams
        </h1>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          Generate clean, publication-ready vector outlined diagrams for any science or math concept.
          Download as SVG or PNG, or embed directly into notes and exam papers.
        </p>
      </div>

      {/* Generator Prompt Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div className="sm:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Diagram Concept / Description
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Total internal reflection with incident ray, reflected ray, critical angle, and normal line..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-medium text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Field
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Produces scalable high-contrast vector outlines with annotations
          </span>
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !prompt.trim()}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Drawing Diagram...' : 'Generate Outlined Diagram'}</span>
          </button>
        </div>
      </div>

      {/* Preset Ideas Carousel */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          Quick One-Click Diagram Presets
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_DIAGRAM_IDEAS.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(idea.prompt);
                setSubject(idea.subject);
                handleGenerate(idea.prompt, idea.subject);
              }}
              className="text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <span className="text-[10px] font-bold uppercase text-amber-700 block mb-0.5">
                {idea.subject}
              </span>
              <p className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition-colors">
                {idea.title}
              </p>
              <p className="text-xs text-slate-500 line-clamp-1 mt-1">{idea.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Diagram Display */}
      {currentDiagram && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{currentDiagram.title}</h2>
            <DiagramRenderer
              svgCode={currentDiagram.svgCode}
              title={currentDiagram.title}
              description={currentDiagram.caption}
            />

            {/* Components legend */}
            {currentDiagram.componentsLegend && currentDiagram.componentsLegend.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Labelled Components &amp; Annotations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {currentDiagram.componentsLegend.map((comp, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                    >
                      <span className="font-bold text-slate-900 block font-mono">{comp.label}</span>
                      <span className="text-slate-600">{comp.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
