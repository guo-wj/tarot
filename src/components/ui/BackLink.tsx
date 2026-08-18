import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './BackLink.module.css';

interface BackLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** 「← 返回 / 上一步」文字链接 */
export function BackLink({ children, className, ...rest }: BackLinkProps) {
  return (
    <button
      type="button"
      className={[styles.link, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
