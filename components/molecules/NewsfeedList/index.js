import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { memo, useCallback, useRef, useState } from 'react';
import { RefreshControl, useWindowDimensions } from 'react-native';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import {
  bookmarkFeed,
  forkFeed,
  getFeeds,
  getFeedsByTypeOrderByChild,
  likeFeed,
  newsfeedType,
  unbookmarkFeed,
  unlikeFeed,
} from '../../../services/FeedService';
import { saveImageUriToCache } from '../../../services/FileService';
import NewsfeedListItem from '../../atomics/NewsfeedListItem';

export default memo(function NewsfeedList({
  visitorId = null,
  customerId = null,
  isFake = false,
  feedType = newsfeedType,
}) {
  const dim = useWindowDimensions();
  const [feedHeight] = useState(dim.height * mainFlex);
  const [feeds, setFeeds] = useState([]);
  const [lastItem, setLastItem] = useState({});
  const [limit] = useState(5);

  const [refreshing, setRefreshing] = useState(null);

  const fetchFeeds = useCallback(
    async (startAtValue = 0, startAtKey = 0, limit, isLoadMore = false) => {
      setRefreshing(true);
      const feedResult = await getFeeds(
        customerId,
        isFake,
        feedType,
        startAtValue,
        startAtKey,
        limit
      );

      if (feedResult.length) {
        setLastItem(feedResult[feedResult.length - 1]);
      }

      setFeeds((feeds) => (isLoadMore ? feeds.concat(feedResult) : feedResult));
      setRefreshing(false);
    },
    [customerId, isFake, feedType]
  );

  const onEndReached = useCallback(async () => {
    const orderByChild = getFeedsByTypeOrderByChild(feedType, customerId);
    fetchFeeds(lastItem[orderByChild], lastItem.feed_id, limit, true);
  }, [customerId, feedType, lastItem]);

  const onRefresh = useCallback(async () => {
    fetchFeeds(0, 0, limit);
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

  const pressFork = useCallback(
    (feed) => async () => {
      forkFeed(visitorId, feed);
      const localImageUri = await saveImageUriToCache(feed.image_url);
      router.push({
        pathname: '/',
        params: {
          localImageUri,
        },
      });
    },
    [visitorId]
  );

  const pressLike = useCallback(
    (feed) => (liked) => liked ? likeFeed(visitorId, feed) : unlikeFeed(visitorId, feed),
    [visitorId]
  );
  const pressBookmark = useCallback(
    (feed) => (bookmarked) =>
      bookmarked ? bookmarkFeed(visitorId, feed) : unbookmarkFeed(visitorId, feed),
    [visitorId]
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
            onPressFork={pressFork(item)}
            isLiked={item?.liked?.includes(visitorId)}
            isBookmarked={item?.bookmarked?.includes(visitorId)}
            isForked={item?.forked?.includes(visitorId)}
            feed={item}
          />
        );
      }}
      estimatedItemSize={feedHeight}
      onEndReachedThreshold={2.5}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl tintColor="#000" refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
});
