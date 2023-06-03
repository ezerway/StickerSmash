import { memo } from 'react';
import { useTailwind } from 'tailwind-rn';

import WideButton from './WideButton';
import { black, white, yellow } from '../../constants/Color';
import { large } from '../../constants/FontSize';
import { i18n } from '../../i18n';

export default memo(function ChoseAPhotoButton({
  borderWidth = 4,
  borderRadius = 18,
  onPress = () => {},
}) {
  const tailwind = useTailwind();
  return (
    <WideButton
      label={i18n.t('ChooseAPhoto')}
      icon="photo-library"
      color={black}
      backgroundColor={white}
      borderColor={yellow}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      fontSize={large}
      onPress={onPress}
      style={tailwind('flex-row items-center')}
    />
  );
});
