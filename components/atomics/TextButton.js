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
  textStyle = {},
  onPress,
}) {
  const tailwind = useTailwind();
  return (
    <TouchableHighlight
      style={[
        tailwind('w-full h-full flex-row items-center justify-center'),
        { backgroundColor, borderColor, borderWidth, borderRadius },
        style,
      ]}
      onPress={onPress}>
      <Text style={[textStyle, { fontSize, color }]}>{label}</Text>
    </TouchableHighlight>
  );
});
