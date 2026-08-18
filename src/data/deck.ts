import type { Card } from '../types';

/** 演示牌库：12 张大阿卡纳 + 4 张小阿卡纳 */
export const DECK: Card[] = [
  { name: '愚者', enName: 'The Fool', emoji: '🃏', upright: '新的开始、冒险、纯真、无限可能', reversed: '鲁莽、犹豫、错失机会', arcana: 'major' },
  { name: '魔术师', enName: 'The Magician', emoji: '🎩', upright: '创造力、行动力、资源俱全', reversed: '操纵、能力未展、拖延', arcana: 'major' },
  { name: '女祭司', enName: 'High Priestess', emoji: '🌙', upright: '直觉、潜意识、神秘、静观', reversed: '忽视直觉、秘密、混乱', arcana: 'major' },
  { name: '皇后', enName: 'The Empress', emoji: '👑', upright: '丰盛、滋养、创造、爱', reversed: '依赖、停滞、自我忽视', arcana: 'major' },
  { name: '恋人', enName: 'The Lovers', emoji: '💞', upright: '爱、结合、价值观选择、和谐', reversed: '失衡、分歧、逃避选择', arcana: 'major' },
  { name: '战车', enName: 'The Chariot', emoji: '🏇', upright: '意志、掌控、胜利、前进', reversed: '失控、方向不明、内耗', arcana: 'major' },
  { name: '力量', enName: 'Strength', emoji: '🦁', upright: '勇气、温柔的力量、耐心', reversed: '自我怀疑、急躁、软弱', arcana: 'major' },
  { name: '命运之轮', enName: 'Wheel of Fortune', emoji: '🎡', upright: '转机、循环、命运、时机', reversed: '逆境、失控、坏运气', arcana: 'major' },
  { name: '星星', enName: 'The Star', emoji: '🌟', upright: '希望、疗愈、灵感、信念', reversed: '失望、失去信心、干涸', arcana: 'major' },
  { name: '月亮', enName: 'The Moon', emoji: '🌕', upright: '潜意识、幻象、不安、直觉', reversed: '释放恐惧、真相浮现', arcana: 'major' },
  { name: '太阳', enName: 'The Sun', emoji: '☀️', upright: '喜悦、成功、活力、光明', reversed: '暂时低落、过度乐观', arcana: 'major' },
  { name: '世界', enName: 'The World', emoji: '🌍', upright: '圆满、完成、整合、成就', reversed: '未竟、拖延、缺口', arcana: 'major' },
  { name: '圣杯二', enName: 'Two of Cups', emoji: '🏆', upright: '结合、互相吸引、伙伴', reversed: '失衡、分离、误解', arcana: 'minor' },
  { name: '权杖三', enName: 'Three of Wands', emoji: '🔥', upright: '扩展、远见、进展', reversed: '延误、受阻、短视', arcana: 'minor' },
  { name: '钱币十', enName: 'Ten of Pentacles', emoji: '💰', upright: '富足、家庭、传承、稳固', reversed: '财务风险、家庭纷争', arcana: 'minor' },
  { name: '宝剑七', enName: 'Seven of Swords', emoji: '⚔️', upright: '策略、独行、机敏', reversed: '欺瞒被揭、坦诚', arcana: 'minor' },
];
