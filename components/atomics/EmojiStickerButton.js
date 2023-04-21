import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { getIcon } from './Icon';
import { stickerButtonBackground, stickerButtonColor } from '../../constants/Color';
import { iconStickerButtonSize, stickerButtonSize } from '../../constants/ImageSize';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiStickButton({
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
      ...withSpring(position.value).current,
    };
  });

  const Icon = getIcon(iconType);

  return (
    <AnimatedView style={[styles.buttonContainer, size, positionStyle]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name={icon} size={iconSize} color={color} />
      </Pressable>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    borderRadius: '50%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: stickerButtonBackground,
    opacity: 0.8,
  },
});
