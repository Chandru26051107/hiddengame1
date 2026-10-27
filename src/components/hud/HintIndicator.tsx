import React from 'react';

interface HintIndicatorProps {
  x: number;
  y: number;
}

export const HintIndicator: React.FC<HintIndicatorProps> = ({ x, y }) => {
  return (
    <g transform={`translate(${x}, ${y})`} pointerEvents="none" className="hint-pulsing-group">
      {/* 3 expanding ripple rings */}
      <circle cx="20" cy="20" r="30" fill="none" stroke="#eab308" strokeWidth="3" opacity="0.8">
        <animate attributeName="r" values="15;60" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="20" r="20" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8">
        <animate attributeName="r" values="10;45" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
      </circle>

      {/* Doodle hand pointer or star beacon */}
      <g transform="translate(20, -25)" className="animate-bob">
        <polygon points="0,0 -8,-14 8,-14" fill="#eab308" stroke="#141416" strokeWidth="2" />
        <circle cx="0" cy="-20" r="5" fill="#fde047" stroke="#141416" strokeWidth="1.5" />
      </g>
    </g>
  );
};
