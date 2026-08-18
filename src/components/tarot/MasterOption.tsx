import type { Master } from '../../types';
import styles from './MasterOption.module.css';

interface MasterOptionProps {
  master: Master;
  selected: boolean;
  onSelect: () => void;
}

/** 塔罗师选择卡片 */
export function MasterOption({ master, selected, onSelect }: MasterOptionProps) {
  return (
    <button
      type="button"
      className={`${styles.master} ${selected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <span className={styles.avatar}>{master.emoji}</span>
      <h5>{master.name}</h5>
      <span className={styles.style}>{master.style}</span>
    </button>
  );
}
