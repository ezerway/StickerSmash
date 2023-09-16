import { memo, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { defaultBackgroundColor } from '../../../constants/Color';
import { Min } from '../../../constants/FeedScore';
import { small } from '../../../constants/FontSize';
import { iconStickerButtonSize } from '../../../constants/ImageSize';
import { i18n } from '../../../i18n';
import IconButton from '../IconButton';

export default memo(function TrendingListFooterItem({ customer = {}, onPress = () => {} }) {
  const tailwind = useTailwind();
  const [scored] = useState(Math.abs((customer.scored || Min) - Min));
  const [liked] = useState((customer.liked || []).length);
  const [forked] = useState((customer.forked || []).length);
  const [nationCode] = useState((customer.locale || 'N/A-N/A').split('-').pop());
  const [scoreIconSize] = useState(iconStickerButtonSize.width);
  const scoreFrontSize = { fontSize: small };

  return (
    <View style={tailwind('w-1/2 px-2 py-2')}>
      <Pressable onPress={onPress} key={customer.id}>
        <View style={tailwind('flex flex-row')}>
          <View style={tailwind('w-10 mr-2 self-center')}>
            <IconButton
              icon="nature-people"
              backgroundColor="transparent"
              color={defaultBackgroundColor}
            />
          </View>
          <View style={tailwind('flex flex-col')}>
            <Text style={tailwind('font-semibold')}>{customer.name || i18n.t('Anonymous')}</Text>
            <Text style={tailwind('text-gray-600')}>{nationCode}</Text>
            <Text style={[tailwind('text-gray-600'), scoreFrontSize]}>
              {scored}{' '}
              <IconButton
                backgroundColor="transparent"
                color={defaultBackgroundColor}
                size={scoreIconSize}
                icon="star"
                style={tailwind('mr-1')}
              />{' '}
              {liked}{' '}
              <IconButton
                backgroundColor="transparent"
                color={defaultBackgroundColor}
                size={scoreIconSize}
                icon="like1"
                iconType="AntDesign"
                style={tailwind('mr-1')}
              />{' '}
              {forked}{' '}
              <IconButton
                backgroundColor="transparent"
                color={defaultBackgroundColor}
                size={scoreIconSize}
                icon="code-fork"
                iconType="FontAwesome"
              />
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
});
