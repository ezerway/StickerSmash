import { StyleSheet, View } from 'react-native';

import {
  iconButtonBackground,
  iconButtonColor,
  textButtonBackground,
  textButtonColor,
} from '../../constants/Color';
import { medium } from '../../constants/FontSize';
import { iconButtonSize } from '../../constants/ImageSize';
import IconButton from '../atomics/IconButton';
import TextButton from '../atomics/TextButton';

export default function WideButton({
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
  return (
    <View style={[styles.buttonContainer, style]}>
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
          style={styles.button}
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
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
});
