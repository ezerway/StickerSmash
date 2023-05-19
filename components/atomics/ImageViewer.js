import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';
import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { PlaceholderImage } from '../../constants/Image';
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

  const image = useImage(selectedImage ? selectedImage.uri : PlaceholderImage);

  if (!image) {
    return null;
  }

  return (
    <View style={transformStyle}>
      <Canvas style={[styles.canvas, size]}>
        <Image width={size.width} height={size.height} image={image}>
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
