import React from 'react';
import { LevelData, LevelProgress } from '../../types/game';
import { X, Star, Compass, CheckCircle2, Play } from 'lucide-react';

interface LevelSelectModalProps {
  levels: LevelData[];
  currentLevelId: string;
  progressMap: Record<string, LevelProgress>;
  onSelectLevel: (levelId: string) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  levels,
  currentLevelId,
  progressMap,
  onSelectLevel,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-900/40 backdrop-blur-sm">
      <div className="bg-white doodle-box max-w-2xl w-full p-5 sm:p-6 relative max-h-[90vh] flex flex-col shadow-doodle-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink-900 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-accent-gold" />
            <h2 className="font-display font-bold text-2xl text-ink-900">Select Biome & Level</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper-100 border border-ink-900"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-ink-900" />
          </button>
        </div>

        {/* Level List */}
        <div className="overflow-y-auto pr-1 space-y-3 flex-1" style={{ scrollbarWidth: 'thin' }}>
          {levels.map((lvl) => {
            const progress = progressMap[lvl.id] || {
              foundTargetIds: [],
              completed: false,
              stars: 0,
            };

            const foundCount = progress.foundTargetIds.length;
            const totalCount = lvl.targets.length;
            const isCompleted = foundCount >= totalCount;
            const isCurrent = lvl.id === currentLevelId;

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onClose();
                }}
                className={`doodle-box p-3 sm:p-4 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-accent-gold bg-amber-50/60 ring-2 ring-accent-gold'
                    : 'bg-white hover:bg-paper-50'
                }`}
              >
                {/* Level Title & Details */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl border-2 border-ink-900 bg-paper-100 flex items-center justify-center font-display font-bold text-xl text-ink-800 shadow-sm flex-shrink-0">
                    {lvl.levelNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-lg text-ink-900">{lvl.title}</h3>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      )}
                    </div>
                    <p className="text-xs text-ink-700 font-doodle line-clamp-1">{lvl.subtitle}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs font-semibold text-ink-500">
                      <span>Targets: {foundCount} / {totalCount}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[1, 2, 3].map((starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 ${
                              isCompleted || (foundCount >= totalCount * (starIdx / 3))
                                ? 'fill-amber-400 text-ink-900'
                                : 'text-paper-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <button className="doodle-btn px-4 py-1.5 bg-paper-50 hover:bg-paper-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 self-end sm:self-center">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isCurrent ? 'Current' : 'Play'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
