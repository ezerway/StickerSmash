import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { defaultImageSize } from '../../constants/ImageSize';

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  size = {},
  onPressOut,
  onLongPress,
}) {
  const source = selectedImage ? { uri: selectedImage.uri } : placeholderImageSource;
  return (
    <TouchableOpacity
      activeOpacity={false}
      delayLongPress={100}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      <Image style={[styles.image, size]} source={source} />
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
