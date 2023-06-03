import { memo } from 'react';
import { Text, TouchableHighlight } from 'react-native';
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
  onPress,
}) {
  const tailwind = useTailwind();
  const Icon = getIcon(iconType);

  return (
    <TouchableHighlight
      style={[
        tailwind('items-center justify-center'),
        { backgroundColor, borderColor, borderWidth, borderRadius },
        style,
      ]}
      onPress={onPress}>
      <>
        <Icon name={icon} size={size} color={color} />
        {label ? (
          <Text style={[tailwind('items-center justify-center'), { color, fontSize }]}>
            {label}
          </Text>
        ) : null}
      </>
    </TouchableHighlight>
  );
});
