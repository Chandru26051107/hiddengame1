import { LevelData } from '../types/game';
import { level1Village } from './levels/level1_village';
import { level2Forest } from './levels/level2_forest';
import { level3Mountain } from './levels/level3_mountain';
import { level4Desert } from './levels/level4_desert';
import { level5Harbor } from './levels/level5_harbor';

export const allLevels: LevelData[] = [
  level1Village,
  level2Forest,
  level3Mountain,
  level4Desert,
  level5Harbor,
];

export const getLevelById = (id: string): LevelData => {
  return allLevels.find((lvl) => lvl.id === id) || level1Village;
};
