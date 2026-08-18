/** 提问页的示例问题快捷标签 */
export const QUESTION_CHIPS = [
  '💗 我们的感情会有结果吗?',
  '💼 这个决定对我的事业好吗?',
  '🧭 我此刻最需要看清什么?',
  '🌱 未来三个月我该注意什么?',
];

/** 去掉开头的 emoji，得到纯文本问题 */
export function stripEmoji(chip: string): string {
  return chip.replace(/^[^ ]+ /, '');
}
