import React, { useState, useEffect, useRef } from 'react';
import { TargetItem, InteractiveObject } from './types/game';
import { allLevels, getLevelById } from './data';
import { soundManager } from './audio/SoundManager';
import { useGameStorage } from './hooks/useGameStorage';
import { SceneViewer, SceneViewerHandle } from './components/engine/SceneViewer';
import { TopHeader } from './components/hud/TopHeader';
import { FindListBar } from './components/hud/FindListBar';
import { Minimap } from './components/engine/Minimap';
import { ClueModal } from './components/modals/ClueModal';
import { LevelSelectModal } from './components/modals/LevelSelectModal';
import { LevelCompleteModal } from './components/modals/LevelCompleteModal';
import { SettingsModal } from './components/modals/SettingsModal';

export const App: React.FC = () => {
  const [currentLevelId, setCurrentLevelId] = useState<string>('village');
  const level = getLevelById(currentLevelId);

  const {
    settings,
    updateSettings,
    getLevelProgress,
    updateLevelProgress,
    resetAllProgress,
  } = useGameStorage();

  const currentProgress = getLevelProgress(currentLevelId);

  // References and local UI states
  const sceneViewerRef = useRef<SceneViewerHandle | null>(null);
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [hintCooldown, setHintCooldown] = useState<number>(0);
  const [activeHintTarget, setActiveHintTarget] = useState<TargetItem | null>(null);
  const [selectedClueTarget, setSelectedClueTarget] = useState<TargetItem | null>(null);
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isLevelCompleteOpen, setIsLevelCompleteOpen] = useState<boolean>(false);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);

  // Synchronize audio with settings and biome
  useEffect(() => {
    soundManager.setMuted(!settings.soundEnabled);
    soundManager.setVolumes(settings.sfxVolume, settings.ambientVolume);
    soundManager.setBiomeAmbience(level.biome);
  }, [level.biome, settings.soundEnabled, settings.sfxVolume, settings.ambientVolume]);

  // Hint cooldown timer
  useEffect(() => {
    if (hintCooldown <= 0) return;
    const interval = window.setInterval(() => {
      setHintCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [hintCooldown]);

  // Level play timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!isLevelCompleteOpen && !isSettingsOpen && !isLevelSelectOpen) {
        updateLevelProgress(currentLevelId, (prev) => ({
          ...prev,
          timeSpentSeconds: prev.timeSpentSeconds + 1,
        }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLevelId, isLevelCompleteOpen, isSettingsOpen, isLevelSelectOpen, updateLevelProgress]);

  // Handle finding a target
  const handleFindTarget = (target: TargetItem) => {
    if (currentProgress.foundTargetIds.includes(target.id)) return;

    soundManager.playFoundSound();

    const newFound = [...currentProgress.foundTargetIds, target.id];
    const isCompleted = newFound.length >= level.targets.length;

    updateLevelProgress(currentLevelId, (prev) => ({
      ...prev,
      foundTargetIds: newFound,
      clicksCount: prev.clicksCount + 1,
      completed: isCompleted,
      stars: isCompleted ? 3 : Math.min(2, Math.floor((newFound.length / level.targets.length) * 3)),
    }));

    if (activeHintTarget?.id === target.id) {
      setActiveHintTarget(null);
    }

    if (isCompleted) {
      setTimeout(() => {
        setIsLevelCompleteOpen(true);
      }, 700);
    }
  };

  // Handle interacting with scenery
  const handleInteractObject = (obj: InteractiveObject) => {
    updateLevelProgress(currentLevelId, (prev) => {
      const alreadyInteracted = prev.interactedObjectIds.includes(obj.id);
      return {
        ...prev,
        interactedObjectIds: alreadyInteracted ? prev.interactedObjectIds : [...prev.interactedObjectIds, obj.id],
        clicksCount: prev.clicksCount + 1,
      };
    });
  };

  // Handle Hint button click
  const handleUseHint = () => {
    if (hintsRemaining <= 0 || hintCooldown > 0) return;

    // Find the next unfound target
    const unfound = level.targets.find(
      (t) => !currentProgress.foundTargetIds.includes(t.id)
    );

    if (unfound) {
      setHintsRemaining((prev) => prev - 1);
      setHintCooldown(20); // 20 second reload
      setActiveHintTarget(unfound);
      soundManager.playSound('hint');

      // Center camera smoothly onto the unfound target
      sceneViewerRef.current?.centerOn(unfound.x, unfound.y, 1.3);

      updateLevelProgress(currentLevelId, (prev) => ({
        ...prev,
        hintsUsedCount: prev.hintsUsedCount + 1,
      }));

      // Clear pulsing ripple after 8 seconds
      setTimeout(() => {
        setActiveHintTarget((current) => (current?.id === unfound.id ? null : current));
      }, 8000);
    }
  };

  // Switch to next level
  const currentIdx = allLevels.findIndex((l) => l.id === currentLevelId);
  const hasNextLevel = currentIdx < allLevels.length - 1;

  const handleNextLevel = () => {
    if (hasNextLevel) {
      const nextLevel = allLevels[currentIdx + 1];
      setCurrentLevelId(nextLevel.id);
      setIsLevelCompleteOpen(false);
      setHintsRemaining(3);
      setHintCooldown(0);
      setActiveHintTarget(null);
      setTimeout(() => {
        sceneViewerRef.current?.resetView();
      }, 100);
    }
  };

  const handleReplayLevel = () => {
    updateLevelProgress(currentLevelId, () => ({
      foundTargetIds: [],
      interactedObjectIds: [],
      completed: false,
      stars: 0,
      timeSpentSeconds: 0,
      clicksCount: 0,
      hintsUsedCount: 0,
    }));
    setIsLevelCompleteOpen(false);
    setHintsRemaining(3);
    setHintCooldown(0);
    setActiveHintTarget(null);
    sceneViewerRef.current?.resetView();
  };

  const handleSelectLevel = (levelId: string) => {
    setCurrentLevelId(levelId);
    setHintsRemaining(3);
    setHintCooldown(0);
    setActiveHintTarget(null);
    setTimeout(() => {
      sceneViewerRef.current?.resetView();
    }, 100);
  };

  return (
    <div className={`w-full h-full relative overflow-hidden select-none bg-paper-100 ${settings.highContrast ? 'high-contrast' : ''}`}>
      {/* Top HUD Header */}
      <TopHeader
        level={level}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
        hintsRemaining={hintsRemaining}
        hintCooldown={hintCooldown}
        onUseHint={handleUseHint}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
        showMinimap={showMinimap}
        onToggleMinimap={() => setShowMinimap(!showMinimap)}
        onZoomIn={() => sceneViewerRef.current?.zoomIn()}
        onZoomOut={() => sceneViewerRef.current?.zoomOut()}
        onResetView={() => sceneViewerRef.current?.resetView()}
      />

      {/* Main Interactive Scene Canvas */}
      <main className="w-full h-full">
        <SceneViewer
          ref={sceneViewerRef}
          level={level}
          foundTargetIds={currentProgress.foundTargetIds}
          interactedObjectIds={currentProgress.interactedObjectIds}
          activeHintTarget={activeHintTarget}
          onFindTarget={handleFindTarget}
          onInteractObject={handleInteractObject}
          largeHitboxes={settings.largeHitboxes}
        />
      </main>

      {/* Minimap Navigation Overlay */}
      {showMinimap && sceneViewerRef.current && (
        <aside className="fixed bottom-24 right-3 z-30 hidden sm:block pointer-events-auto">
          <Minimap
            level={level}
            transform={sceneViewerRef.current.transform}
            containerWidth={sceneViewerRef.current.containerDimensions.width}
            containerHeight={sceneViewerRef.current.containerDimensions.height}
            onNavigateTo={(x, y) => sceneViewerRef.current?.centerOn(x, y)}
          />
        </aside>
      )}

      {/* Bottom Find List Bar */}
      <FindListBar
        targets={level.targets}
        foundTargetIds={currentProgress.foundTargetIds}
        onSelectTarget={(target) => setSelectedClueTarget(target)}
        showLabels={settings.showLabels}
      />

      {/* Modals & Dialogs */}
      {selectedClueTarget && (
        <ClueModal
          target={selectedClueTarget}
          isFound={currentProgress.foundTargetIds.includes(selectedClueTarget.id)}
          onClose={() => setSelectedClueTarget(null)}
          onFocusTarget={(t) => sceneViewerRef.current?.centerOn(t.x, t.y, 1.3)}
        />
      )}

      {isLevelSelectOpen && (
        <LevelSelectModal
          levels={allLevels}
          currentLevelId={currentLevelId}
          progressMap={{ [currentLevelId]: currentProgress }}
          onSelectLevel={handleSelectLevel}
          onClose={() => setIsLevelSelectOpen(false)}
        />
      )}

      {isLevelCompleteOpen && (
        <LevelCompleteModal
          level={level}
          progress={currentProgress}
          onNextLevel={handleNextLevel}
          onReplayLevel={handleReplayLevel}
          onOpenLevelSelect={() => {
            setIsLevelCompleteOpen(false);
            setIsLevelSelectOpen(true);
          }}
          hasNextLevel={hasNextLevel}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onResetProgress={resetAllProgress}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
