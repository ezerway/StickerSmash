import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';

export default memo(function ZoomOutButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      top: -size.height / 2,
      left: parentSize.width * (parentScale.value / parentSize.width) - size.width / 2,
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
