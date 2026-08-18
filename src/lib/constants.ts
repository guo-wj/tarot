/** 各处动画与流程的时间常量（毫秒），集中管理便于调整节奏 */
export const TIMING = {
  /** 洗牌动画持续时间 */
  shuffle: 1900,
  /** 抽满牌后跳转到结果页的延迟 */
  afterPick: 600,
  /** 全部翻牌后开始解读的延迟 */
  afterFlip: 700,
  /** 解读文本逐块揭示的间隔 */
  interpretBlock: 420,
  /** 追问回复逐字打字的间隔 */
  chatChar: 22,
} as const;

/** 抽牌扇面展开的候选牌数量 */
export const FAN_SIZE = 20;

/** 抽到逆位的概率 */
export const REVERSED_CHANCE = 0.35;

/** 初始灵石数量 */
export const INITIAL_CREDITS = 28;
