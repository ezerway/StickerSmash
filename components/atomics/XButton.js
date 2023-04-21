import { useDerivedValue } from 'react-native-reanimated';

import EmojiStickButton from './EmojiStickerButton';

export default function XButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      bottom: -size.height / 2,
      left: parentSize.width * (parentScale.value / parentSize.width) - size.width / 2,
    };
  });

  return <EmojiStickButton iconType="Feather" icon="x" position={position} onPress={onPress} />;
}
