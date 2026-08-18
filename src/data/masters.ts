import type { Master } from '../types';

/** 可选的塔罗师人格 */
export const MASTERS: Master[] = [
  { name: '露娜', emoji: '🌙', style: '温柔疗愈' },
  { name: '奥瑞恩', emoji: '⚡', style: '犀利直言' },
  { name: '塞拉菲娜', emoji: '🕯️', style: '神秘古典' },
  { name: '凯', emoji: '🌿', style: '理性务实' },
];

/** 默认选中的塔罗师名 */
export const DEFAULT_MASTER = MASTERS[0].name;

/** 按名字取塔罗师 emoji，用于头像展示 */
export function masterEmoji(name: string): string {
  return MASTERS.find((m) => m.name === name)?.emoji ?? '🔮';
}

/** 按名字取塔罗师风格标签 */
export function masterStyle(name: string): string {
  return MASTERS.find((m) => m.name === name)?.style ?? '';
}
