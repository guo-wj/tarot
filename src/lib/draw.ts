import type { DrawnCard } from '../types';
import { DECK } from '../data/deck';
import { REVERSED_CHANCE } from './constants';
import { chance, pickRandom } from './random';

/** 从牌库随机抽一张牌，并按概率决定正/逆位 */
export function drawCard(): DrawnCard {
  return { ...pickRandom(DECK), isReversed: chance(REVERSED_CHANCE) };
}

/** 取牌义关键词的第一个词，用于卡面下方的短标签 */
export function firstKeyword(card: DrawnCard): string {
  const meaning = card.isReversed ? card.reversed : card.upright;
  return meaning.split('、')[0];
}
