import React, { useState } from 'react';
import { Download, Copy, Check, Maximize2, Minimize2, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface DiagramRendererProps {
  svgCode: string;
  title?: string;
  description?: string;
  className?: string;
  showControls?: boolean;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  svgCode,
  title,
  description,
  className = '',
  showControls = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sanitize SVG for safe DOM insertion
  const cleanSvg = (raw: string) => {
    if (!raw) return '';
    let s = raw.trim();
    if (s.startsWith('```xml')) s = s.slice(6);
    if (s.startsWith('```svg')) s = s.slice(6);
    if (s.startsWith('```html')) s = s.slice(7);
    if (s.startsWith('```')) s = s.slice(3);
    if (s.endsWith('```')) s = s.slice(0, -3);
    s = s.trim();
    if (!s.includes('xmlns=')) {
      s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    return s;
  };

  const processedSvg = cleanSvg(svgCode);

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(processedSvg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([processedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || 'outlined_diagram').replace(/\s+/g, '_').toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    const blob = new Blob([processedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 750;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${(title || 'outlined_diagram').replace(/\s+/g, '_').toLowerCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div
      className={`relative bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs ${
        isFullscreen
          ? 'fixed inset-4 z-50 flex flex-col justify-between shadow-2xl bg-white border-slate-300'
          : ''
      } ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {title || 'Outlined Vector Diagram'}
          </span>
        </div>

        {showControls && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
              title="Zoom In"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
              title="Zoom Out"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              title="Reset Zoom"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <div className="h-4 w-px bg-slate-300 mx-1"></div>
            <button
              onClick={handleCopySvg}
              title="Copy SVG Code"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1 text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'SVG'}</span>
            </button>
            <button
              onClick={handleDownloadSvg}
              title="Download as SVG file"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.SVG</span>
            </button>
            <button
              onClick={handleDownloadPng}
              title="Download as PNG image"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.PNG</span>
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* SVG Canvas display */}
      <div className="p-4 sm:p-6 flex items-center justify-center bg-white overflow-auto min-h-[220px]">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.15s ease' }}
          className="w-full flex items-center justify-center max-h-[460px] outlined-diagram-svg"
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />
      </div>

      {/* Caption footer */}
      {description && (
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 italic">
          Figure: {description}
        </div>
      )}
    </div>
  );
};
