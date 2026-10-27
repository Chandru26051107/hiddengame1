export interface Point {
  x: number;
  y: number;
}

export type BiomeType = 'village' | 'forest' | 'mountain' | 'desert' | 'harbor';

export type TargetStatus = 'hidden' | 'revealed' | 'found';

export interface TargetItem {
  id: string;
  name: string;
  clue: string;
  category: 'character' | 'animal' | 'object' | 'nature';
  iconType: string;
  accentColor: string; // The vibrant hand-painted color revealed upon finding
  x: number;
  y: number;
  width: number;
  height: number;
  hiddenBehindId?: string; // Must trigger this interactive object first
  isMoving?: boolean;
  path?: Point[];
  moveSpeed?: number;
  foundAt?: number;
}

export type InteractionAnimationType = 
  | 'rustle' 
  | 'open' 
  | 'lift' 
  | 'shake' 
  | 'slide' 
  | 'ripple' 
  | 'spin'
  | 'bounce';

export type SoundEffectType = 
  | 'rustle' 
  | 'creak' 
  | 'lift' 
  | 'splash' 
  | 'bell' 
  | 'pop' 
  | 'found' 
  | 'complete' 
  | 'hint'
  | 'tap';

export interface InteractiveObject {
  id: string;
  name: string;
  type: 
    | 'bush' 
    | 'tree' 
    | 'door' 
    | 'tent' 
    | 'rock' 
    | 'manhole' 
    | 'curtain' 
    | 'chest' 
    | 'chimney' 
    | 'pond' 
    | 'haystack' 
    | 'windmill' 
    | 'bell'
    | 'window'
    | 'mailbox'
    | 'barrel';
  x: number;
  y: number;
  width: number;
  height: number;
  tapAnimation: InteractionAnimationType;
  revealsTargetId?: string; // ID of target revealed when this object is opened/shaken
  interactionSound?: SoundEffectType;
  lootItem?: {
    name: string;
    icon: string;
    color: string;
  };
}

export interface AmbientNPC {
  id: string;
  name: string;
  type: 'villager' | 'bird' | 'fish' | 'car' | 'cat' | 'dog' | 'butterfly' | 'cloud' | 'boat';
  path: Point[];
  speed: number;
  scale?: number;
}

export interface LevelData {
  id: string;
  levelNumber: number;
  title: string;
  biome: BiomeType;
  subtitle: string;
  description: string;
  sceneWidth: number;
  sceneHeight: number;
  targets: TargetItem[];
  interactiveObjects: InteractiveObject[];
  ambientNPCs: AmbientNPC[];
}

export interface LevelProgress {
  foundTargetIds: string[];
  interactedObjectIds: string[];
  completed: boolean;
  stars: number;
  timeSpentSeconds: number;
  clicksCount: number;
  hintsUsedCount: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  sfxVolume: number;
  ambientVolume: number;
  highContrast: boolean;
  largeHitboxes: boolean;
  showLabels: boolean;
}

export interface ViewportTransform {
  x: number;
  y: number;
  scale: number;
}
