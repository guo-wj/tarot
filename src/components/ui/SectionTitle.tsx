import type { ReactNode } from 'react';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  children: ReactNode;
  /** 副标题（小字说明） */
  subtitle?: ReactNode;
  /** 居中显示 */
  center?: boolean;
  className?: string;
}

export function SectionTitle({ children, subtitle, center, className }: SectionTitleProps) {
  const classes = [styles.title, center ? styles.center : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <h2 className={classes}>
      {children}
      {subtitle && <small>{subtitle}</small>}
    </h2>
  );
}
