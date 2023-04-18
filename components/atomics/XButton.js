import MaterialIcons from '@expo/vector-icons/Feather';
import { useDerivedValue } from 'react-native-reanimated';
import EmojiStickButton from '../molecules/EmojiStickerButton';

export default function XButton({ onPress, size, parentSize, parentScale }) {
  const position = useDerivedValue(() => {
    return {
      bottom: -size.height / 2,
      left: parentSize.width * (parentScale.value / parentSize.width) - size.width / 2
    }
  });

  return (
    <EmojiStickButton position={position} onPress={onPress} size={size}>
        <MaterialIcons name="x" size={size.width / 2} color="#000"/>
    </EmojiStickButton>
  )
}
