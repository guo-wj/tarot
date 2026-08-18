/** 领域类型定义 */

/** 塔罗牌分类：大阿卡纳 / 小阿卡纳 */
export type Arcana = 'major' | 'minor';

/** 一张塔罗牌的静态定义 */
export interface Card {
  /** 中文名，如「愚者」 */
  name: string;
  /** 英文名，如「The Fool」 */
  enName: string;
  /** 代表 emoji */
  emoji: string;
  /** 正位含义（以「、」分隔的关键词） */
  upright: string;
  /** 逆位含义 */
  reversed: string;
  /** 分类 */
  arcana: Arcana;
}

/** 抽出的牌：在静态牌义之上附带是否逆位 */
export interface DrawnCard extends Card {
  /** 是否逆位 */
  isReversed: boolean;
}

/** 牌阵可选的张数 */
export type SpreadCount = 1 | 3 | 5;

/** 牌阵定义 */
export interface Spread {
  count: SpreadCount;
  title: string;
  desc: string;
  /** 每个位置的名称，长度等于 count */
  positions: string[];
}

/** 塔罗师人格 */
export interface Master {
  name: string;
  emoji: string;
  /** 风格标签，如「温柔疗愈」 */
  style: string;
}

/** 一次已保存的解读记录 */
export interface ReadingRecord {
  question: string;
  masterName: string;
  cardCount: number;
  /** 展示用的相对时间，如「刚刚」「3 天前」 */
  date: string;
}

/** 应用内的屏幕（导航目标） */
export type Screen =
  | 'home'
  | 'ask'
  | 'spread'
  | 'draw'
  | 'result'
  | 'library'
  | 'history';

/** 追问对话中的一条消息 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

/** 解读文本的富文本片段 */
export interface Segment {
  text: string;
  emphasis?: 'gold' | 'violet';
}

/** 解读文本的一个区块 */
export type InterpretBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; segments: Segment[] };
