import { Link, usePathname } from 'expo-router';
import { memo } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { i18n } from '../../../i18n';
import IconButton from '../IconButton';

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
  return (
    <View style={[pathname === href ? tailwind('border-b-2 border-white') : {}, style]}>
      <Link href={href} onPress={onPress(href)} asChild>
        <IconButton icon={icon} iconType={iconType} label={i18n.t(label)} />
      </Link>
    </View>
  );
});
