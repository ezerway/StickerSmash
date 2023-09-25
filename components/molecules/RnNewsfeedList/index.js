import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshControl, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import useBus from 'use-bus';

import { mainFlex } from '../../../constants/Layout';
import { i18n } from '../../../i18n';
import {
  bookmarkFeed,
  forkFeed,
  getFeeds,
  likeFeed,
  newsfeedType,
  unbookmarkFeed,
  unlikeFeed,
} from '../../../services/FeedService';
import IconButton from '../../atomics/IconButton';
import NewsfeedListItem from '../../atomics/NewsfeedListItem';

export default memo(function RnNewsfeedList({
  visitorId = null,
  customerId = null,
  isFake = false,
  feedType = newsfeedType,
}) {
  const [feeds, setFeeds] = useState([]);
  const [lastItem, setLastItem] = useState({});
  const [limit] = useState(5);

  const [refreshing, setRefreshing] = useState(null);
  const [isReachEnd, setIsReachEnd] = useState(null);

  const fetchFeeds = useCallback(
    async (startAtKey = 0, limit, isLoadMore = false) => {
      setRefreshing(true);
      const feedResult = await getFeeds(customerId, isFake, feedType, startAtKey, limit);

      if (feedResult.length) {
        setLastItem(feedResult[feedResult.length - 1]);
      } else {
        setIsReachEnd(true);
      }

      setFeeds((feeds) => (isLoadMore ? feeds.concat(feedResult) : feedResult));
      setRefreshing(false);
    },
    [customerId, isFake, feedType]
  );

  const onEndReached = useCallback(async () => {
    if (refreshing || isReachEnd) {
      return;
    }
    fetchFeeds(lastItem.cusor, limit, true);
  }, [refreshing, isReachEnd, customerId, feedType, lastItem]);

  const onRefresh = useCallback(async () => {
    setIsReachEnd(null);
    fetchFeeds(0, limit);
  }, []);

  useEffect(() => {
    setIsReachEnd(null);
    fetchFeeds(0, limit);
  }, [limit]);

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
      router.push({
        pathname: '/',
        params: {
          remoteImageUri: feed.image_url,
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

  const pressAdd = useCallback(async () => {
    router.push({
      pathname: '/add-feed-modal',
      params: {},
    });
  }, [visitorId]);

  const dim = useWindowDimensions();

  const EmptyComponent = useMemo(() => {
    return (
      <IconButton
        style={[{ height: dim.height * mainFlex }]}
        onPress={pressAdd}
        label={i18n.t('Add')}
        icon="add"
      />
    );
  }, []);

  return (
    <FlatList
      ref={flashListRef}
      data={feeds}
      refreshing={refreshing}
      renderItem={({ item, index }) => {
        return (
          <NewsfeedListItem
            key={index}
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
      ListFooterComponent={refreshing ? <ActivityIndicator size="small" /> : null}
      ListEmptyComponent={EmptyComponent}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl tintColor="#000" refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
});
