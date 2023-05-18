import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { PlaceholderImage } from '../../constants/Image';
import { defaultImageSize } from '../../constants/ImageSize';
import { HomePageContext } from '../../contexts/HomePageContext';

export default function SkiaImage() {
  const { selectedImage, selectedFilter, editingBox } = useContext(HomePageContext);

  const image = useImage(selectedImage ? selectedImage.uri : PlaceholderImage);

  if (!image) {
    return null;
  }

  return (
    <Canvas style={[styles.canvas, { width: editingBox.width, height: editingBox.height }]}>
      <Image width={editingBox.width} height={editingBox.height} image={image}>
        {selectedFilter?.style ? <ColorMatrix matrix={selectedFilter?.style} /> : null}
      </Image>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {},
  image: {
    width: defaultImageSize.width,
    height: '100%',
    borderRadius: 0,
  },
});
