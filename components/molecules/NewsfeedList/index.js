import { FlashList } from '@shopify/flash-list';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import { getFeeds } from '../../../services/FirebaseService';
import NewsfeedListItem from '../../atomics/NewsfeedListItem';

export default memo(function NewsfeedList({ initFeeds = [], customerId = null, isFake = false }) {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState(initFeeds);
  const [isForking, setIsForking] = useState(false);

  const [refreshing, setRefreshing] = useState(null);

  const onEndReached = useCallback(async () => {
    const newFeeds = await getFeeds(customerId, isFake);
    setFeeds((feeds) => feeds.concat(newFeeds));
  }, [customerId, isFake]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setFeeds(await getFeeds(customerId, isFake));
    setRefreshing(false);
  }, [customerId]);

  useEffect(() => {
    const init = async () => {
      setRefreshing(true);
      setFeeds(await getFeeds(customerId, isFake));
      setRefreshing(false);
    };

    init();
  }, [customerId]);

  useEffect(() => {
    if (!initFeeds.length) {
      return;
    }

    setFeeds((currentFeeds) => {
      const currentFeedIds = currentFeeds.map((f) => f.feed_id);
      const newFeeds = initFeeds.filter((feed) => !currentFeedIds.includes(feed.feed_id));
      return [...newFeeds, ...currentFeeds];
    });
  }, [initFeeds]);

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

  const pressFork = useCallback(({ image_url }) => {
    setIsForking(true);
    const localImageUri = FileSystem.cacheDirectory + 'temp.png';
    FileSystem.downloadAsync(image_url, localImageUri)
      .then(() => {
        setIsForking(false);
        router.push({
          pathname: '/',
          params: {
            localImageUri,
          },
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <FlashList
      ref={flashListRef}
      data={feeds}
      renderItem={({ item }) => {
        return <NewsfeedListItem isForking={isForking} onForkPress={pressFork} feed={item} />;
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
