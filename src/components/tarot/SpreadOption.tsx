import type { Spread } from '../../types';
import styles from './SpreadOption.module.css';

interface SpreadOptionProps {
  spread: Spread;
  selected: boolean;
  onSelect: () => void;
}

/** 牌阵选择卡片，含张数示意图 */
export function SpreadOption({ spread, selected, onSelect }: SpreadOptionProps) {
  return (
    <button
      type="button"
      className={`${styles.spread} ${selected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.diagram}>
        {Array.from({ length: spread.count }, (_, i) => (
          <span key={i} className={styles.slot} />
        ))}
      </div>
      <h4>{spread.title}</h4>
      <p>{spread.desc}</p>
    </button>
  );
}
