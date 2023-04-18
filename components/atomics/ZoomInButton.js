import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EmojiStickButton from '../molecules/EmojiStickerButton';
import { useDerivedValue } from 'react-native-reanimated';

export default function ZoomInButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      top: -size.height / 2,
      left: -size.width / 2
    }
  });

  return (
    <EmojiStickButton position={position} onPress={onPress} size={size}>
        <MaterialIcons name="arrow-collapse" size={size.width / 2} color="#000" />
    </EmojiStickButton>
  )
}
