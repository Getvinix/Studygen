import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  CheckCircle,
  Flame,
  X,
  ChevronDown,
} from 'lucide-react';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

const DEFAULT_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const POMODORO_STORAGE_KEY = 'openlearn_pomodoro_state_v1';

/**
 * Plays a gentle, pleasant synthetic chime using Web Audio API
 */
function playChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Notes: C5 (523.25Hz) followed by E5 (659.25Hz) and G5 (783.99Hz)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.6);
    });
  } catch (err) {
    console.warn('Audio chime could not be played:', err);
  }
}

export const PomodoroTimer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize from LocalStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(POMODORO_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mode && DEFAULT_DURATIONS[parsed.mode as PomodoroMode]) {
          setMode(parsed.mode);
        }
        if (typeof parsed.timeLeft === 'number' && parsed.timeLeft > 0) {
          setTimeLeft(parsed.timeLeft);
        }
        if (typeof parsed.completedSessions === 'number') {
          setCompletedSessions(parsed.completedSessions);
        }
        if (typeof parsed.soundEnabled === 'boolean') {
          setSoundEnabled(parsed.soundEnabled);
        }
      }
    } catch (e) {
      console.warn('Failed to restore Pomodoro state:', e);
    }
  }, []);

  // Save state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        POMODORO_STORAGE_KEY,
        JSON.stringify({
          mode,
          timeLeft,
          completedSessions,
          soundEnabled,
        })
      );
    } catch (e) {
      console.warn('Failed to persist Pomodoro state:', e);
    }
  }, [mode, timeLeft, completedSessions, soundEnabled]);

  // Click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Main countdown timer interval
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsRunning(false);
            if (soundEnabled) {
              playChimeSound();
            }

            if (mode === 'focus') {
              setCompletedSessions((c) => c + 1);
              setShowCelebration(true);
              setTimeout(() => setShowCelebration(false), 5000);
              // Propose short break
              setMode('shortBreak');
              return DEFAULT_DURATIONS.shortBreak;
            } else {
              // Break finished, switch back to focus
              setMode('focus');
              return DEFAULT_DURATIONS.focus;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, soundEnabled]);

  // Update document title with timer status when running
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (isRunning) {
      const modeLabel = mode === 'focus' ? '🎯 Focus' : '☕ Break';
      document.title = `(${timeFormatted}) ${modeLabel} | OpenLearn`;
    } else {
      document.title = 'OpenLearn - Free Study Notes & Exam Generator';
    }
  }, [timeLeft, isRunning, mode]);

  const switchMode = (newMode: PomodoroMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DEFAULT_DURATIONS[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_DURATIONS[mode]);
  };

  const adjustMinutes = (delta: number) => {
    setTimeLeft((prev) => {
      const updated = prev + delta * 60;
      return Math.max(60, Math.min(updated, 90 * 60)); // Clamp between 1m and 90m
    });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const modeThemes = {
    focus: {
      label: 'Focus Session',
      color: 'rose',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      activeTabBg: 'bg-rose-600 text-white',
      ringColor: 'ring-rose-500',
      icon: <Brain className="w-3.5 h-3.5 text-rose-600" />,
    },
    shortBreak: {
      label: 'Short Break',
      color: 'emerald',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeTabBg: 'bg-emerald-600 text-white',
      ringColor: 'ring-emerald-500',
      icon: <Coffee className="w-3.5 h-3.5 text-emerald-600" />,
    },
    longBreak: {
      label: 'Long Break',
      color: 'sky',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      activeTabBg: 'bg-sky-600 text-white',
      ringColor: 'ring-sky-500',
      icon: <Coffee className="w-3.5 h-3.5 text-sky-600" />,
    },
  };

  const currentTheme = modeThemes[mode];

  return (
    <div className="relative no-print" ref={containerRef}>
      {/* Header Quick Pill */}
      <div className="flex items-center rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 p-0.5 transition-all shadow-2xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-800 rounded-lg hover:text-slate-900 transition-colors group"
          title="Open Pomodoro Study Timer Controls"
        >
          <span className="flex items-center gap-1">
            {isRunning ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            ) : (
              currentTheme.icon
            )}
            <span className="font-mono font-bold tracking-tight text-slate-900">
              {formattedTime}
            </span>
          </span>
          <span className="hidden xl:inline text-[11px] text-slate-500 font-medium">
            {mode === 'focus' ? 'Focus' : 'Break'}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform ${
              isOpen ? 'rotate-180 text-slate-700' : ''
            }`}
          />
        </button>

        {/* Quick Play/Pause Button on Pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsRunning(!isRunning);
          }}
          className={`p-1 rounded-lg text-white transition-transform active:scale-95 ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500'
              : 'bg-slate-900 hover:bg-slate-800'
          }`}
          title={isRunning ? 'Pause Timer' : 'Start Focus Session'}
        >
          {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>

      {/* Popover Controller Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-76 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Pomodoro Study Timer</h4>
                <p className="text-[10px] text-slate-500">Stay focused while solving or revising</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl my-3 text-xs font-semibold">
            <button
              onClick={() => switchMode('focus')}
              className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                mode === 'focus'
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Focus 25m
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                mode === 'shortBreak'
                  ? 'bg-white text-emerald-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Short 5m
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                mode === 'longBreak'
                  ? 'bg-white text-sky-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Long 15m
            </button>
          </div>

          {/* Large Digital Clock Display with Progress */}
          <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase mb-1 ${currentTheme.badgeBg}`}
            >
              {currentTheme.label}
            </span>

            <div className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 my-1">
              {formattedTime}
            </div>

            {/* Quick Adjustment Buttons */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={() => adjustMinutes(-5)}
                disabled={timeLeft <= 300}
                className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 text-[11px] font-semibold flex items-center gap-0.5 disabled:opacity-40"
                title="Subtract 5 minutes"
              >
                <Minus className="w-2.5 h-2.5" /> 5m
              </button>
              <button
                onClick={() => adjustMinutes(5)}
                className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 text-[11px] font-semibold flex items-center gap-0.5"
                title="Add 5 minutes"
              >
                <Plus className="w-2.5 h-2.5" /> 5m
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause Timer' : 'Start Focus'}</span>
            </button>

            <button
              onClick={handleReset}
              className="py-2 px-3 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Bottom Stats & Sound Toggle */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>
                {completedSessions} {completedSessions === 1 ? 'Session' : 'Sessions'} Done
              </span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 text-[11px] font-medium transition-colors ${
                soundEnabled
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
              title={soundEnabled ? 'Chime sound is ON' : 'Chime sound is OFF'}
            >
              {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>{soundEnabled ? 'Chime ON' : 'Mute'}</span>
            </button>
          </div>

          {/* Quick study tip */}
          <p className="mt-2 text-[10px] text-slate-400 text-center leading-tight">
            Persists across all tabs: Solve questions, read notes, and test exams without losing your session.
          </p>
        </div>
      )}

      {/* Completion Toast Banner */}
      {showCelebration && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>Great job! Focus session completed. Take a 5-minute break! ☕</span>
        </div>
      )}
    </div>
  );
};
