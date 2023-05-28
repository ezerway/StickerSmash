import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';
import { stickerSize } from '../../constants/ImageSize';

export default memo(function DuplicateButton({ onPress, size, parentScale }) {
  const position = useDerivedValue(() => {
    const parentScaleWidth = parentScale?.value ? parentScale.value : stickerSize.width;
    return {
      top: -size.height / 2,
      left: parentScaleWidth / 2 - size.width / 2,
    };
  });

  return (
    <EmojiStickButton iconType="Ionicons" icon="duplicate" position={position} onPress={onPress} />
  );
});
