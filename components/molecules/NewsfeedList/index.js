import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import {
  bookmarkFeed,
  forkFeed,
  getFeeds,
  likeFeed,
  unbookmarkFeed,
  unlikeFeed,
} from '../../../services/FeedService';
import { saveImageUriToCache } from '../../../services/FileService';
import NewsfeedListItem from '../../atomics/NewsfeedListItem';

export default memo(function NewsfeedList({ initFeeds = [], customerId = null, isFake = false }) {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState(initFeeds);

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

  const pressFork = useCallback(
    (feed) =>
      async ({ image_url }) => {
        forkFeed(customerId, feed);
        const localImageUri = await saveImageUriToCache(image_url);
        router.push({
          pathname: '/',
          params: {
            localImageUri,
          },
        });
      },
    []
  );

  const pressLike = useCallback(
    (feed) => (liked) => liked ? likeFeed(customerId, feed) : unlikeFeed(customerId, feed),
    []
  );
  const pressBookmark = useCallback(
    (feed) => (bookmarked) =>
      bookmarked ? bookmarkFeed(customerId, feed) : unbookmarkFeed(customerId, feed),
    []
  );

  return (
    <FlashList
      ref={flashListRef}
      data={feeds}
      renderItem={({ item }) => {
        return (
          <NewsfeedListItem
            onPressLike={pressLike(item)}
            onPressBookmark={pressBookmark(item)}
            onForkPress={pressFork(item)}
            isLiked={item.liked?.includes(customerId)}
            isBookmarked={item.bookmarked?.includes(customerId)}
            isForked={item.forked?.includes(customerId)}
            feed={item}
          />
        );
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
