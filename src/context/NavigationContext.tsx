import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Screen } from '../types';

interface NavigationValue {
  screen: Screen;
  /** 切换屏幕并平滑滚动到顶部 */
  navigate: (screen: Screen) => void;
}

const NavigationContext = createContext<NavigationValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home');

  const navigate = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <NavigationContext.Provider value={{ screen, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavigation(): NavigationValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation 必须在 NavigationProvider 内使用');
  return ctx;
}
