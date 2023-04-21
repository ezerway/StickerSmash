import { Pressable, StyleSheet, Text } from 'react-native';

import { getIcon } from './Icon';
import { iconButtonColor } from '../../constants/Color';
import { iconButtonSize } from '../../constants/ImageSize';

export default function IconButton({
  label,
  icon,
  iconType,
  size = iconButtonSize.width,
  color = iconButtonColor,
  onPress,
}) {
  const Icon = getIcon(iconType);

  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Icon name={icon} size={size} color={color} />
      <Text style={[styles.iconButtonLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    marginTop: 12,
  },
});
