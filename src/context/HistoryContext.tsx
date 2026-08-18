import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { ReadingRecord } from '../types';
import { INITIAL_HISTORY } from '../data/history';

interface HistoryValue {
  records: ReadingRecord[];
  /** 在最前面插入一条记录 */
  addRecord: (record: ReadingRecord) => void;
}

const HistoryContext = createContext<HistoryValue | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<ReadingRecord[]>(INITIAL_HISTORY);

  const addRecord = useCallback((record: ReadingRecord) => {
    setRecords((prev) => [record, ...prev]);
  }, []);

  return (
    <HistoryContext.Provider value={{ records, addRecord }}>
      {children}
    </HistoryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHistory(): HistoryValue {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory 必须在 HistoryProvider 内使用');
  return ctx;
}
