import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EmojiStickButton from '../molecules/EmojiStickerButton';
import { useDerivedValue } from 'react-native-reanimated';

export default function ZoomOutButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      top: -size.height / 2,
      left: parentSize.width * (parentScale.value / parentSize.width)  - size.width / 2
    }
  });
  return (
    <EmojiStickButton position={position} onPress={onPress} size={size}>
        <MaterialIcons name="zoom-out-map" size={size.width / 2} color="#000" />
    </EmojiStickButton>
  )
}
