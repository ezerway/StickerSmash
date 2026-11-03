import { memo } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

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
  textStyle = {},
  onPress,
}) {
  const tailwind = useTailwind();

  let effectiveIcon = icon;
  let effectiveIconType = iconType;
  if (iconType === 'AntDesign') {
    if (icon === 'like1') {
      effectiveIcon = 'thumbs-up';
      effectiveIconType = 'FontAwesome';
    } else if (icon === 'like2') {
      effectiveIcon = 'thumbs-o-up';
      effectiveIconType = 'FontAwesome';
    }
  }

  const Icon = getIcon(effectiveIconType);
  const flattenedStyle = StyleSheet.flatten(style);
  const flexDirection = flattenedStyle?.flexDirection || 'column';

  return (
    <TouchableHighlight
      style={[
        tailwind('items-center justify-center'),
        { backgroundColor, borderColor, borderWidth, borderRadius },
        style,
      ]}
      onPress={onPress}>
      <View style={[tailwind('items-center justify-center'), { flexDirection }]}>
        <Icon name={effectiveIcon} size={size} color={color} />
        {label ? (
          <Text style={[tailwind('items-center justify-center'), { color, fontSize }, textStyle]}>
            {label}
          </Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );
});
