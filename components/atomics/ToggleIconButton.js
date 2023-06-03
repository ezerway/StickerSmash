import { memo, useCallback, useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { getIcon } from './Icon';
import { iconButtonColor } from '../../constants/Color';
import { iconButtonSize } from '../../constants/ImageSize';

export default memo(function ToggleIconButton({
  label,
  iconType,
  icon,
  activeIcon,
  size = iconButtonSize.width,
  color = iconButtonColor,
  onPress,
}) {
  const tailwind = useTailwind();
  const [active, setActive] = useState(false);

  const toogleActive = useCallback(() => {
    setActive((value) => !value);
    onPress();
  }, []);

  const Icon = getIcon(iconType);

  return (
    <TouchableHighlight style={tailwind('items-center justify-center')} onPress={toogleActive}>
      <>
        <Icon name={active ? activeIcon : icon} size={size} color={color} />
        <Text style={[{ color }]}>{label}</Text>
      </>
    </TouchableHighlight>
  );
});
