import { Canvas, ColorMatrix, Image } from '@shopify/react-native-skia';
import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { white } from '../../constants/Color';
import { small } from '../../constants/FontSize';

export default memo(function FilterItem({ item, image, onSelect }) {
  if (!image) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        onSelect(item);
      }}>
      <Canvas style={[styles.image]}>
        <Image width={styles.image.width} height={styles.image.height} image={image}>
          <ColorMatrix matrix={item.style} />
        </Image>
      </Canvas>
      <Text label={item.label} color={white} style={styles.text}>
        {item.label}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  text: {
    color: white,
    fontSize: small,
    paddingVertical: 5,
    width: 100,
    textAlign: 'center',
  },
});
