import { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';

export default memo(function ZoomInButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      top: -size.height / 2,
      left: -size.width / 2,
    };
  });

  return (
    <EmojiStickButton
      iconType="MaterialCommunityIcons"
      icon="arrow-collapse"
      position={position}
      onPress={onPress}
    />
  );
});
