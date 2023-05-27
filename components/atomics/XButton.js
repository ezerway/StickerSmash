import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';
import { stickerSize } from '../../constants/ImageSize';

export default memo(function XButton({ onPress, size, parentScale }) {
  const parentScaleWidth = parentScale?.value ? parentScale.value : stickerSize.width;
  const position = useDerivedValue(() => {
    return {
      bottom: -size.height / 2,
      left: parentScaleWidth - size.width / 2,
    };
  });

  return <EmojiStickButton iconType="Feather" icon="x" position={position} onPress={onPress} />;
});
