import React, { useEffect, useState } from 'react';
import { AmbientNPC as IAmbientNPC } from '../../types/game';
import { soundManager } from '../../audio/SoundManager';

interface AmbientNPCProps {
  npc: IAmbientNPC;
  onClick?: () => void;
}

export const AmbientNPC: React.FC<AmbientNPCProps> = ({ npc, onClick }) => {
  const [currentPos, setCurrentPos] = useState({ x: npc.path[0].x, y: npc.path[0].y });
  const [facingRight, setFacingRight] = useState(true);
  const [isWobbling, setIsWobbling] = useState(false);
  const strokeColor = '#141416';

  useEffect(() => {
    if (npc.path.length < 2) return;

    let targetIdx = 1;
    let forward = true;
    let currentX = npc.path[0].x;
    let currentY = npc.path[0].y;
    let animFrame: number;

    const moveStep = () => {
      const target = npc.path[targetIdx];
      const dx = target.x - currentX;
      const dy = target.y - currentY;
      const dist = Math.hypot(dx, dy);

      if (dist < 3) {
        if (forward) {
          if (targetIdx + 1 < npc.path.length) {
            targetIdx++;
          } else {
            forward = false;
            targetIdx--;
            setFacingRight(false);
          }
        } else {
          if (targetIdx - 1 >= 0) {
            targetIdx--;
          } else {
            forward = true;
            targetIdx++;
            setFacingRight(true);
          }
        }
      } else {
        const speed = npc.speed || 1.2;
        currentX += (dx / dist) * speed;
        currentY += (dy / dist) * speed;
        if (dx > 0) setFacingRight(true);
        else if (dx < 0) setFacingRight(false);
        setCurrentPos({ x: currentX, y: currentY });
      }

      animFrame = requestAnimationFrame(moveStep);
    };

    animFrame = requestAnimationFrame(moveStep);
    return () => cancelAnimationFrame(animFrame);
  }, [npc]);

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWobbling(true);
    soundManager.playSound('pop');
    if (onClick) onClick();
    setTimeout(() => setIsWobbling(false), 400);
  };

  const scale = npc.scale || 1;
  const flip = facingRight ? 1 : -1;

  const renderGraphic = () => {
    switch (npc.type) {
      case 'bird':
        return (
          <g>
            {/* Flying bird flapping wings */}
            <path d="M-15 0 Q -7 -12, 0 0 Q 7 -12, 15 0" stroke={strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="0" r="1.5" fill={strokeColor} />
          </g>
        );

      case 'fish':
        return (
          <g>
            {/* Little koi / trout swimming */}
            <path d="M-12 0 Q 0 -6, 12 0 Q 0 6, -12 0 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
            <polygon points="-12,0 -18,-5 -18,5" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
            <circle cx="6" cy="-1.5" r="1.5" fill={strokeColor} />
          </g>
        );

      case 'dog':
        return (
          <g>
            {/* Dog body */}
            <ellipse cx="0" cy="0" rx="14" ry="9" fill="#ffffff" stroke={strokeColor} strokeWidth="2.5" />
            {/* Head */}
            <circle cx="12" cy="-6" r="7" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
            {/* Ear */}
            <path d="M10 -10 C 8 -5, 12 -2, 10 -4" stroke={strokeColor} strokeWidth="2" fill="none" />
            {/* Tail wagging */}
            <path d="M-13 -3 Q -20 -10, -17 -14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Legs */}
            <line x1="-8" y1="8" x2="-8" y2="16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="-3" y1="8" x2="-3" y2="16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="6" y1="8" x2="6" y2="16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'butterfly':
        return (
          <g>
            <circle cx="-5" cy="-5" r="5" fill="#fef08a" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="5" cy="-5" r="5" fill="#fef08a" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="0" y1="-8" x2="0" y2="6" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'villager':
      default:
        return (
          <g>
            {/* Walking Villager */}
            <circle cx="0" cy="-22" r="7" fill="#ffffff" stroke={strokeColor} strokeWidth="2.5" />
            {/* Body */}
            <rect x="-7" y="-15" width="14" height="20" rx="3" fill="#ffffff" stroke={strokeColor} strokeWidth="2.5" />
            {/* Legs walking */}
            <line x1="-4" y1="5" x2="-6" y2="18" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="4" y1="5" x2="6" y2="18" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Hand / Stick or Basket */}
            <line x1="7" y1="-5" x2="12" y2="5" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <g
      id={npc.id}
      transform={`translate(${currentPos.x}, ${currentPos.y}) scale(${scale * flip}, ${scale})`}
      className={`cursor-pointer transition-transform duration-100 ${isWobbling ? 'animate-wiggle' : ''}`}
      onClick={handleTap}
    >
      <rect x="-20" y="-25" width="40" height="45" fill="transparent" />
      {renderGraphic()}
    </g>
  );
};
