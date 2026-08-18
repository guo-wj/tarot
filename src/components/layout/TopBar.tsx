import { useNavigation } from '../../context/NavigationContext';
import { useNewReading } from '../../hooks/useNewReading';
import { INITIAL_CREDITS } from '../../lib/constants';
import { NAV_ITEMS } from './navItems';
import styles from './TopBar.module.css';

/** 顶部导航栏：Logo、主导航、灵石余额 */
export function TopBar() {
  const { screen, navigate } = useNavigation();
  const startReading = useNewReading();

  return (
    <header className={styles.topbar}>
      <div className={styles.logo} onClick={() => navigate('home')}>
        <span className={styles.moon} />
        <span>
          Aurora<b>·塔罗</b>
        </span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.screen}
            className={screen === item.screen ? styles.active : ''}
            onClick={() => (item.startsReading ? startReading() : navigate(item.screen))}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className={styles.credits}>
        ✦ <span>{INITIAL_CREDITS}</span> 灵石
      </div>
    </header>
  );
}
