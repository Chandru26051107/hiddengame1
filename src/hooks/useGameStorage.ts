import { useState, useEffect } from 'react';
import { GameSettings, LevelProgress } from '../types/game';

const SETTINGS_KEY = 'hidden_trails_settings';
const PROGRESS_KEY = 'hidden_trails_progress';

const defaultSettings: GameSettings = {
  soundEnabled: true,
  sfxVolume: 0.7,
  ambientVolume: 0.3,
  highContrast: false,
  largeHitboxes: false,
  showLabels: true,
};

export const useGameStorage = () => {
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [progressMap, setProgressMap] = useState<Record<string, LevelProgress>>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressMap));
    } catch {}
  }, [progressMap]);

  const updateSettings = (partial: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const getLevelProgress = (levelId: string): LevelProgress => {
    return (
      progressMap[levelId] || {
        foundTargetIds: [],
        interactedObjectIds: [],
        completed: false,
        stars: 0,
        timeSpentSeconds: 0,
        clicksCount: 0,
        hintsUsedCount: 0,
      }
    );
  };

  const updateLevelProgress = (levelId: string, updater: (prev: LevelProgress) => LevelProgress) => {
    setProgressMap((prev) => {
      const current = prev[levelId] || {
        foundTargetIds: [],
        interactedObjectIds: [],
        completed: false,
        stars: 0,
        timeSpentSeconds: 0,
        clicksCount: 0,
        hintsUsedCount: 0,
      };
      const updated = updater(current);
      return { ...prev, [levelId]: updated };
    });
  };

  const resetAllProgress = () => {
    setProgressMap({});
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch {}
  };

  return {
    settings,
    updateSettings,
    getLevelProgress,
    updateLevelProgress,
    resetAllProgress,
  };
};
