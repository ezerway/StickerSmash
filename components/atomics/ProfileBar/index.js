import { memo } from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../../constants/Color';
import WideButton from '../../molecules/WideButton';

export default memo(function ProfileBar({
  label = 'Username',
  liked = '0',
  downloaded = '0',
  textColor = white,
  size = 25,
  style = {},
}) {
  const tailwind = useTailwind();
  return (
    <View
      style={[
        tailwind('flex-row items-center justify-center py-2 border-b border-t text-white'),
        style,
      ]}>
      <View style={tailwind('flex-1 items-center justify-between')}>
        <Text style={[tailwind('text-white'), { color: textColor }]}>{label}</Text>
      </View>
      <View style={tailwind('flex-1 flex-row items-center justify-around')}>
        <WideButton
          icon="like1"
          width={size}
          height={size}
          iconType="AntDesign"
          style={tailwind('flex-1')}
          badge={liked}
        />
        <WideButton
          icon="ios-code-download"
          width={size}
          height={size}
          iconType="Ionicons"
          style={tailwind('flex-1')}
          badge={downloaded}
        />
      </View>
    </View>
  );
});
