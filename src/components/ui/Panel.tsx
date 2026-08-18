import type { HTMLAttributes } from 'react';
import styles from './Panel.module.css';

/** 半透明磨砂玻璃面板容器 */
export function Panel({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={[styles.panel, className].filter(Boolean).join(' ')} {...rest} />;
}
