import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EmojiStickButton from "./EmojiStickerButton";
import { useDerivedValue } from 'react-native-reanimated';

export default function RotateButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      bottom: -size.height / 2,
      left: -size.width / 2
    }
  });
  return (
    <EmojiStickButton position={position} onPress={onPress} size={size}>
        <MaterialIcons name="rotate-right" size={size.width / 2} color="#000" />
    </EmojiStickButton>
  )
}
