import styles from './Starfield.module.css';

/** 固定在背景的两层闪烁星空 */
export function Starfield() {
  return (
    <>
      <div className={styles.stars} aria-hidden />
      <div className={styles.stars2} aria-hidden />
    </>
  );
}
