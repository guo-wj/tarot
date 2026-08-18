import type { DrawnCard } from '../../types';
import { firstKeyword } from '../../lib/draw';
import styles from './FlipCard.module.css';

interface FlipCardProps {
  card: DrawnCard;
  /** 该牌在牌阵中的位置名 */
  position: string;
  /** 是否已翻开 */
  flipped: boolean;
  onFlip: () => void;
}

/** 结果页的可翻转卡牌：背面 → 正面（含正/逆位） */
export function FlipCard({ card, position, flipped, onFlip }: FlipCardProps) {
  return (
    <div className={styles.slot}>
      <div className={styles.position}>{position}</div>
      <div className={styles.flip} onClick={onFlip}>
        <div className={`${styles.inner} ${flipped ? styles.up : ''}`}>
          <div className={`${styles.face} ${styles.back}`}>✦</div>
          <div className={`${styles.face} ${styles.front} ${card.isReversed ? styles.reversed : ''}`}>
            <div className={styles.emoji}>{card.emoji}</div>
            <div className={styles.name}>
              {card.name}
              <br />
              <span className={styles.enName}>{card.enName}</span>
            </div>
            <div className={styles.orientation}>{card.isReversed ? '逆位' : '正位'}</div>
          </div>
        </div>
      </div>
      <div className={styles.caption}>{firstKeyword(card)}</div>
    </div>
  );
}
