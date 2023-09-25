import { memo, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { showResquestNotificationAlert } from '../../hooks/ResquestNotificationAlert';
import { i18n } from '../../i18n';
import { fakeFeeds } from '../../services/FeedService';
import { getFakeTrendingCustomers } from '../../services/UserService';
import TrendingListFooterItem from '../atomics/TrendingListFooterItem';
import TrendingListHeader from '../atomics/TrendingListHeader';
import TrendingListItem from '../atomics/TrendingListItem';

export default memo(function GuestTrendingList(imageSize = { width: 70, height: 70 }) {
  const tailwind = useTailwind();
  const [trendingCustomers, setTrendingCustomers] = useState([]);
  const [trendingFeeds, setTrendingFeeds] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingCustomers(true);
    getFakeTrendingCustomers().then((customers) => {
      setTrendingCustomers(customers);
      setIsLoadingCustomers(false);
    });

    setIsLoadingFeeds(true);
    fakeFeeds(6).then((feeds) => {
      setIsLoadingFeeds(false);
      if (!isMounted) {
        return;
      }
      setTrendingFeeds(feeds);
      showResquestNotificationAlert();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <View style={tailwind('flex flex-1 my-2 bg-white')}>
        <TrendingListHeader />

        {isLoadingFeeds ? (
          <View style={tailwind('py-4')}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          trendingFeeds.map((item) => <TrendingListItem key={item.feed_id} feed={item} />)
        )}

        <View style={tailwind('block border-t border-gray-300')}>
          <Text style={tailwind('text-center text-gray-500 m-1 uppercase')}>
            {i18n.t('TopInfluencers')}
          </Text>
          <View style={tailwind('flex flex-row')}>
            {isLoadingCustomers ? (
              <View style={tailwind('flex-1')}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              trendingCustomers.map((customer) => (
                <TrendingListFooterItem customer={customer} key={customer.id} />
              ))
            )}
          </View>
        </View>
      </View>
    </>
  );
});
