import { memo } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import { getIcon } from './Icon';
import { iconButtonBackground, iconButtonColor } from '../../constants/Color';
import { medium } from '../../constants/FontSize';
import { iconButtonSize } from '../../constants/ImageSize';

export default memo(function IconButton({
  label,
  icon,
  iconType,
  size = iconButtonSize.width,
  fontSize = medium,
  borderWidth = 0,
  borderRadius = 0,
  color = iconButtonColor,
  backgroundColor = iconButtonBackground,
  borderColor = iconButtonBackground,
  style = {},
  onPress,
}) {
  const Icon = getIcon(iconType);

  return (
    <TouchableHighlight
      style={[
        styles.iconButton,
        { backgroundColor, borderColor, borderWidth, borderRadius },
        style,
      ]}
      onPress={onPress}>
      <>
        <Icon name={icon} size={size} color={color} />
        {label ? <Text style={[styles.iconButtonLabel, { color, fontSize }]}>{label}</Text> : null}
      </>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {},
});
