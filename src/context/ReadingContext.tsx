import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DrawnCard, SpreadCount } from '../types';
import { DEFAULT_MASTER } from '../data/masters';
import { DEFAULT_SPREAD } from '../data/spreads';

interface ReadingValue {
  question: string;
  masterName: string;
  spread: SpreadCount;
  /** 抽牌阶段已抽出的牌 */
  picks: DrawnCard[];
  setQuestion: (q: string) => void;
  setMaster: (name: string) => void;
  setSpread: (count: SpreadCount) => void;
  /** 追加一张抽出的牌 */
  addPick: (card: DrawnCard) => void;
  /** 清空已抽的牌（重新进入抽牌页时用） */
  clearPicks: () => void;
  /** 重置整次解读到初始状态 */
  reset: () => void;
}

const ReadingContext = createContext<ReadingValue | null>(null);

export function ReadingProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState('');
  const [masterName, setMaster] = useState(DEFAULT_MASTER);
  const [spread, setSpread] = useState<SpreadCount>(DEFAULT_SPREAD);
  const [picks, setPicks] = useState<DrawnCard[]>([]);

  const addPick = useCallback((card: DrawnCard) => {
    setPicks((prev) => [...prev, card]);
  }, []);

  const clearPicks = useCallback(() => setPicks([]), []);

  const reset = useCallback(() => {
    setQuestion('');
    setMaster(DEFAULT_MASTER);
    setSpread(DEFAULT_SPREAD);
    setPicks([]);
  }, []);

  const value = useMemo(
    () => ({
      question,
      masterName,
      spread,
      picks,
      setQuestion,
      setMaster,
      setSpread,
      addPick,
      clearPicks,
      reset,
    }),
    [question, masterName, spread, picks, addPick, clearPicks, reset],
  );

  return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReading(): ReadingValue {
  const ctx = useContext(ReadingContext);
  if (!ctx) throw new Error('useReading 必须在 ReadingProvider 内使用');
  return ctx;
}
