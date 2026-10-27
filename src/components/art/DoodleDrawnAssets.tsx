import React from 'react';

// Common SVG Hand-drawn Paper & Ink Filter definition
export const DoodleSvgDefs: React.FC = () => (
  <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
    <defs>
      {/* Hand-drawn squiggly ink displacement filter */}
      <filter id="hand-drawn-filter" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Subtle paper grain texture */}
      <filter id="paper-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>

      {/* Target found gold sparkle glow */}
      <filter id="found-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

// Target Doodle Icons for Find List and in-scene rendering
interface TargetIconProps {
  iconType: string;
  isFound?: boolean;
  accentColor?: string;
  className?: string;
  size?: number;
}

export const TargetIcon: React.FC<TargetIconProps> = ({
  iconType,
  isFound = false,
  accentColor = '#eab308',
  className = '',
  size = 40
}) => {
  const strokeColor = '#141416';
  const fillColor = isFound ? accentColor : '#ffffff';

  switch (iconType) {
    case 'fisherman':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Hat */}
          <path d="M12 28 C 18 20, 42 20, 48 28 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M8 28 L 52 28" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          {/* Face */}
          <circle cx="30" cy="36" r="8" fill={isFound ? '#fde047' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
          {/* Beard */}
          <path d="M26 38 C 28 44, 32 44, 34 38" fill={isFound ? '#e2e8f0' : '#ffffff'} stroke={strokeColor} strokeWidth="2" />
          {/* Fishing rod */}
          <path d="M40 38 L 55 12" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M55 12 C 57 26, 52 35, 50 48" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
          <circle cx="50" cy="49" r="2" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 'red_balloon':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          <ellipse cx="30" cy="24" rx="14" ry="18" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Reflection */}
          <path d="M24 16 C 22 20, 22 25, 23 28" stroke={isFound ? '#ffffff' : strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Knot */}
          <polygon points="28,42 32,42 30,45" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          {/* String */}
          <path d="M30 45 C 26 50, 34 54, 30 58" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'sleeping_cat':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Body curled */}
          <ellipse cx="30" cy="35" rx="18" ry="13" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Head */}
          <circle cx="20" cy="30" r="9" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Ears */}
          <polygon points="14,24 18,17 21,23" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          <polygon points="21,23 24,18 27,24" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          {/* Closed Eyes */}
          <path d="M16 31 C 18 33, 19 33, 21 31" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Sleeping Zzz */}
          <path d="M38 18 L 44 18 L 38 24 L 44 24" stroke={strokeColor} strokeWidth="2" fill="none" />
          {/* Tail */}
          <path d="M47 37 C 49 43, 44 48, 38 47" stroke={strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'golden_key':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Key head */}
          <circle cx="22" cy="24" r="10" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="22" cy="24" r="4" fill="#ffffff" stroke={strokeColor} strokeWidth="2" />
          {/* Shaft */}
          <line x1="31" y1="28" x2="48" y2="44" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          {/* Teeth */}
          <line x1="42" y1="38" x2="46" y2="34" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="42" x2="50" y2="38" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'lost_hiker':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Backpack */}
          <rect x="15" y="22" width="10" height="18" rx="3" fill={isFound ? '#f97316' : '#ffffff'} stroke={strokeColor} strokeWidth="2" />
          {/* Body */}
          <rect x="23" y="24" width="14" height="20" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Head & Hat */}
          <circle cx="30" cy="18" r="7" fill={isFound ? '#fed7aa' : '#ffffff'} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M22 15 C 28 10, 32 10, 38 15" stroke={strokeColor} strokeWidth="2" fill="none" />
          {/* Walking Stick */}
          <line x1="42" y1="18" x2="40" y2="52" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'golden_apple':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Apple shape */}
          <path d="M30 20 C 22 14, 12 24, 16 38 C 20 48, 28 50, 30 45 C 32 50, 40 48, 44 38 C 48 24, 38 14, 30 20 Z" 
                fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Stem & Leaf */}
          <path d="M30 20 C 30 14, 33 10, 35 8" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M33 12 C 38 10, 42 12, 40 16 C 36 16, 33 14, 33 12 Z" fill={isFound ? '#22c55e' : '#ffffff'} stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case 'vintage_pocketwatch':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Ring on top */}
          <circle cx="30" cy="10" r="5" fill="none" stroke={strokeColor} strokeWidth="2" />
          {/* Outer case */}
          <circle cx="30" cy="34" r="19" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Dial */}
          <circle cx="30" cy="34" r="14" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
          {/* Clock Hands */}
          <line x1="30" y1="34" x2="30" y2="25" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="34" x2="38" y2="34" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'wooden_duck':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          {/* Body */}
          <path d="M15 36 C 15 28, 28 26, 38 32 C 45 32, 48 37, 45 42 C 40 47, 20 48, 15 36 Z" 
                fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Head */}
          <circle cx="38" cy="24" r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
          {/* Beak */}
          <polygon points="45,23 53,26 45,28" fill={isFound ? '#f97316' : '#ffffff'} stroke={strokeColor} strokeWidth="2" />
          {/* Eye */}
          <circle cx="40" cy="22" r="1.5" fill={strokeColor} />
          {/* Water ripple underneath */}
          <path d="M12 46 C 24 43, 36 49, 48 46" stroke={strokeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'secret_letter':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          <rect x="12" y="18" width="36" height="26" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Envelope fold */}
          <path d="M12 18 L 30 33 L 48 18" stroke={strokeColor} strokeWidth="2" fill="none" />
          {/* Red seal wax */}
          <circle cx="30" cy="33" r="5" fill={isFound ? '#dc2626' : '#141416'} stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 'silver_compass':
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          <circle cx="30" cy="30" r="19" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="30" cy="30" r="15" fill="#ffffff" stroke={strokeColor} strokeWidth="1.5" />
          {/* Compass needle */}
          <polygon points="30,19 33,30 27,30" fill={isFound ? '#ef4444' : strokeColor} stroke={strokeColor} strokeWidth="1" />
          <polygon points="30,41 33,30 27,30" fill={isFound ? '#3b82f6' : '#ffffff'} stroke={strokeColor} strokeWidth="1" />
          <circle cx="30" cy="30" r="2.5" fill={strokeColor} />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 60 60" className={className}>
          <circle cx="30" cy="30" r="18" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <text x="30" y="38" textAnchor="middle" fontSize="22" fontWeight="bold" fill={strokeColor} fontFamily="sans-serif">?</text>
        </svg>
      );
  }
};
