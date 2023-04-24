import { Pressable, StyleSheet, Text } from 'react-native';

import { textButtonBackground, textButtonColor } from '../../constants/Color';
import { medium } from '../../constants/FontSize';

export default function TextButton({
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
  return (
    <Pressable
      style={[styles.button, { backgroundColor, borderColor, borderWidth, borderRadius }]}
      onPress={onPress}>
      <Text style={[style, { fontSize, color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
