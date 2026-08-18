import { useMemo, useState } from 'react';
import type { Arcana, Card } from '../types';
import { DECK } from '../data/deck';
import { Chip } from '../components/ui/Chip';
import { Modal } from '../components/ui/Modal';
import { SectionTitle } from '../components/ui/SectionTitle';
import { LibraryCard } from '../components/tarot/LibraryCard';
import styles from './LibraryScreen.module.css';

type Filter = 'all' | Arcana;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'major', label: '大阿卡纳' },
  { key: 'minor', label: '小阿卡纳' },
];

export function LibraryScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Card | null>(null);

  const cards = useMemo(
    () => DECK.filter((c) => filter === 'all' || c.arcana === filter),
    [filter],
  );

  return (
    <>
      <SectionTitle subtitle="78 张韦特牌,点击查看含义">塔罗牌库</SectionTitle>

      <div className={styles.filterBar}>
        {FILTERS.map((f) => (
          <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </Chip>
        ))}
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <LibraryCard key={card.enName} card={card} onClick={() => setSelected(card)} />
        ))}
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailEmoji}>{selected.emoji}</div>
            <h3 className={styles.detailName}>{selected.name}</h3>
            <p className={styles.detailEn}>{selected.enName}</p>
            <div className={styles.meaning}>
              <span className={styles.upLabel}>正位</span>
              <p>{selected.upright}</p>
            </div>
            <div className={styles.meaning}>
              <span className={styles.rvLabel}>逆位</span>
              <p>{selected.reversed}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
