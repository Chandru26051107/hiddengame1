# Hidden Trails: Tutorial - Adding a New Level

Adding a new level or custom biome in **Hidden Trails** is 100% data-driven and requires just three simple steps.

---

## Step 1: Create Your Level Data File

Create a new TypeScript or JSON file in `src/data/levels/`, for example `src/data/levels/level6_island.ts`:

```typescript
import { LevelData } from '../../types/game';

export const level6Island: LevelData = {
  id: 'island',
  levelNumber: 6,
  title: 'Treasure Atoll',
  biome: 'harbor', // Biome audio & theme: 'village' | 'forest' | 'mountain' | 'desert' | 'harbor'
  subtitle: 'White sandy shores, palm groves, and pirate coves',
  description: 'Search the shipwreck and tidal pools for buried doubloons.',
  sceneWidth: 2400,
  sceneHeight: 1600,
  targets: [
    {
      id: 'target-island-coin',
      name: 'Gold Doubloon',
      clue: 'Buried deep beneath the coral boulder on the beach.',
      category: 'object',
      iconType: 'golden_key',
      accentColor: '#eab308',
      x: 1400,
      y: 950,
      width: 42,
      height: 42,
      hiddenBehindId: 'obj-coral-rock-1', // Hidden until this rock is tapped!
    },
    {
      id: 'target-island-crab',
      name: 'Hermit Crab',
      clue: 'Scuttling back and forth across the sandy shoreline.',
      category: 'animal',
      iconType: 'wooden_duck',
      accentColor: '#f97316',
      x: 820,
      y: 1100,
      width: 40,
      height: 38,
      isMoving: true, // Moving target!
      moveSpeed: 1.2,
      path: [
        { x: 800, y: 1100 },
        { x: 1050, y: 1100 },
        { x: 800, y: 1100 },
      ],
    },
  ],
  interactiveObjects: [
    {
      id: 'obj-coral-rock-1',
      name: 'Coral Boulder',
      type: 'rock',
      x: 1380,
      y: 930,
      width: 80,
      height: 55,
      tapAnimation: 'lift',
      interactionSound: 'lift',
      revealsTargetId: 'target-island-coin',
    },
  ],
  ambientNPCs: [
    {
      id: 'npc-island-bird',
      name: 'Pelican',
      type: 'bird',
      path: [
        { x: 100, y: 200 },
        { x: 1200, y: 250 },
        { x: 2300, y: 180 },
      ],
      speed: 2.0,
    },
  ],
};
```

---

## Step 2: Register the Level in the Catalog

Open `src/data/index.ts` and add your new level to `allLevels`:

```typescript
import { level6Island } from './levels/level6_island';

export const allLevels: LevelData[] = [
  level1Village,
  level2Forest,
  level3Mountain,
  level4Desert,
  level5Harbor,
  level6Island, // <-- Added here
];
```

---

## Step 3: Run and Test Locally

Run the development server:

```bash
npm run dev
```

Open your browser to the local dev URL (usually `http://localhost:5173`).
Tap the level select button in the top header and your new level will be available with full pan/zoom, hints, audio, and victory stats!

---

## Level Design Best Practices

1. **Target Placement**:
   - Spread targets across different quadrants of the 2400 × 1600 canvas so players have fun exploring the scene.
   - Mix stationary targets with at least 1 moving target (`isMoving: true`) and 2-3 interactive hidden targets (`hiddenBehindId`).
2. **Interactive Scenery**:
   - Place bushes, trees, and doors with appropriate sounds (`'rustle'`, `'creak'`, `'lift'`, `'splash'`, `'bell'`).
3. **Clues**:
   - Write gentle, poetic riddles that reward observation without giving away the exact coordinates.
