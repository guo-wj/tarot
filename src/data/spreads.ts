import type { Spread, SpreadCount } from '../types';

/** 可选牌阵 */
export const SPREADS: Spread[] = [
  {
    count: 1,
    title: '单张指引',
    desc: '快速给出此刻的核心讯息 · 1 张牌',
    positions: ['核心讯息'],
  },
  {
    count: 3,
    title: '时间之流',
    desc: '过去 · 现在 · 未来 · 3 张牌',
    positions: ['过去', '现在', '未来'],
  },
  {
    count: 5,
    title: '抉择牌阵',
    desc: '权衡两条路的利弊与结果 · 5 张牌',
    positions: ['现状', '选择A', '选择B', '隐藏因素', '结果'],
  },
];

/** 默认牌阵张数 */
export const DEFAULT_SPREAD: SpreadCount = 3;

/** 按张数取牌阵定义 */
export function spreadByCount(count: SpreadCount): Spread {
  return SPREADS.find((s) => s.count === count) ?? SPREADS[1];
}

/** 按张数取每个位置的名称 */
export function positionsOf(count: SpreadCount): string[] {
  return spreadByCount(count).positions;
}
