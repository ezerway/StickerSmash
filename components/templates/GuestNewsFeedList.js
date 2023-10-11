import { FlashList } from '@shopify/flash-list';
import { memo, useEffect, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';

import { mainFlex } from '../../constants/Layout';
import { showResquestNotificationAlert } from '../../hooks/ResquestNotificationAlert';
import { getFeeds } from '../../services/FeedService';
import NewsfeedListItem from '../atomics/NewsfeedListItem';

export default memo(function GuestNewsfeedList() {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState([]);

  const [refreshing, setRefreshing] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setRefreshing(true);
      setFeeds(await getFeeds(null, true));
      setRefreshing(false);
      if (!isMounted) {
        return;
      }
      showResquestNotificationAlert();
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const flashListRef = useRef();
  return (
    <FlashList
      ref={flashListRef}
      data={feeds}
      renderItem={({ item }) => {
        return <NewsfeedListItem feed={item} />;
      }}
      estimatedItemSize={feedHeight}
      refreshControl={<RefreshControl tintColor="#000" refreshing={refreshing} />}
    />
  );
});
