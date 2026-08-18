import type { Card } from '../../types';
import { Button } from '../ui/Button';
import styles from './DailyCard.module.css';

interface DailyCardProps {
  card: Card;
  onExplore: () => void;
}

/** 首页「今日之牌」卡片 */
export function DailyCard({ card, onExplore }: DailyCardProps) {
  return (
    <div className={styles.daily}>
      <div className={styles.mini}>{card.emoji}</div>
      <div>
        <span className={styles.tag}>今日之牌 · 每日免费</span>
        <h3 className={styles.name}>
          {card.name} {card.enName}
        </h3>
        <p className={styles.desc}>
          今日之牌:{card.upright}。让这份能量陪伴你度过今天。
        </p>
        <Button variant="ghost" small className={styles.cta} onClick={onExplore}>
          就这个话题深入一问 →
        </Button>
      </div>
    </div>
  );
}
