import { memo } from 'react';
import { useTailwind } from 'tailwind-rn';

import WideButton from './WideButton';
import { black, white, yellow } from '../../constants/Color';
import { large } from '../../constants/FontSize';

export default memo(function ShowToolButton({
  iconSize = 38,
  borderRadius = 42,
  onPress = () => {},
}) {
  const tailwind = useTailwind();
  return (
    <WideButton
      icon="add"
      color={black}
      backgroundColor={white}
      borderColor={yellow}
      iconSize={iconSize}
      borderRadius={borderRadius}
      fontSize={large}
      onPress={onPress}
      style={[tailwind('w-24 h-24 rounded-full border-4 p-2'), { borderColor: yellow }]}
    />
  );
});
