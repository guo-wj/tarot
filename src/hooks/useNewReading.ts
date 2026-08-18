import { useCallback } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useReading } from '../context/ReadingContext';

/**
 * 返回一个「开始新占卜」的动作：重置解读状态并跳转到提问页。
 * 被首页、顶栏、历史等多处复用。
 */
export function useNewReading(): () => void {
  const { navigate } = useNavigation();
  const { reset } = useReading();

  return useCallback(() => {
    reset();
    navigate('ask');
  }, [reset, navigate]);
}
