import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import {
  WhatsAppIcon,
  TelegramIcon,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
  TELEGRAM_NUMBER,
  TELEGRAM_DISPLAY,
  TELEGRAM_LINK,
  getWhatsAppShareLink,
  getTelegramShareLink,
} from './SocialIcons';

interface FloatingTutorWidgetProps {
  currentQuestionText?: string;
  currentSubject?: string;
  currentGradeLevel?: string;
}

export const FloatingTutorWidget: React.FC<FloatingTutorWidgetProps> = ({
  currentQuestionText,
  currentSubject,
  currentGradeLevel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const questionPrompt = currentQuestionText
    ? `Hello Tutor! I need help with this ${currentGradeLevel || ''} ${currentSubject || ''} question:\n"${currentQuestionText.slice(0, 180)}..."`
    : `Hello Tutor! I am studying on OpenLearn and would like guidance with my studies.`;

  const dynamicWhatsAppLink = getWhatsAppShareLink(questionPrompt);
  const dynamicTelegramLink = getTelegramShareLink(questionPrompt);

  return (
    <div className="fixed bottom-5 left-5 z-50 no-print">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">OpenLearn Tutor Help Desk</h4>
                  <p className="text-[11px] text-slate-300">Free assistance for learners &amp; teachers</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 text-xs text-slate-700 bg-slate-50">
            <p className="text-slate-600 leading-relaxed">
              Have a tricky question, CBE assessment inquiry, or need tutoring explanation? Reach out directly via WhatsApp or Telegram:
            </p>

            {/* WhatsApp Card */}
            <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs hover:border-emerald-400 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <div className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                  </div>
                  <span>WhatsApp Tutor Line</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Online
                </span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm mb-2">
                {WHATSAPP_DISPLAY}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] transition-colors"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-white" />
                  <span>Direct Chat</span>
                </a>
                <a
                  href={dynamicWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-semibold text-[11px] transition-colors"
                  title="Send current problem to tutor"
                >
                  <span>Ask Problem</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Telegram Card */}
            <div className="bg-white p-3 rounded-xl border border-sky-200 shadow-2xs hover:border-sky-400 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-sky-800">
                  <div className="w-6 h-6 rounded-md bg-sky-100 flex items-center justify-center text-sky-700">
                    <TelegramIcon className="w-3.5 h-3.5 fill-sky-600" />
                  </div>
                  <span>Telegram Tutor Line</span>
                </div>
                <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <p className="font-mono font-bold text-slate-900 text-sm mb-2">
                {TELEGRAM_DISPLAY}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-[11px] transition-colors"
                >
                  <TelegramIcon className="w-3 h-3 fill-white" />
                  <span>Direct Chat</span>
                </a>
                <a
                  href={dynamicTelegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-lg font-semibold text-[11px] transition-colors"
                  title="Send current problem to tutor"
                >
                  <span>Ask Problem</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center pt-1">
              Kenyan CBE Curriculum (Grade 1 - 12) &amp; Worldwide Higher Education Support
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl border border-slate-700 hover:scale-105 transition-all group"
      >
        <div className="flex items-center -space-x-1">
          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white ring-2 ring-slate-900">
            <WhatsAppIcon className="w-3 h-3 fill-white" />
          </div>
          <div className="w-6 h-6 rounded-full bg-sky-600 flex items-center justify-center text-white ring-2 ring-slate-900">
            <TelegramIcon className="w-3 h-3 fill-white" />
          </div>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-xs font-bold leading-tight">Tutor Help Desk</p>
          <p className="text-[10px] text-slate-400 leading-tight">WhatsApp &amp; Telegram</p>
        </div>
      </button>
    </div>
  );
};
