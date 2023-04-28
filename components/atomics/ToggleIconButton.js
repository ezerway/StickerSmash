import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import { getIcon } from './Icon';
import { iconButtonColor } from '../../constants/Color';
import { iconButtonSize } from '../../constants/ImageSize';

export default function ToggleIconButton({
  label,
  iconType,
  icon,
  activeIcon,
  size = iconButtonSize.width,
  color = iconButtonColor,
  onPress,
}) {
  const [active, setActive] = useState(false);

  const toogleActive = useCallback(() => {
    setActive((value) => !value);
    onPress();
  }, []);

  const Icon = getIcon(iconType);

  return (
    <TouchableHighlight style={styles.iconButton} onPress={toogleActive}>
      <Icon name={active ? activeIcon : icon} size={size} color={color} />
      <Text style={[styles.iconButtonLabel, { color }]}>{label}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {},
});
