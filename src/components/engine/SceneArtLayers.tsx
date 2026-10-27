import React from 'react';
import { BiomeType } from '../../types/game';

interface SceneArtLayersProps {
  biome: BiomeType;
  width: number;
  height: number;
}

export const SceneArtLayers: React.FC<SceneArtLayersProps> = ({ biome, width, height }) => {
  const strokeColor = '#141416';

  if (biome === 'forest') {
    return (
      <g className="forest-scenery" stroke={strokeColor} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Deep Forest Backdrops */}
        <path d="M0 600 Q 400 450, 900 580 T 1800 520 T 2400 620 L 2400 1600 L 0 1600 Z" fill="#f8fafc" />
        {/* Giant Ancient Trees */}
        {[150, 420, 780, 1150, 1500, 1850, 2200].map((tx, idx) => (
          <g key={idx} transform={`translate(${tx}, ${180 + (idx % 3) * 60})`}>
            {/* Trunk */}
            <path d="M40 300 Q 50 150, 60 0 Q 70 150, 80 300 Z" fill="#ffffff" strokeWidth="3" />
            {/* Canopy */}
            <circle cx="60" cy="-30" r="110" fill="#ffffff" strokeWidth="3" />
            <circle cx="20" cy="-60" r="80" fill="#ffffff" strokeWidth="2.5" />
            <circle cx="100" cy="-50" r="85" fill="#ffffff" strokeWidth="2.5" />
            {/* Tree bark hatch */}
            <line x1="55" y1="120" x2="57" y2="180" strokeWidth="1.5" />
            <line x1="68" y1="140" x2="66" y2="210" strokeWidth="1.5" />
          </g>
        ))}
        {/* River */}
        <path d="M0 1100 C 600 950, 1200 1300, 2400 1080 L 2400 1280 C 1200 1480, 600 1120, 0 1280 Z" fill="#f1f5f9" strokeWidth="3" />
        {/* Rope Bridge */}
        <path d="M1000 1150 Q 1200 1220, 1400 1160" strokeWidth="3.5" />
        <path d="M1000 1180 Q 1200 1250, 1400 1190" strokeWidth="3.5" />
        {[1040, 1100, 1160, 1220, 1280, 1340].map((bx) => (
          <line key={bx} x1={bx} y1="1165" x2={bx} y2="1235" strokeWidth="2" />
        ))}
        {/* Cave Entrance */}
        <path d="M200 800 C 180 700, 360 700, 340 800 Z" fill="#141416" />
      </g>
    );
  }

  if (biome === 'mountain') {
    return (
      <g className="mountain-scenery" stroke={strokeColor} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Snow Peaks */}
        <polygon points="100,600 450,150 800,600" fill="#ffffff" strokeWidth="3.5" />
        <polygon points="450,150 400,260 450,290 500,250" fill="#f1f5f9" strokeWidth="2" />
        
        <polygon points="650,650 1100,100 1550,650" fill="#ffffff" strokeWidth="3.5" />
        <polygon points="1100,100 1020,240 1110,270 1180,230" fill="#f1f5f9" strokeWidth="2" />

        <polygon points="1400,600 1850,180 2300,600" fill="#ffffff" strokeWidth="3.5" />

        {/* Ski Slopes & Chalet */}
        <path d="M0 650 Q 600 550, 1200 700 T 2400 680 L 2400 1600 L 0 1600 Z" fill="#f8fafc" strokeWidth="3" />
        
        {/* Frozen Lake */}
        <ellipse cx="1200" cy="1150" rx="420" ry="200" fill="#e0f2fe" strokeWidth="3.5" />
        <path d="M1050 1120 Q 1120 1100, 1200 1130" strokeWidth="2" strokeDasharray="6 4" />

        {/* Ski lift cable */}
        <line x1="300" y1="750" x2="1600" y2="280" strokeWidth="2" strokeDasharray="4 2" />
      </g>
    );
  }

  if (biome === 'desert') {
    return (
      <g className="desert-scenery" stroke={strokeColor} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Pyramids */}
        <polygon points="250,550 500,220 750,550" fill="#fef9c3" strokeWidth="3.5" />
        <polygon points="500,220 540,550 750,550" fill="#fde047" strokeWidth="2" />

        <polygon points="1500,580 1850,250 2200,580" fill="#fef9c3" strokeWidth="3.5" />

        {/* Rolling Sand Dunes */}
        <path d="M0 580 Q 500 480, 1000 600 T 2000 560 Q 2200 600, 2400 580 L 2400 1600 L 0 1600 Z" fill="#fef08a" strokeWidth="3" />
        <path d="M0 950 Q 600 850, 1300 980 T 2400 940" strokeWidth="3" />

        {/* Oasis Lagoon */}
        <ellipse cx="1100" cy="1200" rx="350" ry="160" fill="#bae6fd" strokeWidth="3" />
      </g>
    );
  }

  if (biome === 'harbor') {
    return (
      <g className="harbor-scenery" stroke={strokeColor} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Horizon & Ocean */}
        <line x1="0" y1="620" x2="2400" y2="620" strokeWidth="3" />
        <rect x="0" y="620" width="2400" height="980" fill="#e0f2fe" />
        
        {/* Pier / Wooden Boardwalk */}
        <path d="M400 620 L 700 1350 L 980 1350 L 750 620 Z" fill="#fef3c7" strokeWidth="3" />
        
        {/* Sandy Beach */}
        <path d="M0 1150 Q 800 1050, 1600 1250 T 2400 1200 L 2400 1600 L 0 1600 Z" fill="#fef9c3" strokeWidth="3" />

        {/* Waves */}
        {[720, 820, 920, 1020].map((wy, idx) => (
          <path key={idx} d={`M 1100 ${wy} Q 1300 ${wy - 15}, 1500 ${wy} T 1900 ${wy} T 2300 ${wy}`} strokeWidth="2" strokeDasharray="10 6" />
        ))}
      </g>
    );
  }

  // Default: Level 1 - Quiet Village (Super Detailed Vector Art)
  return (
    <g className="village-scenery" stroke={strokeColor} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Sky & Clouds */}
      <g className="clouds" opacity="0.85">
        <path d="M120 180 Q 150 140, 200 160 Q 250 140, 280 180 Q 310 200, 270 230 Q 140 230, 120 180 Z" fill="#ffffff" />
        <path d="M850 120 Q 880 80, 930 100 Q 980 80, 1010 120 Q 1040 140, 1000 170 Q 870 170, 850 120 Z" fill="#ffffff" />
        <path d="M1650 150 Q 1690 100, 1750 130 Q 1810 100, 1850 150 Q 1890 180, 1830 210 Q 1680 210, 1650 150 Z" fill="#ffffff" />
      </g>

      {/* Doodle Sun with Rays */}
      <g transform="translate(2100, 140)">
        <circle cx="0" cy="0" r="45" fill="#fef08a" strokeWidth="3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={Math.cos((angle * Math.PI) / 180) * 55}
            y1={Math.sin((angle * Math.PI) / 180) * 55}
            x2={Math.cos((angle * Math.PI) / 180) * 72}
            y2={Math.sin((angle * Math.PI) / 180) * 72}
            strokeWidth="2.5"
          />
        ))}
      </g>

      {/* Distant Rolling Hills */}
      <path d="M0 480 Q 400 360, 900 460 T 1800 420 T 2400 490 L 2400 1600 L 0 1600 Z" fill="#ffffff" strokeWidth="3" />
      <path d="M0 620 Q 550 510, 1200 610 T 2400 580" strokeWidth="3" />

      {/* Meandering River */}
      <path
        d="M-50 1150 C 400 1050, 700 1350, 1150 1200 C 1550 1080, 1900 1300, 2450 1180 L 2450 1420 C 1900 1550, 1550 1320, 1150 1440 C 700 1580, 400 1280, -50 1380 Z"
        fill="#e0f2fe"
        strokeWidth="3.5"
      />
      {/* River current ripples */}
      <path d="M150 1220 Q 280 1200, 380 1240" strokeWidth="2" strokeDasharray="8 6" />
      <path d="M600 1380 Q 750 1340, 880 1390" strokeWidth="2" strokeDasharray="8 6" />
      <path d="M1350 1220 Q 1500 1190, 1650 1240" strokeWidth="2" strokeDasharray="8 6" />
      <path d="M1950 1320 Q 2100 1290, 2250 1330" strokeWidth="2" strokeDasharray="8 6" />

      {/* Stone Arch Bridge over River at (1100, 1140) */}
      <g transform="translate(1100, 1140)">
        <path d="M0 40 Q 90 -20, 180 40 L 180 160 Q 90 90, 0 160 Z" fill="#f1f5f9" strokeWidth="3.5" />
        <line x1="0" y1="40" x2="180" y2="40" strokeWidth="3" />
        {/* Parapet railing */}
        <line x1="0" y1="15" x2="180" y2="15" strokeWidth="2.5" />
        {[20, 55, 90, 125, 160].map((px) => (
          <line key={px} x1={px} y1="15" x2={px} y2="40" strokeWidth="2" />
        ))}
      </g>

      {/* Cobblestone Village Path */}
      <path d="M 1190 1200 L 1180 850 L 800 780" strokeWidth="3.5" strokeDasharray="6 5" />
      <path d="M 1180 850 L 1650 820" strokeWidth="3.5" strokeDasharray="6 5" />

      {/* Windmill at (220, 480) */}
      <g transform="translate(220, 480)">
        {/* Tower */}
        <polygon points="50,220 70,70 130,70 150,220" fill="#ffffff" strokeWidth="3" />
        {/* Cap dome */}
        <path d="M65 70 Q 100 30, 135 70 Z" fill="#ffffff" strokeWidth="3" />
        {/* Door */}
        <path d="M85 220 L 85 180 Q 100 165, 115 180 L 115 220 Z" fill="#ffffff" strokeWidth="2" />
        {/* Rotating sails center */}
        <circle cx="100" cy="70" r="7" fill="#141416" />
        {/* 4 Sails */}
        <g className="animate-spin origin-[100px_70px]" style={{ animationDuration: '18s' }}>
          <line x1="100" y1="70" x2="100" y2="-20" strokeWidth="3" />
          <polygon points="102,-15 125,-10 125,45 102,45" fill="#ffffff" strokeWidth="1.5" />
          
          <line x1="100" y1="70" x2="190" y2="70" strokeWidth="3" />
          <polygon points="185,72 180,95 125,95 125,72" fill="#ffffff" strokeWidth="1.5" />

          <line x1="100" y1="70" x2="100" y2="160" strokeWidth="3" />
          <polygon points="98,155 75,150 75,95 98,95" fill="#ffffff" strokeWidth="1.5" />

          <line x1="100" y1="70" x2="10" y2="70" strokeWidth="3" />
          <polygon points="15,68 20,45 75,45 75,68" fill="#ffffff" strokeWidth="1.5" />
        </g>
      </g>

      {/* Village Center Fountain / Well at (1180, 780) */}
      <g transform="translate(1120, 720)">
        <ellipse cx="60" cy="80" rx="55" ry="25" fill="#bae6fd" strokeWidth="3" />
        <ellipse cx="60" cy="75" rx="45" ry="18" fill="#ffffff" strokeWidth="2" />
        <line x1="20" y1="75" x2="20" y2="25" strokeWidth="2.5" />
        <line x1="100" y1="75" x2="100" y2="25" strokeWidth="2.5" />
        <path d="M15 25 Q 60 5, 105 25" strokeWidth="3" fill="#ffffff" />
        <circle cx="60" cy="40" r="6" fill="#141416" />
      </g>

      {/* Village Houses & Cottages */}
      {/* Cottage 1 (Baker) at (780, 680) */}
      <g transform="translate(760, 640)">
        {/* Wall */}
        <rect x="20" y="80" width="160" height="110" fill="#ffffff" strokeWidth="3" />
        {/* Roof */}
        <polygon points="10,80 100,10 190,80" fill="#ffffff" strokeWidth="3.5" />
        {/* Chimney */}
        <rect x="140" y="25" width="25" height="40" fill="#ffffff" strokeWidth="2.5" />
        {/* Window with panes */}
        <rect x="40" y="105" width="35" height="35" fill="#ffffff" strokeWidth="2" />
        <line x1="57" y1="105" x2="57" y2="140" strokeWidth="1.5" />
        <line x1="40" y1="122" x2="75" y2="122" strokeWidth="1.5" />
      </g>

      {/* Cottage 2 (Farmhouse) at (1520, 620) */}
      <g transform="translate(1500, 580)">
        <rect x="20" y="80" width="180" height="120" fill="#ffffff" strokeWidth="3" />
        <polygon points="10,80 110,15 210,80" fill="#ffffff" strokeWidth="3.5" />
        <rect x="35" y="25" width="25" height="45" fill="#ffffff" strokeWidth="2.5" />
        {/* Window */}
        <circle cx="110" cy="55" r="15" fill="#ffffff" strokeWidth="2" />
        <line x1="110" y1="40" x2="110" y2="70" strokeWidth="1.5" />
        <line x1="95" y1="55" x2="125" y2="55" strokeWidth="1.5" />
      </g>

      {/* Red Barn on Farm (1950, 640) */}
      <g transform="translate(1920, 600)">
        <rect x="20" y="90" width="220" height="140" fill="#ffffff" strokeWidth="3.5" />
        {/* Gambrel Roof */}
        <polygon points="10,90 40,30 130,5 220,30 250,90" fill="#ffffff" strokeWidth="3.5" />
        {/* Loft Window */}
        <rect x="110" y="45" width="40" height="35" fill="#ffffff" strokeWidth="2" />
        <line x1="110" y1="45" x2="150" y2="80" strokeWidth="1.5" />
        <line x1="150" y1="45" x2="110" y2="80" strokeWidth="1.5" />
      </g>

      {/* Wooden Fences */}
      <g className="fences">
        <path d="M 1800 850 L 2350 850" strokeWidth="3" />
        <path d="M 1800 875 L 2350 875" strokeWidth="3" />
        {[1820, 1880, 1940, 2000, 2060, 2120, 2180, 2240, 2300].map((fx) => (
          <path key={fx} d={`M ${fx} 840 L ${fx} 895`} strokeWidth="3" strokeLinecap="round" />
        ))}
      </g>

      {/* Farm Vegetable Patch (Carrots & Pumpkins) */}
      <g transform="translate(1860, 920)">
        <rect x="0" y="0" width="300" height="120" rx="10" strokeWidth="2" strokeDasharray="4 4" fill="#fafafa" />
        {/* Rows */}
        <line x1="20" y1="40" x2="280" y2="40" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="80" x2="280" y2="80" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Vegetable sprigs */}
        {[50, 110, 170, 230].map((vx) => (
          <g key={vx} transform={`translate(${vx}, 35)`}>
            <path d="M0 0 L -5 -12 M 0 0 L 0 -15 M 0 0 L 5 -12" strokeWidth="2" />
          </g>
        ))}
        {[80, 140, 200, 260].map((vx) => (
          <g key={vx} transform={`translate(${vx}, 75)`}>
            <ellipse cx="0" cy="0" rx="10" ry="7" fill="#ffffff" strokeWidth="2" />
            <path d="M0 -7 L 2 -12" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* Quiet Fishing Pond on Bottom-Left at (280, 1260) */}
      <g transform="translate(240, 1220)">
        <ellipse cx="160" cy="110" rx="150" ry="90" fill="#e0f2fe" strokeWidth="3.5" />
        {/* Wooden fishing pier / dock */}
        <polygon points="10,80 100,75 100,105 10,100" fill="#fef3c7" strokeWidth="2.5" />
        <line x1="95" y1="100" x2="95" y2="135" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="98" x2="60" y2="128" strokeWidth="3" strokeLinecap="round" />
        {/* Water lily pads */}
        <circle cx="210" cy="90" r="16" fill="#bbf7d0" strokeWidth="2" strokeDasharray="25 6" />
        <circle cx="140" cy="140" r="12" fill="#bbf7d0" strokeWidth="2" strokeDasharray="18 5" />
        {/* Reeds */}
        <path d="M280 100 L 290 50 M 285 100 L 300 55 M 290 100 L 310 60" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  );
};
