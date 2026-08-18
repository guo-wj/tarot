import type { Screen } from '../../types';

export interface NavItem {
  /** 对应的屏幕，用于高亮当前项 */
  screen: Screen;
  label: string;
  /** 移动端底栏用的图标 */
  icon: string;
  /** 点击是否走「开始新占卜」流程（重置状态），否则普通导航 */
  startsReading?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { screen: 'home', label: '首页', icon: '🏠' },
  { screen: 'ask', label: '开始占卜', icon: '🔮', startsReading: true },
  { screen: 'library', label: '牌库', icon: '📖' },
  { screen: 'history', label: '历史', icon: '🗂️' },
];
