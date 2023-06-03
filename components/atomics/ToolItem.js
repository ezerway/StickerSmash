import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../constants/Color';
import { small } from '../../constants/FontSize';
import { stickerSize } from '../../constants/ImageSize';
import { i18n } from '../../i18n';

export default memo(function ToolItem({
  item,
  textColor = white,
  width = 100,
  height = 100,
  onSelect = () => {},
  onClose = () => {},
}) {
  const tailwind = useTailwind();

  return (
    <Pressable
      style={[
        tailwind('flex mx-2 items-center justify-center border rounded-xl'),
        { width, height, borderColor: textColor },
      ]}
      onPress={() => {
        onSelect(item);
        onClose();
      }}>
      <MaterialCommunityIcons size={stickerSize.width} name={item.icon} color={textColor} />
      <Text
        label={item.label}
        color={textColor}
        style={[
          tailwind('text-center my-1'),
          {
            color: textColor,
            fontSize: small,
            width,
          },
        ]}>
        {i18n.t(item.label)}
      </Text>
    </Pressable>
  );
});
