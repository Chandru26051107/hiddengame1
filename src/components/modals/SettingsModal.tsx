import React, { useState } from 'react';
import { GameSettings } from '../../types/game';
import { X, Volume2, VolumeX, Eye, HelpCircle, Trash2, Sliders, Smartphone, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'controls'>('settings');
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white doodle-box max-w-lg w-full p-5 sm:p-6 relative max-h-[90vh] flex flex-col shadow-doodle-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink-900 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-accent-gold" />
            <h2 className="font-display font-bold text-2xl text-ink-900">Options & Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-paper-100 border border-ink-900"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-ink-900" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-1.5 px-3 rounded-xl border-2 border-ink-900 font-bold text-sm transition-all ${
              activeTab === 'settings' ? 'bg-amber-100 shadow-doodle' : 'bg-paper-50 text-ink-600'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-1.5 px-3 rounded-xl border-2 border-ink-900 font-bold text-sm transition-all ${
              activeTab === 'controls' ? 'bg-amber-100 shadow-doodle' : 'bg-paper-50 text-ink-600'
            }`}
          >
            How to Play
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-4" style={{ scrollbarWidth: 'thin' }}>
          {activeTab === 'settings' ? (
            <>
              {/* Audio Settings */}
              <div className="bg-paper-50 p-3.5 rounded-xl border-2 border-ink-900 space-y-3">
                <h3 className="font-display font-bold text-base text-ink-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-accent-gold" />
                  Audio & Sound Effects
                </h3>

                {/* Master Sound Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold font-doodle text-ink-800">Master Sound</span>
                  <button
                    onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                    className={`doodle-btn px-3 py-1 flex items-center gap-1.5 text-xs font-bold ${
                      settings.soundEnabled ? 'bg-emerald-300' : 'bg-rose-200'
                    }`}
                  >
                    {settings.soundEnabled ? <Check className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    {settings.soundEnabled ? 'Enabled' : 'Muted'}
                  </button>
                </div>

                {/* SFX Volume */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-600 mb-1">
                    <span>Interaction Sound Effects</span>
                    <span>{Math.round(settings.sfxVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.sfxVolume}
                    disabled={!settings.soundEnabled}
                    onChange={(e) => onUpdateSettings({ sfxVolume: parseFloat(e.target.value) })}
                    className="w-full accent-ink-900 cursor-pointer"
                  />
                </div>

                {/* Ambient Volume */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-600 mb-1">
                    <span>Biome Ambient Soundscape</span>
                    <span>{Math.round(settings.ambientVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.ambientVolume}
                    disabled={!settings.soundEnabled}
                    onChange={(e) => onUpdateSettings({ ambientVolume: parseFloat(e.target.value) })}
                    className="w-full accent-ink-900 cursor-pointer"
                  />
                </div>
              </div>

              {/* Visuals & Accessibility */}
              <div className="bg-paper-50 p-3.5 rounded-xl border-2 border-ink-900 space-y-3">
                <h3 className="font-display font-bold text-base text-ink-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent-gold" />
                  Visuals & Accessibility
                </h3>

                {/* High Contrast Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold font-doodle text-ink-900">High Contrast Mode</div>
                    <div className="text-xs text-ink-500">Darker ink lines and high clarity background</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
                    className="w-5 h-5 accent-ink-900 cursor-pointer"
                  />
                </div>

                {/* Large Tap Targets for Mobile */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold font-doodle text-ink-900">Large Tap Hitboxes</div>
                    <div className="text-xs text-ink-500">Expands invisible touch margins for easier taps</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.largeHitboxes}
                    onChange={(e) => onUpdateSettings({ largeHitboxes: e.target.checked })}
                    className="w-5 h-5 accent-ink-900 cursor-pointer"
                  />
                </div>

                {/* Show Target Labels */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold font-doodle text-ink-900">Show Target Names</div>
                    <div className="text-xs text-ink-500">Display item titles below icons in Find List</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showLabels}
                    onChange={(e) => onUpdateSettings({ showLabels: e.target.checked })}
                    className="w-5 h-5 accent-ink-900 cursor-pointer"
                  />
                </div>
              </div>

              {/* Save Data Management */}
              <div className="pt-2">
                {confirmReset ? (
                  <div className="bg-rose-50 border-2 border-rose-400 p-3 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800">Clear all stars & progress?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onResetProgress();
                          setConfirmReset(false);
                        }}
                        className="doodle-btn px-3 py-1 bg-rose-500 text-white font-bold text-xs"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="doodle-btn px-3 py-1 bg-white font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold mx-auto p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset All Save Progress
                  </button>
                )}
              </div>
            </>
          ) : (
            /* How to Play & Controls */
            <div className="space-y-3">
              <div className="bg-paper-50 p-3.5 rounded-xl border-2 border-ink-900">
                <h3 className="font-display font-bold text-base text-ink-900 flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-accent-gold" />
                  Navigation & Controls
                </h3>
                <ul className="text-xs font-doodle space-y-2 text-ink-800">
                  <li>👆 <strong>Pan / Scroll:</strong> Drag with mouse or finger to freely explore the 3x panoramic scene.</li>
                  <li>🔍 <strong>Zoom:</strong> Pinch with 2 fingers, scroll mouse wheel, or use [+] / [-] buttons.</li>
                  <li>🖱️ <strong>Interact:</strong> Tap trees to shake them, open shed doors, lift rocks, and ring bells.</li>
                  <li>⭐ <strong>Targets:</strong> Tap tiny hidden objects to mark them found with a pop of hand-painted watercolor color!</li>
                  <li>⌨️ <strong>Keyboard:</strong> Arrow keys / WASD to pan, +/- to zoom.</li>
                </ul>
              </div>

              <div className="bg-paper-50 p-3.5 rounded-xl border-2 border-ink-900">
                <h3 className="font-display font-bold text-base text-ink-900 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-accent-gold" />
                  Hints & Discoveries
                </h3>
                <p className="text-xs font-doodle text-ink-700 leading-relaxed">
                  Need help? Tap the <strong>Hint</strong> button at the top. The camera will gently ease towards an unfound target and emit a soft pulsing radar beacon. Hints regenerate over time!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
