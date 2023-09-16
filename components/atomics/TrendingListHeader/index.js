import moment from 'moment';
import { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { defaultBackgroundColor } from '../../../constants/Color';
import { iconStickerButtonSize } from '../../../constants/ImageSize';
import { i18n } from '../../../i18n';
import IconButton from '../IconButton';

export default memo(function TrendingListHeader() {
  const tailwind = useTailwind();
  const [now] = useState(moment().format('lll'));
  const [scoreIconSize] = useState(iconStickerButtonSize.width);

  return (
    <View style={tailwind('flex flex-row bg-gray-200 px-2 py-2')}>
      <Text style={tailwind('w-5/12 text-gray-700 text-left text-red-700')}>{now}</Text>
      <View style={tailwind('w-5/12 flex flex-row justify-end items-center')}>
        <View style={tailwind('w-8 flex-row justify-center items-center')}>
          <IconButton
            backgroundColor="transparent"
            color={defaultBackgroundColor}
            size={scoreIconSize}
            icon="like1"
            iconType="AntDesign"
          />
        </View>
        <View style={tailwind('w-8 flex-row justify-center items-center')}>
          <IconButton
            backgroundColor="transparent"
            color={defaultBackgroundColor}
            size={scoreIconSize}
            icon="bookmark"
            iconType="FontAwesome"
          />
        </View>
        <View style={tailwind('w-8 flex-row justify-center items-center')}>
          <IconButton
            backgroundColor="transparent"
            color={defaultBackgroundColor}
            size={scoreIconSize}
            icon="code-fork"
            iconType="FontAwesome"
          />
        </View>
        <View style={tailwind('w-8 flex-row justify-center items-center')}>
          <IconButton
            backgroundColor="transparent"
            color={defaultBackgroundColor}
            size={scoreIconSize}
            icon="activity"
            iconType="Feather"
          />
        </View>
      </View>
      <View style={tailwind('w-1/6 flex-row justify-end items-center')}>
        <IconButton
          backgroundColor="transparent"
          color={defaultBackgroundColor}
          size={scoreIconSize}
          icon="star"
        />
        <Text style={tailwind('text-gray-700 text-right')}>{i18n.t('Score')}</Text>
      </View>
    </View>
  );
});
