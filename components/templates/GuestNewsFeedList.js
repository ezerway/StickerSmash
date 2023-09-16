import { FlashList } from '@shopify/flash-list';
import { memo, useEffect, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';

import { mainFlex } from '../../constants/Layout';
import { getFeeds } from '../../services/FeedService';
import NewsfeedListItem from '../atomics/NewsfeedListItem';

export default memo(function GuestNewsfeedList() {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState([]);

  const [refreshing, setRefreshing] = useState(null);

  useEffect(() => {
    const init = async () => {
      setRefreshing(true);
      setFeeds(await getFeeds(null, true));
      setRefreshing(false);
    };

    init();
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
