import styles from './Steps.module.css';

interface StepsProps {
  /** 总步数 */
  total: number;
  /** 当前进行到第几步（1-based，含之前所有步点亮） */
  current: number;
}

/** 顶部进度圆点 */
export function Steps({ total, current }: StepsProps) {
  return (
    <div className={styles.steps}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`${styles.dot} ${i < current ? styles.on : ''}`} />
      ))}
    </div>
  );
}
