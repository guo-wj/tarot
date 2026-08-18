import type { ReactNode } from 'react';
import type { Screen as ScreenId } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import styles from './Screen.module.css';

interface ScreenProps {
  /** 该屏幕的 id；与当前导航匹配时才渲染 */
  id: ScreenId;
  children: ReactNode;
}

/** 屏幕容器：仅在被激活时挂载，并带淡入动画 */
export function Screen({ id, children }: ScreenProps) {
  const { screen } = useNavigation();
  if (screen !== id) return null;
  return <section className={styles.screen}>{children}</section>;
}
