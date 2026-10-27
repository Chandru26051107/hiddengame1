import React, { useState } from 'react';
import { InteractiveObject as IInteractiveObject } from '../../types/game';
import { soundManager } from '../../audio/SoundManager';

interface InteractiveObjectProps {
  object: IInteractiveObject;
  isInteracted: boolean;
  onInteract: (obj: IInteractiveObject) => void;
  largeHitboxes?: boolean;
}

export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  object,
  isInteracted,
  onInteract,
  largeHitboxes = false,
}) => {
  const [animating, setAnimating] = useState(false);
  const strokeColor = '#141416';

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setAnimating(true);
    soundManager.playSound(object.interactionSound || 'pop');
    onInteract(object);

    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

  const getAnimationClass = () => {
    if (!animating) return '';
    switch (object.tapAnimation) {
      case 'rustle':
        return 'animate-wiggle';
      case 'bounce':
        return 'animate-bob';
      case 'spin':
        return 'animate-spin';
      default:
        return 'animate-wiggle';
    }
  };

  const renderDoodleGraphic = () => {
    switch (object.type) {
      case 'bush':
        return (
          <g>
            <path
              d="M10 40 Q 5 20, 25 15 Q 40 5, 55 18 Q 70 8, 85 20 Q 95 35, 80 50 Q 50 55, 10 50 Z"
              fill={isInteracted ? '#dcfce7' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            {/* Berries or leaves */}
            <circle cx="30" cy="28" r="3" fill="#ef4444" stroke={strokeColor} strokeWidth="1" />
            <circle cx="65" cy="32" r="3" fill="#ef4444" stroke={strokeColor} strokeWidth="1" />
            <circle cx="48" cy="20" r="3" fill="#ef4444" stroke={strokeColor} strokeWidth="1" />
          </g>
        );

      case 'tree':
        return (
          <g>
            {/* Trunk */}
            <path d="M45 140 L 48 70 L 62 70 L 65 140 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="3" />
            {/* Foliage */}
            <path
              d="M20 80 Q 10 50, 30 35 Q 55 15, 80 35 Q 100 50, 90 80 Q 75 95, 20 80 Z"
              fill={isInteracted ? '#dcfce7' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="3"
            />
            {/* Apples */}
            <circle cx="40" cy="50" r="4.5" fill="#f87171" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="70" cy="55" r="4.5" fill="#f87171" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="55" cy="38" r="4.5" fill="#f87171" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );

      case 'door':
        return (
          <g>
            {/* Door Frame */}
            <rect x="5" y="5" width="50" height="70" fill="#f8fafc" stroke={strokeColor} strokeWidth="2.5" />
            {/* Door panel - opens slightly when interacted */}
            <path
              d={isInteracted ? 'M 5 5 L 42 12 L 42 72 L 5 75 Z' : 'M 5 5 L 55 5 L 55 75 L 5 75 Z'}
              fill={isInteracted ? '#fde047' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            {/* Doorknob */}
            <circle cx={isInteracted ? '36' : '47'} cy="42" r="3" fill="#141416" />
          </g>
        );

      case 'tent':
        return (
          <g>
            {/* Tent body */}
            <polygon points="10,65 45,15 80,65" fill="#ffffff" stroke={strokeColor} strokeWidth="2.5" />
            {/* Open flap */}
            <polygon
              points={isInteracted ? '45,15 30,65 60,65' : '45,15 45,65 45,65'}
              fill={isInteracted ? '#fed7aa' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2"
            />
            {/* Guy-lines */}
            <line x1="10" y1="65" x2="0" y2="72" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="80" y1="65" x2="90" y2="72" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );

      case 'rock':
        return (
          <g transform={isInteracted ? 'translate(0, -10)' : ''}>
            <path
              d="M10 35 C 10 15, 30 10, 50 12 C 70 15, 80 25, 75 38 C 70 45, 20 45, 10 35 Z"
              fill={isInteracted ? '#e2e8f0' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            <line x1="25" y1="22" x2="35" y2="28" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="50" y1="20" x2="60" y2="26" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );

      case 'manhole':
        return (
          <g transform={isInteracted ? 'translate(12, -8) rotate(15)' : ''}>
            <ellipse cx="35" cy="25" rx="30" ry="16" fill={isInteracted ? '#cbd5e1' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
            <ellipse cx="35" cy="25" rx="22" ry="11" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="35" cy="25" r="3" fill="#141416" />
          </g>
        );

      case 'curtain':
      case 'window':
        return (
          <g>
            <rect x="5" y="5" width="50" height="50" fill="#ffffff" stroke={strokeColor} strokeWidth="2.5" />
            <line x1="30" y1="5" x2="30" y2="55" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="5" y1="30" x2="55" y2="30" stroke={strokeColor} strokeWidth="1.5" />
            {/* Shutter / Curtain open */}
            <rect
              x={isInteracted ? '-12' : '2'}
              y="5"
              width="22"
              height="50"
              fill={isInteracted ? '#fef08a' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2"
            />
          </g>
        );

      case 'chest':
        return (
          <g>
            {/* Chest base */}
            <rect x="10" y="25" width="55" height="35" rx="3" fill={isInteracted ? '#fef08a' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
            {/* Chest lid */}
            <path
              d={isInteracted ? 'M 8 10 Q 37 -10, 67 10 L 65 25 L 10 25 Z' : 'M 8 25 Q 37 10, 67 25 Z'}
              fill="#ffffff"
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            {/* Lock clasp */}
            <circle cx="37" cy="35" r="3" fill="#141416" />
          </g>
        );

      case 'haystack':
        return (
          <g>
            <path
              d="M10 60 Q 20 15, 45 10 Q 70 15, 80 60 Z"
              fill={isInteracted ? '#fef08a' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            <path d="M25 35 L 35 45 M 50 30 L 60 42 M 35 50 L 50 55" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );

      case 'bell':
        return (
          <g className={animating ? 'animate-wiggle origin-top' : ''}>
            <path d="M25 15 C 25 5, 55 5, 55 15 L 60 40 L 20 40 Z" fill={isInteracted ? '#fde047' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="40" cy="45" r="4" fill="#141416" />
          </g>
        );

      case 'barrel':
        return (
          <g>
            <ellipse cx="28" cy="12" rx="22" ry="7" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
            <path d="M6 12 C 2 30, 2 50, 6 68 L 50 68 C 54 50, 54 30, 50 12" fill={isInteracted ? '#fed7aa' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
            <ellipse cx="28" cy="68" rx="22" ry="7" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
            <line x1="5" y1="30" x2="51" y2="30" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="5" y1="50" x2="51" y2="50" stroke={strokeColor} strokeWidth="1.5" />
          </g>
        );

      default:
        return (
          <rect
            x="5"
            y="5"
            width={object.width - 10}
            height={object.height - 10}
            rx="5"
            fill={isInteracted ? '#fef08a' : '#ffffff'}
            stroke={strokeColor}
            strokeWidth="2.5"
          />
        );
    }
  };

  return (
    <g
      id={object.id}
      transform={`translate(${object.x}, ${object.y})`}
      className={`cursor-pointer transition-transform duration-150 ${getAnimationClass()}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Interactive ${object.name}`}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Invisible expanded tap target padding for accessibility on touch devices */}
      <rect
        x={largeHitboxes ? -15 : -5}
        y={largeHitboxes ? -15 : -5}
        width={object.width + (largeHitboxes ? 30 : 10)}
        height={object.height + (largeHitboxes ? 30 : 10)}
        fill="transparent"
      />
      {renderDoodleGraphic()}
    </g>
  );
};
