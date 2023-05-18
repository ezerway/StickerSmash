import { Canvas, ColorMatrix, Image, useImage } from '@shopify/react-native-skia';
import { Pressable, StyleSheet, Text } from 'react-native';

import { white } from '../../constants/Color';
import { small } from '../../constants/FontSize';

export default function FilterItem({ item, uri, onSelect }) {
  const image = useImage(uri);

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
}

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
