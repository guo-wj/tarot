import { useNavigation } from '../context/NavigationContext';
import { useNewReading } from '../hooks/useNewReading';
import { useDailyCard } from '../hooks/useDailyCard';
import { FEATURES } from '../data/features';
import { Button } from '../components/ui/Button';
import { SectionTitle } from '../components/ui/SectionTitle';
import { DailyCard } from '../components/tarot/DailyCard';
import styles from './HomeScreen.module.css';

export function HomeScreen() {
  const { navigate } = useNavigation();
  const startReading = useNewReading();
  const dailyCard = useDailyCard();

  return (
    <>
      <h1 className={styles.hero}>
        聆听宇宙的<span>低语</span>
      </h1>
      <p className={styles.sub}>
        向你的 AI 塔罗师提出困惑,抽取属于此刻的牌阵。每一次解读都结合你的问题、牌义与过往,给出温柔而深刻的指引。
      </p>

      <div className={styles.cta}>
        <Button onClick={startReading}>✦ 开始一次占卜</Button>
      </div>

      <DailyCard card={dailyCard} onExplore={startReading} />

      <SectionTitle className={styles.gridTitle}>你可以这样使用 Aurora</SectionTitle>
      <div className={styles.grid}>
        {FEATURES.map((f) => (
          <button
            key={f.title}
            type="button"
            className={styles.fcard}
            onClick={() => (f.target === 'reading' ? startReading() : navigate(f.target))}
          >
            <div className={styles.ico}>{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </button>
        ))}
      </div>

      <p className={styles.footnote}>
        这是一个交互原型 (prototype)。牌面与解读为演示内容,用于展示完整的占卜流程与界面。
      </p>
    </>
  );
}
