import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { LevelData, TargetItem as ITargetItem, InteractiveObject as IInteractiveObject, ViewportTransform } from '../../types/game';
import { useGesturePanZoom } from '../../hooks/useGesturePanZoom';
import { DoodleSvgDefs } from '../art/DoodleDrawnAssets';
import { SceneArtLayers } from './SceneArtLayers';
import { InteractiveObject } from './InteractiveObject';
import { TargetItem } from './TargetItem';
import { AmbientNPC } from './AmbientNPC';
import { HintIndicator } from '../hud/HintIndicator';

export interface SceneViewerHandle {
  centerOn: (x: number, y: number, zoom?: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  transform: ViewportTransform;
  containerDimensions: { width: number; height: number };
}

interface SceneViewerProps {
  level: LevelData;
  foundTargetIds: string[];
  interactedObjectIds: string[];
  activeHintTarget: ITargetItem | null;
  onFindTarget: (target: ITargetItem) => void;
  onInteractObject: (obj: IInteractiveObject) => void;
  largeHitboxes?: boolean;
}

export const SceneViewer = forwardRef<SceneViewerHandle, SceneViewerProps>(({
  level,
  foundTargetIds,
  interactedObjectIds,
  activeHintTarget,
  onFindTarget,
  onInteractObject,
  largeHitboxes = false,
}, ref) => {
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 800 });

  const {
    containerRef,
    transform,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    centerOn,
    zoomIn,
    zoomOut,
    resetView,
    hasDragged,
  } = useGesturePanZoom({
    sceneWidth: level.sceneWidth,
    sceneHeight: level.sceneHeight,
    minScale: 0.45,
    maxScale: 2.5,
    initialScale: 0.85,
  });

  // Track container dimensions for Minimap calculation
  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    centerOn,
    zoomIn,
    zoomOut,
    resetView,
    transform,
    containerDimensions,
  }), [centerOn, zoomIn, zoomOut, resetView, transform, containerDimensions]);

  const handleTargetClick = (target: ITargetItem) => {
    if (hasDragged()) return; // Prevent target tap when user was panning
    onFindTarget(target);
  };

  const handleObjectClick = (obj: IInteractiveObject) => {
    if (hasDragged()) return; // Prevent interaction when user was panning
    onInteractObject(obj);
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label={`Interactive canvas for ${level.title}`}
      className="w-full h-full relative overflow-hidden bg-paper-100 cursor-grab active:cursor-grabbing select-none"
      style={{
        touchAction: 'none',
        overscrollBehavior: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <DoodleSvgDefs />

      {/* Pannable & Zoomable Scene World */}
      <div
        className="absolute top-0 left-0 origin-top-left transition-transform duration-75 ease-out pointer-events-auto"
        style={{
          width: `${level.sceneWidth}px`,
          height: `${level.sceneHeight}px`,
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          willChange: 'transform',
        }}
      >
        <svg
          viewBox={`0 0 ${level.sceneWidth} ${level.sceneHeight}`}
          width={level.sceneWidth}
          height={level.sceneHeight}
          className="w-full h-full doodle-paper-bg"
          style={{ filter: 'url(#hand-drawn-filter)' }}
        >
          {/* Base Hand-Drawn Vector Scenery */}
          <SceneArtLayers
            biome={level.biome}
            width={level.sceneWidth}
            height={level.sceneHeight}
          />

          {/* Interactive Scenery Objects (Bushes, Doors, Tents, Trees, Rocks, Bells) */}
          <g id="interactive-objects-layer">
            {level.interactiveObjects.map((obj) => (
              <InteractiveObject
                key={obj.id}
                object={obj}
                isInteracted={interactedObjectIds.includes(obj.id)}
                onInteract={handleObjectClick}
                largeHitboxes={largeHitboxes}
              />
            ))}
          </g>

          {/* Target Items to Find */}
          <g id="targets-layer">
            {level.targets.map((target) => {
              // Target is revealed if:
              // 1. It is not hidden behind an object, OR
              // 2. The object it's hidden behind has already been interacted with
              const isRevealed = !target.hiddenBehindId || interactedObjectIds.includes(target.hiddenBehindId);
              const isFound = foundTargetIds.includes(target.id);

              return (
                <TargetItem
                  key={target.id}
                  target={target}
                  isFound={isFound}
                  isRevealed={isRevealed}
                  onFind={handleTargetClick}
                  largeHitboxes={largeHitboxes}
                />
              );
            })}
          </g>

          {/* Ambient Moving NPCs & Characters */}
          <g id="ambient-npcs-layer">
            {level.ambientNPCs.map((npc) => (
              <AmbientNPC key={npc.id} npc={npc} />
            ))}
          </g>

          {/* Hint Radar Beacon */}
          {activeHintTarget && (
            <HintIndicator x={activeHintTarget.x} y={activeHintTarget.y} />
          )}
        </svg>
      </div>
    </div>
  );
});

SceneViewer.displayName = 'SceneViewer';
