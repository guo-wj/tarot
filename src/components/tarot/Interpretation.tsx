import { useEffect, useState } from 'react';
import type { InterpretBlock } from '../../types';
import { useReading } from '../../context/ReadingContext';
import { useRevealBlocks } from '../../hooks/useTypewriter';
import { masterStyle } from '../../data/masters';
import { positionsOf, spreadByCount } from '../../data/spreads';
import { parseInterpretation, postTarotInterpret, toTarotCards } from '../../lib/tarotApi';
import { TIMING } from '../../lib/constants';
import { Button } from '../ui/Button';
import styles from './Interpretation.module.css';

interface InterpretationProps {
  /** 已翻开的抽牌，用于生成解读 */
  cards: ReturnType<typeof useReading>['picks'];
  /** 解读完成回调（用于展开追问对话） */
  onDone: () => void;
}

/** 逐块揭示的解读正文 */
export function Interpretation({ cards, onDone }: InterpretationProps) {
  const { question, masterName, spread } = useReading();
  const [blocks, setBlocks] = useState<InterpretBlock[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setBlocks(null);
    setError(null);

    void postTarotInterpret({
      question,
      master_name: masterName,
      master_style: masterStyle(masterName),
      spread_title: spreadByCount(spread).title,
      cards: toTarotCards(cards, positionsOf(spread)),
    })
      .then((text) => {
        if (cancelled) return;
        const parsed = parseInterpretation(text);
        setBlocks(parsed.length ? parsed : [{ type: 'paragraph', segments: [{ text }] }]);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : '解读失败，请稍后再试');
      });

    return () => {
      cancelled = true;
    };
  }, [question, masterName, spread, cards, retryKey]);

  const { count, done } = useRevealBlocks(blocks?.length ?? 0, TIMING.interpretBlock);

  useEffect(() => {
    if (done && blocks && blocks.length > 0) onDone();
  }, [done, blocks, onDone]);

  if (error) {
    return (
      <div className={styles.status}>
        <p className={styles.error}>{error}</p>
        <Button small variant="ghost" onClick={() => setRetryKey((k) => k + 1)}>
          重新解读
        </Button>
      </div>
    );
  }

  if (!blocks) {
    return (
      <p className={styles.status}>
        正在凝视牌面
        <span className={styles.cursor} />
      </p>
    );
  }

  return (
    <div className={styles.readText}>
      {blocks.slice(0, count).map((block, i) =>
        block.type === 'heading' ? (
          <h4 key={i}>{block.text}</h4>
        ) : (
          <p key={i}>
            {block.segments.map((seg, j) => (
              <span
                key={j}
                className={
                  seg.emphasis === 'gold'
                    ? styles.gold
                    : seg.emphasis === 'violet'
                      ? styles.violet
                      : undefined
                }
              >
                {seg.text}
              </span>
            ))}
          </p>
        ),
      )}
      {!done && <span className={styles.cursor} />}
    </div>
  );
}
