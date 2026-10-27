import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LevelData, LevelProgress } from '../../types/game';
import { soundManager } from '../../audio/SoundManager';
import { Star, Clock, Lightbulb, MousePointerClick, ArrowRight, RotateCcw, List } from 'lucide-react';

interface LevelCompleteModalProps {
  level: LevelData;
  progress: LevelProgress;
  onNextLevel: () => void;
  onReplayLevel: () => void;
  onOpenLevelSelect: () => void;
  hasNextLevel: boolean;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  progress,
  onNextLevel,
  onReplayLevel,
  onOpenLevelSelect,
  hasNextLevel,
}) => {
  useEffect(() => {
    soundManager.playCompleteSound();

    // Trigger joyful confetti bursts
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#eab308', '#ef4444', '#3b82f6', '#10b981'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#f59e0b', '#8b5cf6', '#ec4899'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white doodle-box max-w-md w-full p-6 text-center shadow-doodle-xl relative">
        {/* Banner */}
        <div className="inline-block bg-accent-gold text-ink-900 border-2 border-ink-900 font-display font-bold px-4 py-1 rounded-full -rotate-2 mb-3 shadow-doodle text-sm uppercase tracking-wider">
          Level Cleared!
        </div>

        <h2 className="font-display font-bold text-3xl text-ink-900 mb-1">{level.title}</h2>
        <p className="text-sm text-ink-600 font-doodle mb-4">You found all hidden objects in this biome!</p>

        {/* 3 Stars */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="w-14 h-14 bg-amber-50 rounded-2xl border-2 border-ink-900 flex items-center justify-center shadow-doodle animate-found-pop"
              style={{ animationDelay: `${s * 0.15}s` }}
            >
              <Star className="w-8 h-8 text-ink-900 fill-amber-400" />
            </div>
          ))}
        </div>

        {/* Stats summary cards */}
        <div className="grid grid-cols-3 gap-2.5 my-5 bg-paper-100 p-3 rounded-2xl border-2 border-ink-900">
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-ink-500 mb-1" />
            <span className="text-[11px] font-bold text-ink-500 uppercase">Time</span>
            <span className="text-sm font-bold font-doodle text-ink-900">{formatTime(progress.timeSpentSeconds)}</span>
          </div>

          <div className="flex flex-col items-center border-x-2 border-ink-300">
            <Lightbulb className="w-5 h-5 text-amber-500 mb-1" />
            <span className="text-[11px] font-bold text-ink-500 uppercase">Hints</span>
            <span className="text-sm font-bold font-doodle text-ink-900">{progress.hintsUsedCount}</span>
          </div>

          <div className="flex flex-col items-center">
            <MousePointerClick className="w-5 h-5 text-ink-500 mb-1" />
            <span className="text-[11px] font-bold text-ink-500 uppercase">Interactions</span>
            <span className="text-sm font-bold font-doodle text-ink-900">{progress.clicksCount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2">
          {hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="doodle-btn py-3 px-4 bg-emerald-400 hover:bg-emerald-300 font-display font-bold text-lg flex items-center justify-center gap-2"
            >
              <span>Next Biome</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onOpenLevelSelect}
              className="doodle-btn py-3 px-4 bg-emerald-400 hover:bg-emerald-300 font-display font-bold text-lg flex items-center justify-center gap-2"
            >
              <span>All Biomes Completed!</span>
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={onReplayLevel}
              className="flex-1 doodle-btn py-2 px-3 bg-paper-100 hover:bg-paper-200 font-bold text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Replay
            </button>
            <button
              onClick={onOpenLevelSelect}
              className="flex-1 doodle-btn py-2 px-3 bg-paper-100 hover:bg-paper-200 font-bold text-sm flex items-center justify-center gap-1.5"
            >
              <List className="w-4 h-4" />
              Level Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
