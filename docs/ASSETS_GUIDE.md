# Hidden Trails: Asset Sources & Expansion Guide

This guide details the current built-in procedural SVG assets and provides curated free resources for swapping or expanding assets with external vector doodle illustrations and audio.

---

## 1. Built-in Procedural Asset Catalog

The game engine includes 100% pure vector SVG illustrations that scale cleanly without pixelation or external network requests:

| Asset Name | Type | Key | Interaction / Revealer |
| :--- | :--- | :--- | :--- |
| **Old Fisherman** | Target | `fisherman` | Standing by pond dock |
| **Red Balloon** | Target | `red_balloon` | Floating near village roof |
| **Sleeping Cat** | Target | `sleeping_cat` | Sleeping on barn loft |
| **Golden Key** | Target (Hidden) | `golden_key` | Revealed by opening toolshed door |
| **Lost Hiker** | Target | `lost_hiker` | Walking in rolling hillside |
| **Golden Apple** | Target (Hidden) | `golden_apple` | Revealed by shaking apple tree |
| **Pocketwatch** | Target (Hidden) | `vintage_pocketwatch` | Revealed by tapping town well |
| **Wooden Duck** | Target | `wooden_duck` | Bobbing on pond water |
| **Secret Letter** | Target (Hidden) | `secret_letter` | Revealed by opening mailbox |
| **Playful Puppy** | Target (Moving) | `sleeping_cat` (dog) | Moving along farm fence path |
| **Silver Compass** | Target | `silver_compass` | In forest and harbor campsites |
| **Grand Trees** | Interactive | `tree` | Wobble & drop fruit (`rustle` SFX) |
| **Berry Bushes** | Interactive | `bush` | Rustle shake (`rustle` SFX) |
| **Cottage Doors** | Interactive | `door` | Swing open panel (`creak` SFX) |
| **Camp Tents** | Interactive | `tent` | Unzip canvas flap (`rustle` SFX) |
| **Granite Rocks** | Interactive | `rock` | Slide / lift up (`lift` SFX) |
| **Town Well** | Interactive | `chest` | Lid opens (`splash` SFX) |
| **Chapel Bell** | Interactive | `bell` | Swing & ring (`bell` SFX) |

---

## 2. Free High-Quality Asset Sources

When you want to replace doodle placeholders with custom illustrations or recorded Foley effects, use these trusted public domain / CC0 sources:

### A. Vector Art & Doodle Graphics

1. **Kenney (kenney.nl)**
   - License: **CC0 Public Domain**
   - Recommended Packs:
     - *Doodle Pack*: Clean monochrome and ink-style icons, characters, and UI elements.
     - *Scribble Dungeons / Scribble Platformer*: Hand-drawn black ink assets on transparent background.
     - URL: `https://kenney.nl/assets?q=doodle`

2. **OpenGameArt (opengameart.org)**
   - License: Public Domain, CC-BY, CC0
   - Recommended Search terms: `"hand-drawn"`, `"doodle"`, `"sketch"`, `"scavenger hunt"`, `"ink"`
   - Great for: Nature sprites, animal doodles, antique maps, parchment textures.
   - URL: `https://opengameart.org`

3. **Itch.io Game Assets (itch.io/game-assets)**
   - Filter by: *Tag: 2D*, *Price: Free*, *Hand-Drawn* / *Doodle*
   - Great for: Indie artist packs, black-and-white ink drawings, hidden-object asset packs.
   - URL: `https://itch.io/game-assets/free/tag-hand-drawn`

4. **Flaticon / The Noun Project**
   - Great for: Vector SVG icons of everyday hidden objects (compasses, lanterns, boots, keys, butterflies).
   - URL: `https://thenounproject.com/`

---

### B. Sound Effects & Ambient Audio

1. **Freesound (freesound.org)**
   - License: Creative Commons 0 (CC0)
   - Search Terms:
     - Rustle: `"leaf rustle"`, `"bush shake"`
     - Doors: `"wooden door squeak"`, `"creaky cupboard"`
     - Nature: `"gentle summer breeze"`, `"country birds morning"`, `"forest brook"`
     - Ambience: `"ocean waves harbor"`, `"mountain wind whistling"`
   - URL: `https://freesound.org/`

2. **Kenney Audio (kenney.nl/assets/category:Audio)**
   - *Impact Sounds*, *Foley Sounds*, *UI Audio (clicks, pops, cheerful chimes)*
   - CC0 Public Domain.

---

## 3. How to Swap in an SVG Asset

1. Add your SVG markup into `src/components/art/DoodleDrawnAssets.tsx`:
   ```tsx
   case 'your_new_icon':
     return (
       <svg width={size} height={size} viewBox="0 0 60 60">
         <path d="..." fill={isFound ? accentColor : '#ffffff'} stroke="#141416" strokeWidth="2.5" />
       </svg>
     );
   ```
2. Reference the icon in your level file (`src/data/levels/...`):
   ```ts
   {
     id: 'target-telescope',
     name: 'Brass Telescope',
     iconType: 'your_new_icon',
     accentColor: '#f59e0b',
     ...
   }
   ```
3. Vite hot-reloads instantly!
