import { memo } from 'react';
import { useTailwind } from 'tailwind-rn';

import ProfileBar from '../atomics/ProfileBar';

export default memo(function GuestProfileBar() {
  const tailwind = useTailwind();
  return <ProfileBar label="Guest" style={tailwind('pb-4')} />;
});
