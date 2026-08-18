import type { DrawnCard, InterpretBlock, SpreadCount } from '../types';
import { positionsOf } from '../data/spreads';
import { pickRandom } from './random';

/** 每张牌解读时随机穿插的一句点评 */
const FLAVOR_LINES = [
  '它提醒你此刻不必急于求成,时机自会成熟。',
  '这是一份邀请,请你更柔软也更坚定地对待自己。',
  '它暗示着一段能量的流动,顺势而为将带来意想不到的转机。',
  '牌面的讯息温柔而坚定:你比想象中更接近答案。',
];

/** 取某位置的名称，越界时回退到「第 N 张」 */
function positionLabel(positions: string[], index: number): string {
  return positions[index] ?? `第${index + 1}张`;
}

/**
 * 根据问题与抽出的牌，构建结构化的解读文本。
 * 返回富文本区块数组，交由 UI 逐块揭示（不使用 innerHTML）。
 */
export function buildInterpretation(
  question: string,
  cards: DrawnCard[],
  spread: SpreadCount,
): InterpretBlock[] {
  const positions = positionsOf(spread);
  const blocks: InterpretBlock[] = [];

  blocks.push({
    type: 'paragraph',
    segments: [
      { text: '亲爱的旅人,针对你的提问' },
      { text: `「${question}」`, emphasis: 'gold' },
      { text: ',牌面为你揭示了这样的图景。' },
    ],
  });

  cards.forEach((card, i) => {
    const meaning = card.isReversed ? card.reversed : card.upright;
    const orientation = card.isReversed ? '逆位' : '正位';
    blocks.push({
      type: 'heading',
      text: `${positionLabel(positions, i)} · ${card.name}(${orientation})`,
    });
    blocks.push({
      type: 'paragraph',
      segments: [
        { text: `${card.name}落在这个位置,象征着` },
        { text: meaning, emphasis: 'violet' },
        { text: `。${pickRandom(FLAVOR_LINES)}` },
      ],
    });
  });

  blocks.push({ type: 'heading', text: '✦ 给你的指引' });
  blocks.push({
    type: 'paragraph',
    segments: [
      {
        text:
          '综观整个牌阵,宇宙想告诉你的是:相信自己已经拥有的力量,顺应此刻的节奏而非对抗它。' +
          '答案并不在远方,而在你愿意诚实面对内心的那一刻。',
      },
    ],
  });

  return blocks;
}
