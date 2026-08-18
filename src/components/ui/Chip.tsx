import type { ButtonHTMLAttributes } from 'react';
import styles from './Chip.module.css';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 是否高亮激活（如牌库筛选选中态） */
  active?: boolean;
}

export function Chip({ active = false, className, ...rest }: ChipProps) {
  const classes = [styles.chip, active ? styles.active : '', className]
    .filter(Boolean)
    .join(' ');
  return <button type="button" className={classes} {...rest} />;
}
