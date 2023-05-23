import { Canvas, ColorMatrix, Image, useCanvasRef } from '@shopify/react-native-skia';
import { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image as CoreImage,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { defaultImageSize } from '../../constants/ImageSize';

const View = Animated.createAnimatedComponent(Pressable);

export default memo(function ImageViewer({
  selectedImage,
  filterStyle,
  size,
  flipMode = 0,
  previewMode,
}) {
  const canvasRef = useCanvasRef();
  const [base64Image, setBase64Image] = useState(null);
  const [isWeb] = useState(Platform.OS === 'web');
  const [isIos] = useState(Platform.OS === 'ios');

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: flipMode ? -1 : 1,
        },
      ],
    };
  });

  useEffect(() => {
    if (!selectedImage || !canvasRef.current || previewMode) {
      return;
    }

    const rect = isWeb
      ? {
          x: 0,
          y: 0,
          width: size.width,
          height: size.height,
        }
      : null;
    const image = canvasRef.current?.makeImageSnapshot(rect);
    const base64 = image.encodeToBase64();
    setBase64Image({ uri: `data:image/png;base64,${base64}` });
  }, [filterStyle]);

  if (!selectedImage) {
    return <ActivityIndicator />;
  }

  if (isIos) {
    return (
      <View style={transformStyle}>
        <Canvas ref={canvasRef} style={[styles.canvas, size]}>
          <Image x={0} y={0} width={size.width} height={size.height} image={selectedImage}>
            {filterStyle ? <ColorMatrix matrix={filterStyle} /> : null}
          </Image>
        </Canvas>
      </View>
    );
  }

  return (
    <View style={transformStyle}>
      <Canvas
        ref={canvasRef}
        style={[
          styles.canvas,
          size,
          {
            position: base64Image ? 'absolute' : 'relative',
            left: base64Image ? -10000 : 0,
          },
        ]}>
        <Image x={0} y={0} width={size.width} height={size.height} image={selectedImage}>
          {filterStyle ? <ColorMatrix matrix={filterStyle} /> : null}
        </Image>
      </Canvas>

      {base64Image ? <CoreImage style={[size]} source={base64Image} /> : null}
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
