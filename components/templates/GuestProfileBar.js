import { memo, useCallback } from 'react';
import { useTailwind } from 'tailwind-rn';

import { showResquestNotificationAlert } from '../../hooks/ResquestNotificationAlert';
import ProfileBar from '../atomics/ProfileBar';

export default memo(function GuestProfileBar() {
  const tailwind = useTailwind();

  const onClick = useCallback(() => {
    showResquestNotificationAlert();
  }, []);

  return (
    <ProfileBar label="Guest" onPressAdd={onClick} onPressName={onClick} style={tailwind('pb-4')} />
  );
});
