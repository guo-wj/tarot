/** 随机工具 */

/** 从数组中随机取一个元素 */
export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 以给定概率返回 true */
export function chance(probability: number): boolean {
  return Math.random() < probability;
}
