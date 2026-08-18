import { useNavigation } from '../context/NavigationContext';
import { useReading } from '../context/ReadingContext';
import { SPREADS } from '../data/spreads';
import { Button } from '../components/ui/Button';
import { BackLink } from '../components/ui/BackLink';
import { Steps } from '../components/ui/Steps';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SpreadOption } from '../components/tarot/SpreadOption';
import styles from './SpreadScreen.module.css';

export function SpreadScreen() {
  const { navigate } = useNavigation();
  const { spread, setSpread } = useReading();

  return (
    <>
      <Steps total={4} current={2} />
      <SectionTitle center subtitle="不同牌阵适合不同深度的问题">
        选择一个牌阵
      </SectionTitle>

      <div className={styles.spreads}>
        {SPREADS.map((s) => (
          <SpreadOption
            key={s.count}
            spread={s}
            selected={spread === s.count}
            onSelect={() => setSpread(s.count)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <BackLink onClick={() => navigate('ask')}>← 上一步</BackLink>
        <Button onClick={() => navigate('draw')}>下一步:洗牌抽牌 →</Button>
      </div>
    </>
  );
}
