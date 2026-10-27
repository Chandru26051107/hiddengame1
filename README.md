# Hidden Trails: Scavenger Hunt 🗺️🔍

A calm, hand-drawn black-and-white doodle scavenger hunt game built with **React**, **TypeScript**, **Tailwind CSS**, **SVG Canvas**, and procedural **Web Audio API**.

The player explores large pannable, zoomable scenes and finds a list of tiny hidden characters and objects. Everything in the scene is interactive and rewards curiosity!

---

## 🎮 Core Features

1. **Large Pan & Zoom Scene**:
   - 2400 × 1600 coordinate panoramic scenes (~3x viewport size).
   - Desktop: Click-and-drag pan, mouse wheel zoom centered at cursor, keyboard arrow/WASD navigation.
   - Mobile: 1-finger drag to pan, 2-finger pinch-to-zoom, touch-friendly oversized hit targets.
2. **Find List Bottom Drawer**:
   - Doodle icons + target names.
   - Finding a target triggers an animated pop, confetti burst, chime chord, and reveals vibrant hand-painted watercolor color.
   - Tap any target card to inspect a poetic location clue!
3. **Interactive Scenery**:
   - Tapping objects triggers custom doodle animations: bushes rustle, shed doors open, tents unzip, apple trees shake, well buckets open, and church bells ring.
4. **Moving Targets & Ambient Characters**:
   - Walking hikers, flying birds, swimming trout/koi, trotting puppies, and drifting clouds.
   - Some targets move continuously and must be caught in motion!
5. **Hidden-in-Interaction Targets**:
   - Objects like the **Golden Apple**, **Golden Key**, and **Pocketwatch** only reveal themselves after specific interactions (e.g. shaking the apple tree or opening the shed door).
6. **Smart Hint System**:
   - Tap **Hint** to smoothly glide the camera to an unfound target and emit a soft pulsing radar ripple beacon.
   - Regenerates every 20 seconds.
7. **Procedural Web Audio Engine**:
   - 100% zero-dependency Web Audio API synthesizer for playful Foley SFX (creaks, rustles, bell chimes, splashes, victory fanfare) and procedural biome ambient soundscapes (breeze, distant birds, river wash, alpine wind).
8. **Level Complete Celebration**:
   - Multi-colored confetti burst (`canvas-confetti`), 3-star rating, time elapsed, hints used, and clicks count.
9. **5 Playable Biomes**:
   - Level 1: **Quiet Village** (houses, farm, pond, market, windmill, bridge)
   - Level 2: **Deep Forest** (treehouses, campsite, cave, river)
   - Level 3: **Snowy Mountain** (ski lodge, igloos, frozen lake)
   - Level 4: **Desert Town** (oasis, pyramids, spice bazaar, train station)
   - Level 5: **Seaside Harbor** (boats, lighthouse, beach, pier)
10. **Accessibility & Save Persistence**:
    - High-contrast ink mode.
    - Large tap target mode.
    - Sound mute & volume controls.
    - `localStorage` saves found items, unlocked levels, and best records.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Run

```bash
# 1. Navigate to the project directory
cd hidden-trails-game

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Folder Structure

```
hidden-trails-game/
├── index.html                  # HTML5 entry with doodle typography & meta viewport
├── package.json                # Project scripts & dependencies
├── tsconfig.json               # TypeScript project reference
├── tsconfig.app.json           # Application TypeScript compiler config
├── vite.config.ts              # Vite bundler configuration
├── tailwind.config.js          # Ink & paper color palette, doodle shadows
├── postcss.config.js           # PostCSS Tailwind plugins
├── docs/
│   ├── LEVEL_SCHEMA.md         # JSON schema specification & sample level
│   ├── ASSETS_GUIDE.md         # Kenney, itch.io, OpenGameArt, Freesound guide
│   └── ADDING_LEVELS.md        # Step-by-step tutorial for adding new levels
├── public/
│   └── favicon.svg             # Doodle magnifying glass icon
├── src/
│   ├── main.tsx                # React DOM mount point
│   ├── App.tsx                 # Master game state, HUD, and modal orchestrator
│   ├── index.css               # Hand-drawn wiggle animations & paper texture
│   ├── types/
│   │   └── game.ts             # Typed data models for levels, targets, interactions
│   ├── audio/
│   │   └── SoundManager.ts     # Procedural Web Audio Foley & generative ambient audio
│   ├── data/
│   │   ├── index.ts            # Level catalog and lookup
│   │   └── levels/
│   │       ├── level1_village.ts  # Level 1 Quiet Village (10 targets, 25+ interactives)
│   │       ├── level2_forest.ts   # Level 2 Deep Forest
│   │       ├── level3_mountain.ts # Level 3 Snowy Mountain
│   │       ├── level4_desert.ts   # Level 4 Desert Town
│   │       └── level5_harbor.ts   # Level 5 Seaside Harbor
│   ├── hooks/
│   │   ├── useGesturePanZoom.ts   # Multi-touch pinch, mouse drag/wheel, keyboard pan
│   │   └── useGameStorage.ts     # LocalStorage save state and settings
│   ├── components/
│   │   ├── art/
│   │   │   └── DoodleDrawnAssets.tsx # SVG doodle icons with watercolor found states
│   │   ├── engine/
│   │   │   ├── SceneViewer.tsx       # Pan/zoom virtual coordinate world
│   │   │   ├── SceneArtLayers.tsx    # Vector doodle backdrops & landmarks
│   │   │   ├── InteractiveObject.tsx # Tap animations (rustle, open, lift, shake)
│   │   │   ├── TargetItem.tsx        # Hidden/revealed target items & waypoints
│   │   │   ├── AmbientNPC.tsx         # Animated birds, fish, villagers, puppies
│   │   │   └── Minimap.tsx           # Radar navigation overlay with camera box
│   │   ├── hud/
│   │   │   ├── TopHeader.tsx         # Level banner, hints, zoom, audio toggle
│   │   │   ├── FindListBar.tsx       # Horizontal target card drawer & clues
│   │   │   └── HintIndicator.tsx     # Pulsing ripple radar beacon
│   │   └── modals/
│   │       ├── ClueModal.tsx         # Target clue inspection & camera focus
│   │       ├── LevelSelectModal.tsx  # Biome selector with star ratings
│   │       ├── LevelCompleteModal.tsx# Confetti celebration, victory fanfare & stats
│   │       └── SettingsModal.tsx     # Audio sliders, high-contrast, controls
```

---

## 🎨 Adding New Levels
See [`docs/ADDING_LEVELS.md`](docs/ADDING_LEVELS.md) for a complete tutorial and [`docs/LEVEL_SCHEMA.md`](docs/LEVEL_SCHEMA.md) for the JSON schema.
