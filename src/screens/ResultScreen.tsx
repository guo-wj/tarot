import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useReading } from '../context/ReadingContext';
import { useNewReading } from '../hooks/useNewReading';
import { positionsOf } from '../data/spreads';
import { masterEmoji } from '../data/masters';
import { TIMING } from '../lib/constants';
import { Button } from '../components/ui/Button';
import { Steps } from '../components/ui/Steps';
import { SectionTitle } from '../components/ui/SectionTitle';
import { FlipCard } from '../components/tarot/FlipCard';
import { Interpretation } from '../components/tarot/Interpretation';
import { FollowUpChat } from '../components/tarot/FollowUpChat';
import styles from './ResultScreen.module.css';

export function ResultScreen() {
  const { navigate } = useNavigation();
  const { question, masterName, spread, picks } = useReading();
  const startReading = useNewReading();

  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [showReading, setShowReading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  const positions = positionsOf(spread);
  const allFlipped = picks.length > 0 && flipped.filter(Boolean).length === picks.length;

  // 每次进入结果页（picks 变化）重置翻牌状态
  useEffect(() => {
    setFlipped(new Array(picks.length).fill(false));
    setShowReading(false);
    setShowChat(false);
  }, [picks]);

  // 全部翻开后，延迟展开解读并滚动到解读区
  useEffect(() => {
    if (!allFlipped) return;
    const timer = setTimeout(() => {
      setShowReading(true);
      readingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, TIMING.afterFlip);
    return () => clearTimeout(timer);
  }, [allFlipped]);

  // 没有抽牌数据（例如直接进入）时回到首页
  useEffect(() => {
    if (picks.length === 0) navigate('home');
  }, [picks.length, navigate]);

  const flip = (index: number) => {
    setFlipped((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  if (picks.length === 0) return null;

  return (
    <>
      <Steps total={4} current={4} />
      <SectionTitle center subtitle={`"${question}"  ·  解读人:${masterName}`}>
        你的牌阵
      </SectionTitle>

      <div className={styles.revealRow}>
        {picks.map((card, i) => (
          <FlipCard
            key={i}
            card={card}
            position={positions[i] ?? `第${i + 1}张`}
            flipped={flipped[i] ?? false}
            onFlip={() => flip(i)}
          />
        ))}
      </div>

      {!allFlipped && <p className={styles.tapHint}>👆 点击卡牌翻开</p>}

      <div ref={readingRef}>
        {showReading && (
          <div className={styles.reading}>
            <div className={styles.who}>
              <div className={styles.avatar}>{masterEmoji(masterName)}</div>
              <div>
                <b className={styles.name}>{masterName}</b>
                <span className={styles.role}>AI 塔罗师 · 正在为你解读</span>
              </div>
            </div>

            <Interpretation cards={picks} onDone={() => setShowChat(true)} />

            {showChat && <FollowUpChat cards={picks} />}
          </div>
        )}
      </div>

      <div className={styles.again}>
        <Button variant="ghost" onClick={startReading}>
          ✦ 再问一个问题
        </Button>
      </div>
    </>
  );
}
