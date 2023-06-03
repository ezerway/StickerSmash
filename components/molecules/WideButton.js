import { memo } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { textButtonBackground, textButtonColor } from '../../constants/Color';
import { medium } from '../../constants/FontSize';
import { iconButtonSize } from '../../constants/ImageSize';
import IconButton from '../atomics/IconButton';
import TextButton from '../atomics/TextButton';

export default memo(function WideButton({
  width = 320,
  height = 68,
  label,
  icon,
  iconType,
  iconSize = iconButtonSize.width,
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
    <View style={[tailwind('mx-4 items-center justify-center'), { width, height }, style]}>
      {icon ? (
        <IconButton
          icon={icon}
          color={color}
          size={iconSize}
          backgroundColor={backgroundColor}
          label={label}
          borderColor={borderColor}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          iconType={iconType}
          onPress={onPress}
          fontSize={fontSize}
          style={tailwind('w-full h-full flex-row')}
        />
      ) : (
        <TextButton
          color={color}
          backgroundColor={backgroundColor}
          label={label}
          borderColor={borderColor}
          borderWidth={borderWidth}
          borderRadius={borderRadius}
          iconType={iconType}
          onPress={onPress}
          fontSize={fontSize}
        />
      )}
    </View>
  );
});
