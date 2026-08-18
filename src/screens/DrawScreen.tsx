import { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useReading } from '../context/ReadingContext';
import { FAN_SIZE, TIMING } from '../lib/constants';
import { drawCard } from '../lib/draw';
import { Button } from '../components/ui/Button';
import { BackLink } from '../components/ui/BackLink';
import { Steps } from '../components/ui/Steps';
import { SectionTitle } from '../components/ui/SectionTitle';
import styles from './DrawScreen.module.css';

type Phase = 'idle' | 'shuffling' | 'picking';

export function DrawScreen() {
  const { navigate } = useNavigation();
  const { spread, picks, addPick, clearPicks } = useReading();

  const [phase, setPhase] = useState<Phase>('idle');
  /** 已被选走的扇面牌索引 */
  const [pickedIndexes, setPickedIndexes] = useState<number[]>([]);

  // 进入抽牌页时清空上一次的抽牌
  useEffect(() => {
    clearPicks();
    setPhase('idle');
    setPickedIndexes([]);
  }, [clearPicks]);

  const startShuffle = () => {
    setPhase('shuffling');
    setTimeout(() => setPhase('picking'), TIMING.shuffle);
  };

  const pick = (index: number) => {
    if (picks.length >= spread || pickedIndexes.includes(index)) return;
    setPickedIndexes((prev) => [...prev, index]);
    addPick(drawCard());
  };

  // 抽满后跳转结果页
  useEffect(() => {
    if (phase === 'picking' && picks.length === spread) {
      const timer = setTimeout(() => navigate('result'), TIMING.afterPick);
      return () => clearTimeout(timer);
    }
  }, [phase, picks.length, spread, navigate]);

  const isPicking = phase === 'picking';

  return (
    <>
      <Steps total={4} current={3} />
      <SectionTitle
        center
        subtitle={isPicking ? `点击卡牌选择,共需 ${spread} 张` : '深呼吸,在心中默念你的问题'}
      >
        {isPicking ? '凭直觉抽牌' : '静心洗牌'}
      </SectionTitle>

      <div className={styles.stage}>
        {!isPicking && (
          <>
            <div className={`${styles.deck} ${phase === 'shuffling' ? styles.shuffling : ''}`}>
              <div className={styles.back}>✦</div>
            </div>
            <div className={styles.shuffleWrap}>
              <Button onClick={startShuffle} disabled={phase === 'shuffling'}>
                {phase === 'shuffling' ? '洗牌中…' : '🌀 洗牌'}
              </Button>
            </div>
          </>
        )}

        {isPicking && (
          <>
            <div className={styles.fan}>
              {Array.from({ length: FAN_SIZE }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.card} ${pickedIndexes.includes(i) ? styles.picked : ''}`}
                  onClick={() => pick(i)}
                >
                  ✦
                </button>
              ))}
            </div>
            <p className={styles.pickInfo}>
              已抽 {picks.length} / {spread} 张
            </p>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <BackLink onClick={() => navigate('spread')}>← 上一步</BackLink>
      </div>
    </>
  );
}
