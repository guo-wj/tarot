import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** 小尺寸 */
  small?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  ghost: styles.ghost,
};

export function Button({
  variant = 'primary',
  small = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, variantClass[variant], small ? styles.small : '', className]
    .filter(Boolean)
    .join(' ');
  return <button className={classes} {...rest} />;
}
