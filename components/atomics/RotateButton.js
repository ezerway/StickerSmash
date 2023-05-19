import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';

export default memo(function RotateButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      bottom: -size.height / 2,
      left: -size.width / 2,
    };
  });

  return (
    <EmojiStickButton
      iconType="MaterialIcons"
      icon="rotate-right"
      position={position}
      onPress={onPress}
    />
  );
});
