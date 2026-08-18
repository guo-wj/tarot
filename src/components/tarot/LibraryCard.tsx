import type { Card } from '../../types';
import styles from './LibraryCard.module.css';

interface LibraryCardProps {
  card: Card;
  onClick: () => void;
}

/** 牌库网格中的一张牌 */
export function LibraryCard({ card, onClick }: LibraryCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.emoji}>{card.emoji}</div>
      <div className={styles.name}>{card.name}</div>
      <div className={styles.enName}>{card.enName}</div>
    </button>
  );
}
