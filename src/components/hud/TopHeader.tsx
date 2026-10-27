import React from 'react';
import { Volume2, VolumeX, Lightbulb, Settings, Map, ZoomIn, ZoomOut, Maximize2, Compass } from 'lucide-react';
import { LevelData } from '../../types/game';

interface TopHeaderProps {
  level: LevelData;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hintsRemaining: number;
  hintCooldown: number; // seconds remaining, 0 if ready
  onUseHint: () => void;
  onOpenSettings: () => void;
  onOpenLevelSelect: () => void;
  showMinimap: boolean;
  onToggleMinimap: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  level,
  soundEnabled,
  onToggleSound,
  hintsRemaining,
  hintCooldown,
  onUseHint,
  onOpenSettings,
  onOpenLevelSelect,
  showMinimap,
  onToggleMinimap,
  onZoomIn,
  onZoomOut,
  onResetView,
}) => {
  const isHintDisabled = hintsRemaining <= 0 || hintCooldown > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-2 sm:p-3 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Level Name & Select */}
        <button
          onClick={onOpenLevelSelect}
          className="pointer-events-auto doodle-btn px-3 py-1.5 flex items-center gap-2 bg-white hover:bg-paper-50"
          title="Choose Level / Biome"
        >
          <Compass className="w-5 h-5 text-accent-gold" />
          <div className="text-left">
            <div className="text-[10px] text-ink-500 font-bold uppercase tracking-wider">Level {level.levelNumber}</div>
            <div className="text-sm sm:text-base font-bold font-display leading-tight">{level.title}</div>
          </div>
        </button>

        {/* Center / Camera Controls */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 doodle-box px-2 py-1 bg-white/95">
          <button
            onClick={onZoomIn}
            className="p-1 hover:bg-paper-100 rounded text-ink-800"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={onZoomOut}
            className="p-1 hover:bg-paper-100 rounded text-ink-800"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onResetView}
            className="p-1 hover:bg-paper-100 rounded text-ink-800"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {/* Hint Button */}
          <button
            onClick={onUseHint}
            disabled={isHintDisabled}
            className={`doodle-btn px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 ${
              isHintDisabled
                ? 'opacity-60 cursor-not-allowed bg-paper-200'
                : 'bg-amber-100 hover:bg-amber-200'
            }`}
            title={hintCooldown > 0 ? `Hint ready in ${hintCooldown}s` : 'Use a Hint!'}
          >
            <Lightbulb
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                !isHintDisabled ? 'text-amber-600 fill-amber-500' : 'text-ink-500'
              }`}
            />
            <span className="font-bold text-xs sm:text-sm">
              {hintCooldown > 0 ? `${hintCooldown}s` : `Hint (${hintsRemaining})`}
            </span>
          </button>

          {/* Minimap toggle */}
          <button
            onClick={onToggleMinimap}
            className={`doodle-btn p-2 ${showMinimap ? 'bg-amber-50' : 'bg-white'}`}
            title="Toggle Minimap"
          >
            <Map className="w-4 h-4 sm:w-5 sm:h-5 text-ink-800" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="doodle-btn p-2 bg-white"
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-ink-800" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
            )}
          </button>

          {/* Settings / Pause */}
          <button
            onClick={onOpenSettings}
            className="doodle-btn p-2 bg-white"
            title="Settings & Accessibility"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-ink-800" />
          </button>
        </div>
      </div>
    </header>
  );
};
