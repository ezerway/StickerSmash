import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import { getFeeds, trendingType } from '../../../services/FeedService';
import { getTrendingCustomers } from '../../../services/UserService';
import TrendingListFooter from '../../atomics/TrendingListFooter';
import TrendingListHeader from '../../atomics/TrendingListHeader';
import TrendingListItem from '../../atomics/TrendingListItem';

export default memo(function TrendingList({
  visitorId = null,
  customerId = null,
  isFake = false,
  feedType = trendingType,
}) {
  const tailwind = useTailwind();
  const [feedHeight] = useState(mainFlex / 5.5);
  const [feeds, setFeeds] = useState([]);
  const [trendingCustomers, setTrendingCustomers] = useState([]);

  const [refreshing, setRefreshing] = useState(null);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setFeeds(await getFeeds(customerId, isFake, feedType, 0, 6));
    setTrendingCustomers(await getTrendingCustomers());
    setRefreshing(false);
  }, [customerId]);

  useEffect(() => {
    onRefresh();
  }, [customerId]);

  const flashListRef = useRef();

  useBus(
    'SCROLL_TO_TOP',
    (data) => {
      flashListRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    },
    []
  );

  const router = useRouter();

  const pressViewItem = useCallback(
    (feed) => async () => {
      router.push({
        pathname: '/view-feed',
        params: {
          feed,
        },
      });
    },
    []
  );

  return (
    <FlashList
      contentContainerStyle={tailwind('bg-white')}
      ref={flashListRef}
      data={feeds}
      renderItem={({ item }) => {
        return <TrendingListItem onPress={pressViewItem(item)} feed={item} />;
      }}
      estimatedItemSize={feedHeight}
      refreshControl={
        <RefreshControl tintColor="#000" refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={<TrendingListHeader />}
      ListFooterComponent={<TrendingListFooter trendingCustomers={trendingCustomers} />}
    />
  );
});
