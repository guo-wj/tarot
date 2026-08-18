import { useEffect, useRef, useState } from 'react';

/**
 * 逐字打字机效果。
 * @param fullText 目标完整文本；每次变化都会从头开始打字
 * @param speed    每个字符的间隔（毫秒）
 * @returns 已显示的文本、是否打字完成
 */
export function useTypewriter(fullText: string, speed: number) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay('');
    setDone(false);
    if (!fullText) {
      setDone(true);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplay(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [fullText, speed]);

  return { display, done };
}

/**
 * 逐块揭示：按固定间隔递增「已显示区块数」，直到覆盖全部。
 * @param total 区块总数
 * @param speed 每块的间隔（毫秒）
 * @returns 当前已显示的区块数、是否全部揭示完成
 */
export function useRevealBlocks(total: number, speed: number) {
  const [count, setCount] = useState(0);
  const totalRef = useRef(total);
  totalRef.current = total;

  useEffect(() => {
    setCount(0);
    if (total === 0) return;
    const timer = setInterval(() => {
      setCount((c) => {
        const next = c + 1;
        if (next >= totalRef.current) clearInterval(timer);
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [total, speed]);

  return { count, done: count >= total };
}
