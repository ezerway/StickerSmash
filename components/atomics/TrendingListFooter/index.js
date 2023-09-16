import { memo } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { i18n } from '../../../i18n';
import TrendingListFooterItem from '../TrendingListFooterItem';

export default memo(function TrendingListFooter({ trendingCustomers = [], onPress = () => {} }) {
  const tailwind = useTailwind();

  if (!trendingCustomers.length) {
    return null;
  }

  return (
    <View style={tailwind('block border-t border-gray-300')}>
      <Text style={tailwind('text-center text-gray-500 m-1 uppercase')}>
        {i18n.t('TopInfluencers')}
      </Text>
      <View style={tailwind('flex flex-row')}>
        {trendingCustomers.map((customer) => (
          <TrendingListFooterItem customer={customer} onPress={onPress} key={customer.id} />
        ))}
      </View>
    </View>
  );
});
