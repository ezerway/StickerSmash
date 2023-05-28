import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';
import { stickerSize } from '../../constants/ImageSize';

export default memo(function ZoomOutButton({ onPress, size, parentScale }) {
  const position = useDerivedValue(() => {
    const parentScaleWidth = parentScale?.value ? parentScale.value : stickerSize.width;
    return {
      top: -size.height / 2,
      left: parentScaleWidth - size.width / 2,
    };
  });

  return (
    <EmojiStickButton
      iconType="MaterialIcons"
      icon="zoom-out-map"
      position={position}
      onPress={onPress}
    />
  );
});
