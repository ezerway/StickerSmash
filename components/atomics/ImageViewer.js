import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { defaultImageSize } from '../../constants/ImageSize';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  size = {},
  flipMode = 0,
  onPressOut,
  onLongPress,
}) {
  const source = selectedImage ? { uri: selectedImage.uri } : placeholderImageSource;

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: flipMode ? -1 : 1,
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={false}
      delayLongPress={100}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      <AnimatedImage style={[styles.image, size, transformStyle]} source={source} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: defaultImageSize.width,
    height: '100%',
    borderRadius: 0,
  },
});
