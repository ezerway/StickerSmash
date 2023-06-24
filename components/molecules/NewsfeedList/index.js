import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import { getFeeds } from '../../../services/FirebaseService';
import NewsfeedListItem from '../../atomics/NewsfeedListItem';

export default memo(function NewsfeedList() {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState([]);

  const [refreshing, setRefreshing] = useState(null);

  const onEndReached = useCallback(async () => {
    const newFeeds = await getFeeds();
    setFeeds((feeds) => feeds.concat(newFeeds));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setFeeds(await getFeeds());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      setRefreshing(true);
      setFeeds(await getFeeds());
      setRefreshing(false);
    };

    init();
  }, []);

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

  const pressFork = useCallback(({ feed_id, image_url }) => {
    router.push({
      pathname: '/',
      params: {
        feed_id,
        image_url: encodeURIComponent(image_url),
      },
    });
  }, []);

  return (
    <FlashList
      ref={flashListRef}
      data={feeds}
      renderItem={({ item }) => {
        return <NewsfeedListItem onForkPress={pressFork} feed={item} />;
      }}
      estimatedItemSize={feedHeight}
      onEndReachedThreshold={5}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl tintColor="#000" refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
});