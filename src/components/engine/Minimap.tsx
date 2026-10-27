import React from 'react';
import { LevelData, ViewportTransform } from '../../types/game';

interface MinimapProps {
  level: LevelData;
  transform: ViewportTransform;
  containerWidth: number;
  containerHeight: number;
  onNavigateTo: (sceneX: number, sceneY: number) => void;
}

export const Minimap: React.FC<MinimapProps> = ({
  level,
  transform,
  containerWidth,
  containerHeight,
  onNavigateTo,
}) => {
  const mapWidth = 140;
  const mapHeight = (mapWidth * level.sceneHeight) / level.sceneWidth;

  const scaleRatio = mapWidth / level.sceneWidth;

  // Calculate viewport rectangle in minimap coordinates
  const viewX = Math.max(0, -transform.x / transform.scale) * scaleRatio;
  const viewY = Math.max(0, -transform.y / transform.scale) * scaleRatio;
  const viewW = Math.min(mapWidth, (containerWidth / transform.scale) * scaleRatio);
  const viewH = Math.min(mapHeight, (containerHeight / transform.scale) * scaleRatio);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetSceneX = clickX / scaleRatio;
    const targetSceneY = clickY / scaleRatio;

    onNavigateTo(targetSceneX, targetSceneY);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-1.5 doodle-box select-none cursor-crosshair shadow-doodle">
      <div className="flex items-center justify-between text-xs font-bold font-doodle px-1 pb-1 text-ink-700">
        <span>Map Radar</span>
      </div>
      <svg
        width={mapWidth}
        height={mapHeight}
        className="rounded border border-ink-900 bg-paper-100 overflow-hidden"
        onClick={handleClick}
      >
        {/* Simple landmark doodles on minimap */}
        {level.biome === 'village' && (
          <>
            {/* River */}
            <path d="M 0 75 Q 35 65, 70 75 T 140 75" stroke="#bae6fd" strokeWidth="6" fill="none" />
            {/* Pond */}
            <ellipse cx="20" cy="80" rx="14" ry="9" fill="#93c5fd" />
            {/* Barn */}
            <rect x="110" y="40" width="16" height="12" fill="#e2e8f0" stroke="#141416" strokeWidth="0.8" />
          </>
        )}
        {level.biome === 'forest' && (
          <>
            <path d="M 0 75 Q 70 85, 140 70" stroke="#bae6fd" strokeWidth="6" fill="none" />
            <circle cx="20" cy="50" r="10" fill="#141416" />
          </>
        )}
        {level.biome === 'mountain' && (
          <>
            <polygon points="20,40 45,10 70,40" fill="#f1f5f9" stroke="#141416" strokeWidth="0.8" />
            <ellipse cx="70" cy="70" rx="25" ry="12" fill="#bae6fd" />
          </>
        )}
        {level.biome === 'desert' && (
          <>
            <polygon points="20,40 38,15 56,40" fill="#fef08a" stroke="#141416" strokeWidth="0.8" />
            <ellipse cx="65" cy="75" rx="20" ry="10" fill="#7dd3fc" />
          </>
        )}
        {level.biome === 'harbor' && (
          <>
            <rect x="0" y="40" width="140" height="60" fill="#bae6fd" />
            <rect x="25" y="40" width="20" height="45" fill="#fef08a" />
          </>
        )}

        {/* Current Camera Viewport outline box */}
        <rect
          x={viewX}
          y={viewY}
          width={viewW}
          height={viewH}
          fill="rgba(234, 179, 8, 0.2)"
          stroke="#eab308"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
      </svg>
    </div>
  );
};
