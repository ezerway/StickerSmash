import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

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
  position,
  onPress,
}) {
  const positionStyle = useAnimatedStyle(() => {
    return {
      ...position.value,
    };
  });

  const Icon = getIcon(iconType);
  const borderRadius = size.width / 2;

  return (
    <AnimatedView mo style={[styles.buttonContainer, { borderRadius }, size, positionStyle]}>
      <Pressable style={[styles.button, { borderRadius }]} onPress={onPress}>
        <Icon name={icon} size={iconSize} color={color} />
      </Pressable>
    </AnimatedView>
  );
});

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stickerButtonBackground,
    opacity: 0.8,
  },
});
