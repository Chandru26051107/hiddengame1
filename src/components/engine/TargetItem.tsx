import React, { useEffect, useState } from 'react';
import { TargetItem as ITargetItem } from '../../types/game';
import { TargetIcon } from '../art/DoodleDrawnAssets';

interface TargetItemProps {
  target: ITargetItem;
  isFound: boolean;
  isRevealed: boolean;
  onFind: (target: ITargetItem) => void;
  largeHitboxes?: boolean;
}

export const TargetItem: React.FC<TargetItemProps> = ({
  target,
  isFound,
  isRevealed,
  onFind,
  largeHitboxes = false,
}) => {
  const [pos, setPos] = useState({ x: target.x, y: target.y });
  const [animatingFound, setAnimatingFound] = useState(false);

  // Moving target waypoint movement loop
  useEffect(() => {
    if (!target.isMoving || !target.path || target.path.length < 2) return;

    let targetIdx = 1;
    let forward = true;
    let currentX = target.path[0].x;
    let currentY = target.path[0].y;
    let animFrame: number;

    const moveStep = () => {
      const targetPoint = target.path![targetIdx];
      const dx = targetPoint.x - currentX;
      const dy = targetPoint.y - currentY;
      const dist = Math.hypot(dx, dy);

      if (dist < 4) {
        if (forward) {
          if (targetIdx + 1 < target.path!.length) {
            targetIdx++;
          } else {
            forward = false;
            targetIdx--;
          }
        } else {
          if (targetIdx - 1 >= 0) {
            targetIdx--;
          } else {
            forward = true;
            targetIdx++;
          }
        }
      } else {
        const speed = target.moveSpeed || 1.1;
        currentX += (dx / dist) * speed;
        currentY += (dy / dist) * speed;
        setPos({ x: currentX, y: currentY });
      }

      animFrame = requestAnimationFrame(moveStep);
    };

    animFrame = requestAnimationFrame(moveStep);
    return () => cancelAnimationFrame(animFrame);
  }, [target]);

  if (!isRevealed) {
    return null; // Hidden behind an interactive object (e.g. inside shed or under rock)
  }

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isFound) return;
    setAnimatingFound(true);
    onFind(target);
    setTimeout(() => setAnimatingFound(false), 800);
  };

  const hitPad = largeHitboxes ? 20 : 8;

  return (
    <g
      id={`target-${target.id}`}
      transform={`translate(${pos.x}, ${pos.y})`}
      className={`cursor-pointer transition-transform duration-200 ${
        animatingFound ? 'animate-found-pop' : isFound ? 'scale-105' : 'hover:scale-110'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Target: ${target.name}`}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Expanded invisible hit area for finger taps */}
      <rect
        x={-hitPad}
        y={-hitPad}
        width={target.width + hitPad * 2}
        height={target.height + hitPad * 2}
        fill="transparent"
      />

      {/* Target Graphic */}
      <g filter={isFound ? 'url(#found-glow)' : undefined}>
        <TargetIcon
          iconType={target.iconType}
          isFound={isFound}
          accentColor={target.accentColor}
          size={target.width}
        />
      </g>

      {/* Found Sparkles */}
      {isFound && (
        <g className="animate-wiggle" transform="translate(10, -10)">
          <path d="M0 0 L 2 5 L 7 7 L 2 9 L 0 14 L -2 9 L -7 7 L -2 5 Z" fill="#eab308" stroke="#141416" strokeWidth="1" />
        </g>
      )}
    </g>
  );
};
