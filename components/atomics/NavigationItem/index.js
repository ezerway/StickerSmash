import { Link, usePathname } from 'expo-router';
import { memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { iconButtonColor } from '../../../constants/Color';
import { medium } from '../../../constants/FontSize';
import { iconButtonSize } from '../../../constants/ImageSize';
import { i18n } from '../../../i18n';
import { getIcon } from '../Icon';

export default memo(function NavigationItem({
  label = 'Item',
  href = '/',
  onPress = () => {},
  icon = 'trophy',
  iconType = 'MaterialIcons',
  style = {},
}) {
  const tailwind = useTailwind();
  const pathname = usePathname();
  const Icon = getIcon(iconType);

  return (
    <Link href={href} onPress={onPress(href)} asChild>
      <Pressable>
        <View
          style={[
            pathname === href ? tailwind('border-b-2 border-white') : {},
            tailwind('items-center justify-center'),
            style,
          ]}>
          <Icon name={icon} size={iconButtonSize.width} color={iconButtonColor} />
          <Text
            style={[
              tailwind('items-center justify-center'),
              { color: iconButtonColor, fontSize: medium },
            ]}>
            {i18n.t(label)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
});
