import { Canvas, ColorMatrix, Image } from '@shopify/react-native-skia';
import { memo, useCallback } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../constants/Color';
import { small } from '../../constants/FontSize';

export default memo(function FilterItem({
  item,
  image,
  textColor = white,
  width = 100,
  height = 100,
  onSelect,
}) {
  const tailwind = useTailwind();
  const onPress = useCallback(() => {
    onSelect(item);
  }, []);

  if (!image) {
    return <ActivityIndicator />;
  }

  return (
    <Pressable style={tailwind('mx-2')} onPress={onPress}>
      <Canvas style={{ width, height }}>
        <Image width={width} height={height} image={image}>
          <ColorMatrix matrix={item.style} />
        </Image>
      </Canvas>
      <Text
        label={item.label}
        color={textColor}
        style={[
          tailwind('text-center py-1'),
          {
            color: textColor,
            fontSize: small,
            width,
          },
        ]}>
        {item.label}
      </Text>
    </Pressable>
  );
});
