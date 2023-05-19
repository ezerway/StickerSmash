import { memo } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

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
  return (
    <TouchableHighlight
      style={[styles.button, { backgroundColor, borderColor, borderWidth, borderRadius }]}
      onPress={onPress}>
      <Text style={[style, { fontSize, color }]}>{label}</Text>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
