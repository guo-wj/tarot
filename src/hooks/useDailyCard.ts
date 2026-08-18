import { useMemo } from 'react';
import type { Card } from '../types';
import { DECK } from '../data/deck';
import { pickRandom } from '../lib/random';

/** 从大阿卡纳中随机取一张作为「今日之牌」，组件生命周期内保持不变 */
export function useDailyCard(): Card {
  return useMemo(() => pickRandom(DECK.filter((c) => c.arcana === 'major')), []);
}
