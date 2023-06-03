import { memo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useTailwind } from 'tailwind-rn';

import { getIcon } from './Icon';
import { stickerButtonBackground, stickerButtonColor } from '../../constants/Color';
import { iconStickerButtonSize, stickerButtonSize } from '../../constants/ImageSize';

const AnimatedView = Animated.createAnimatedComponent(View);

export default memo(function EmojiStickButton({
  iconType,
  icon,
  iconSize = iconStickerButtonSize.width,
  size = stickerButtonSize,
  color = stickerButtonColor,
  backgroundColor = stickerButtonBackground,
  position,
  onPress,
}) {
  const tailwind = useTailwind();
  const positionStyle = useAnimatedStyle(() => {
    return {
      ...position.value,
    };
  });

  const Icon = getIcon(iconType);

  return (
    <AnimatedView style={[tailwind('absolute rounded-full'), size, positionStyle]}>
      <Pressable
        style={[
          tailwind('flex-1 items-center justify-center opacity-80 rounded-full'),
          { backgroundColor },
        ]}
        onPress={onPress}>
        <Icon name={icon} size={iconSize} color={color} />
      </Pressable>
    </AnimatedView>
  );
});
