import { useNavigation } from '../../context/NavigationContext';
import { useNewReading } from '../../hooks/useNewReading';
import { NAV_ITEMS } from './navItems';
import styles from './MobileNav.module.css';

/** 移动端底部导航栏 */
export function MobileNav() {
  const { screen, navigate } = useNavigation();
  const startReading = useNewReading();

  return (
    <nav className={styles.mobnav}>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.screen}
          className={screen === item.screen ? styles.active : ''}
          onClick={() => (item.startsReading ? startReading() : navigate(item.screen))}
        >
          <span className={styles.icon}>{item.icon}</span>
          {item.screen === 'ask' ? '占卜' : item.label}
        </button>
      ))}
    </nav>
  );
}
