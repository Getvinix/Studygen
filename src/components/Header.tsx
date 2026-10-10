import React from 'react';
import { BookOpen, FileText, PenTool, Sparkles, FolderArchive, ShieldCheck, MessageCircle } from 'lucide-react';
import {
  WhatsAppIcon,
  TelegramIcon,
  WHATSAPP_LINK,
  WHATSAPP_DISPLAY,
  TELEGRAM_LINK,
  TELEGRAM_DISPLAY,
} from './SocialIcons';
import { PomodoroTimer } from './PomodoroTimer';

interface HeaderProps {
  activeTab: 'upload' | 'notes' | 'exam' | 'diagrams' | 'library';
  setActiveTab: (tab: 'upload' | 'notes' | 'exam' | 'diagrams' | 'library') => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, savedCount }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Free Badges */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('upload')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  OpenLearn
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  100% Free • CBE &amp; Worldwide
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Solve Question</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'notes'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Simple Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'exam'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Standard Exam</span>
            </button>

            <button
              onClick={() => setActiveTab('diagrams')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'diagrams'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">Diagrams</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'library'
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderArchive className="w-4 h-4 text-purple-600" />
              <span className="hidden sm:inline">Library</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-slate-900 text-white rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Pomodoro Study Timer (Persists Across All Views) */}
            <div className="ml-1 sm:ml-2">
              <PomodoroTimer />
            </div>

            {/* Direct WhatsApp and Telegram Contact Buttons */}
            <div className="hidden lg:flex items-center gap-1.5 ml-1 pl-2 border-l border-slate-200">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat with Tutor on WhatsApp: ${WHATSAPP_DISPLAY}`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                <span className="hidden xl:inline">{WHATSAPP_DISPLAY}</span>
                <span className="xl:hidden">WhatsApp</span>
              </a>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title={`Chat with Tutor on Telegram: ${TELEGRAM_DISPLAY}`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-colors"
              >
                <TelegramIcon className="w-3.5 h-3.5 fill-sky-500" />
                <span className="hidden xl:inline">{TELEGRAM_DISPLAY}</span>
                <span className="xl:hidden">Telegram</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Sub-banner with direct WhatsApp and Telegram links */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-center text-xs font-medium border-t border-slate-800 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Free Forever • No Login Required
        </span>
        <span className="text-slate-600 hidden sm:inline">•</span>

        {/* WhatsApp direct click */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
          <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
        </a>

        <span className="text-slate-600 hidden sm:inline">•</span>

        {/* Telegram direct click */}
        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold hover:underline"
        >
          <TelegramIcon className="w-3.5 h-3.5 fill-sky-400" />
          <span>Telegram: {TELEGRAM_DISPLAY}</span>
        </a>
      </div>
    </header>
  );
};
