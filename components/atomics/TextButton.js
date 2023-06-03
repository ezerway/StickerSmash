import { memo } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { textButtonBackground, textButtonColor } from '../../constants/Color';
import { medium } from '../../constants/FontSize';

export default memo(function TextButton({
  label,
  fontSize = medium,
  borderWidth = 0,
  borderRadius = 0,
  color = textButtonColor,
  backgroundColor = textButtonBackground,
  borderColor = textButtonBackground,
  style = {},
  onPress,
}) {
  const tailwind = useTailwind();
  return (
    <TouchableHighlight
      style={[
        tailwind('w-full h-full flex-row items-center justify-center'),
        { backgroundColor, borderColor, borderWidth, borderRadius },
      ]}
      onPress={onPress}>
      <Text style={[style, { fontSize, color }]}>{label}</Text>
    </TouchableHighlight>
  );
});
