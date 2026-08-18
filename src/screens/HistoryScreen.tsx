import { useHistory } from '../context/HistoryContext';
import { useNewReading } from '../hooks/useNewReading';
import { masterEmoji } from '../data/masters';
import { SectionTitle } from '../components/ui/SectionTitle';
import styles from './HistoryScreen.module.css';

export function HistoryScreen() {
  const { records } = useHistory();
  const startReading = useNewReading();

  return (
    <>
      <SectionTitle subtitle="Aurora 会记住反复出现的主题">解读历史</SectionTitle>

      {records.length === 0 ? (
        <p className={styles.empty}>还没有解读记录。</p>
      ) : (
        records.map((record, i) => (
          <button key={i} type="button" className={styles.item} onClick={startReading}>
            <div>
              <div className={styles.question}>"{record.question}"</div>
              <div className={styles.meta}>
                {masterEmoji(record.masterName)} {record.masterName} · {record.cardCount} 张牌 ·{' '}
                {record.date}
              </div>
            </div>
            <div className={styles.minis}>
              {Array.from({ length: record.cardCount }, (_, j) => (
                <span key={j} />
              ))}
            </div>
          </button>
        ))
      )}
    </>
  );
}
