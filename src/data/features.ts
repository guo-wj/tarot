import type { Screen } from '../types';

export interface Feature {
  icon: string;
  title: string;
  desc: string;
  /** 点击后前往的屏幕；'reading' 表示开始新占卜 */
  target: Screen | 'reading';
}

/** 首页「你可以这样使用 Aurora」功能卡片 */
export const FEATURES: Feature[] = [
  { icon: '🔮', title: '提问占卜', desc: '输入任何困惑,选择牌阵,AI 为你抽牌并深度解读。', target: 'reading' },
  { icon: '📖', title: '78 张牌库', desc: '大小阿卡纳全解,正逆位含义、关键词与象征。', target: 'library' },
  { icon: '💬', title: '追问对话', desc: '解读后继续和塔罗师聊,澄清细节、挖掘更深层的答案。', target: 'reading' },
  { icon: '🗂️', title: '跨次记忆', desc: '记录每次解读,追踪反复出现的主题与你的成长脉络。', target: 'history' },
  { icon: '🌗', title: '多元占术', desc: '塔罗之外,还可召唤星盘、易经、数字学做交叉解读。', target: 'reading' },
  { icon: '🧙', title: '自选塔罗师', desc: '温柔疗愈、犀利直言、神秘古典——挑选合拍的解读人格。', target: 'reading' },
];
