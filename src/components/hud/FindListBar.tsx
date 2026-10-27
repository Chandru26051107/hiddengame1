import React, { useState } from 'react';
import { TargetItem } from '../../types/game';
import { TargetIcon } from '../art/DoodleDrawnAssets';
import { Check, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';

interface FindListBarProps {
  targets: TargetItem[];
  foundTargetIds: string[];
  onSelectTarget: (target: TargetItem) => void;
  showLabels?: boolean;
}

export const FindListBar: React.FC<FindListBarProps> = ({
  targets,
  foundTargetIds,
  onSelectTarget,
  showLabels = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const foundCount = foundTargetIds.length;
  const totalCount = targets.length;
  const progressPercent = Math.round((foundCount / totalCount) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 pointer-events-auto">
      {/* Top Handle / Header bar */}
      <div className="max-w-4xl mx-auto px-3">
        <div className="bg-white doodle-box px-3 py-1.5 flex items-center justify-between text-ink-900 border-b-0 rounded-b-none shadow-doodle">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-gold inline animate-spin" style={{ animationDuration: '6s' }} />
              Find List
            </span>
            <span className="bg-paper-200 border border-ink-900 text-xs px-2 py-0.5 rounded-full font-bold">
              {foundCount} / {totalCount}
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex-1 max-w-xs mx-4 hidden sm:block">
            <div className="h-2.5 w-full bg-paper-200 rounded-full border border-ink-900 overflow-hidden">
              <div
                className="h-full bg-accent-gold transition-all duration-500 ease-out border-r border-ink-900"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-paper-100 rounded-lg border border-ink-900 transition-colors"
            aria-label={isCollapsed ? 'Expand Find List' : 'Collapse Find List'}
          >
            {isCollapsed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Target Items Horizontal Drawer */}
      {!isCollapsed && (
        <div className="bg-paper-50 border-t-2 border-ink-900 shadow-2xl pb-4 pt-2.5 px-3">
          <div className="max-w-5xl mx-auto">
            <div
              className="flex items-center gap-3 overflow-x-auto py-1 px-1 scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                overscrollBehaviorX: 'contain',
              }}
            >
              {targets.map((target) => {
                const isFound = foundTargetIds.includes(target.id);

                return (
                  <button
                    key={target.id}
                    onClick={() => onSelectTarget(target)}
                    className={`flex-shrink-0 flex flex-col items-center justify-between p-2 rounded-xl border-2 transition-all duration-200 min-w-[76px] sm:min-w-[88px] relative ${
                      isFound
                        ? 'bg-amber-50/70 border-amber-500 shadow-sm'
                        : 'bg-white border-ink-900 shadow-doodle hover:translate-y-[-2px]'
                    }`}
                    title={isFound ? `${target.name} (Found!)` : `Tap for clue: ${target.name}`}
                  >
                    {/* Checkmark or Info badge */}
                    {isFound ? (
                      <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-ink-900 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="absolute -top-1.5 -right-1.5 text-ink-500 bg-paper-100 rounded-full p-0.5 border border-ink-700 opacity-60 hover:opacity-100">
                        <HelpCircle className="w-3 h-3" />
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-11 h-11 flex items-center justify-center my-0.5">
                      <TargetIcon
                        iconType={target.iconType}
                        isFound={isFound}
                        accentColor={target.accentColor}
                        size={42}
                      />
                    </div>

                    {/* Target Name */}
                    {showLabels && (
                      <span
                        className={`text-xs text-center font-doodle font-semibold line-clamp-1 max-w-[80px] mt-1 ${
                          isFound ? 'text-amber-900 line-through decoration-amber-600/70' : 'text-ink-900'
                        }`}
                      >
                        {target.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
