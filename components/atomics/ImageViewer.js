import { Canvas, ColorMatrix, Image } from '@shopify/react-native-skia';
import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { defaultImageSize } from '../../constants/ImageSize';

const View = Animated.createAnimatedComponent(Pressable);

export default memo(function ImageViewer({ selectedImage, filterStyle, size, flipMode = 0 }) {
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: flipMode ? -1 : 1,
        },
      ],
    };
  });

  if (!selectedImage) {
    return null;
  }

  return (
    <View style={transformStyle}>
      <Canvas style={[styles.canvas, size]}>
        <Image x={0} y={0} width={size.width} height={size.height} image={selectedImage}>
          {filterStyle ? <ColorMatrix matrix={filterStyle} /> : null}
        </Image>
      </Canvas>
    </View>
  );
});

const styles = StyleSheet.create({
  canvas: {},
  image: {
    width: defaultImageSize.width,
    height: '100%',
    borderRadius: 0,
  },
});
