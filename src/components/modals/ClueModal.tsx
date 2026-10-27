import React from 'react';
import { TargetItem } from '../../types/game';
import { TargetIcon } from '../art/DoodleDrawnAssets';
import { X, Check, Compass } from 'lucide-react';

interface ClueModalProps {
  target: TargetItem | null;
  isFound: boolean;
  onClose: () => void;
  onFocusTarget: (target: TargetItem) => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({
  target,
  isFound,
  onClose,
  onFocusTarget,
}) => {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white doodle-box max-w-sm w-full p-5 relative shadow-doodle-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-paper-100 border border-ink-900"
          aria-label="Close Clue"
        >
          <X className="w-5 h-5 text-ink-900" />
        </button>

        {/* Target Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-paper-100 rounded-full border-2 border-ink-900 flex items-center justify-center mb-3 shadow-inner">
            <TargetIcon
              iconType={target.iconType}
              isFound={isFound}
              accentColor={target.accentColor}
              size={64}
            />
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-xl text-ink-900">{target.name}</h3>
            {isFound && (
              <span className="bg-emerald-500 text-white rounded-full p-0.5 border border-ink-900" title="Found!">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
            )}
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-ink-500 bg-paper-200 px-2 py-0.5 rounded-full border border-ink-700/30 mb-3">
            {target.category}
          </span>

          {/* Clue Text Box */}
          <div className="bg-paper-50 border-2 border-dashed border-ink-700 rounded-xl p-3 w-full mb-4">
            <p className="text-sm sm:text-base font-doodle text-ink-800 leading-relaxed italic">
              "{target.clue}"
            </p>
          </div>

          {target.hiddenBehindId && !isFound && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-300 rounded-lg p-2 mb-4">
              💡 Hint: This item is hidden! Try tapping and interacting with objects in the scene to reveal it.
            </p>
          )}

          {/* Action button */}
          <div className="flex gap-2 w-full">
            <button
              onClick={() => {
                onFocusTarget(target);
                onClose();
              }}
              className="flex-1 doodle-btn py-2 px-3 bg-amber-100 hover:bg-amber-200 flex items-center justify-center gap-2 font-bold text-sm"
            >
              <Compass className="w-4 h-4 text-amber-700" />
              Pan to Vicinity
            </button>
            <button
              onClick={onClose}
              className="doodle-btn py-2 px-4 bg-white hover:bg-paper-100 font-bold text-sm"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
