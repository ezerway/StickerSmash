import moment from 'moment';

import { getDatabase } from './FirebaseService';
import { generateName, randomDate } from './RandomService';
import {
  bookmarkCustomer,
  forkCustomer,
  likeCustomer,
  unbookmarkCustomer,
  unlikeCustomer,
} from './UserService';
import { Increment } from '../constants/DateFormatTypes';
import * as FeedScore from '../constants/FeedScore';
import { PlaceholderImage } from '../constants/Image';
import { defaultImageSize } from '../constants/ImageSize';

export const newsfeedType = 'newsfeedType';
export const profileType = 'profileType';
export const likedType = 'likedType';
export const bookmarkedType = 'bookmarkedType';
export const forkedType = 'forkedType';
export const trendingType = 'trendingType';

const fakeFeed = async () => {
  const response = await fetch(PlaceholderImage);
  const userId = Math.floor(Math.random() * 1000);
  const createdAt = -randomDate().format(Increment);
  return {
    feed_id: Math.floor(Math.random() * 1000),
    size: defaultImageSize,
    image_url: response.url,
    author: await generateName(),
    user_id: userId,
    public_at: createdAt,
    [`${userId}_created_at`]: createdAt,
    [`${userId}_updated_at`]: createdAt,
    [`${userId}_public_at`]: createdAt,
    scored: FeedScore.Min + Math.floor(Math.random() * 1000),
    liked: Array(Math.floor(Math.random() * 1000)),
    bookmarked: Array(Math.floor(Math.random() * 1000)),
    forked: Array(Math.floor(Math.random() * 1000)),
  };
};

export async function fakeFeeds(size = 10) {
  const arr = [];

  for (let index = 0; index < size; index++) {
    arr.push(await fakeFeed());
  }

  return arr;
}

export function getFeedsByTypeOrderByChild(type = newsfeedType, userId = null) {
  if (type === profileType) {
    return `${userId}_created_at`;
  }

  if (type === likedType) {
    return `${userId}_liked`;
  }

  if (type === bookmarkedType) {
    return `${userId}_bookmarked`;
  }

  if (type === forkedType) {
    return `${userId}_forked`;
  }

  if (type === trendingType) {
    return 'scored';
  }

  return `public_at`;
}

function getFeedsByType(type = newsfeedType, userId = null) {
  const ref = getDatabase().ref('/feeds');
  const orderByChild = getFeedsByTypeOrderByChild(type, userId);

  if (type === profileType) {
    return ref.orderByChild(orderByChild);
  }

  if (type === likedType) {
    return ref.orderByChild(orderByChild).endAt(-1);
  }

  if (type === bookmarkedType) {
    return ref.orderByChild(orderByChild).endAt(-1);
  }

  if (type === forkedType) {
    return ref.orderByChild(orderByChild).endAt(-1);
  }

  if (type === trendingType) {
    return ref.orderByChild(orderByChild).startAt(1);
  }

  return ref.orderByChild(orderByChild).endAt(-1);
}

export async function getFeeds(
  userId = null,
  isFake = false,
  feedType = newsfeedType,
  startAtValue = 0,
  startAtKey = 0,
  limit = 2
) {
  if (isFake) {
    return fakeFeeds();
  }

  let query = await getFeedsByType(feedType, userId);

  if (startAtKey && startAtValue) {
    query = query.startAt(startAtValue, startAtKey);
  }

  query = query.limitToFirst(limit);
  const snapshot = await query.once('value');
  if (!snapshot || !snapshot.val()) {
    return [];
  }

  const feeds = [];
  snapshot.forEach((e, index) => {
    if (startAtKey && startAtValue && index === 0) {
      return;
    }

    feeds.push({
      feed_id: e.key,
      ...e.val(),
    });
  });

  return feeds;
}

export async function addFeed(customerId, isPublic = true, feedData = {}) {
  const createdAt = -moment().format(Increment);
  feedData.user_id = customerId;
  feedData[`${customerId}_created_at`] = createdAt;
  feedData[`${customerId}_updated_at`] = createdAt;
  feedData[`${customerId}_bookmarked`] = 0;
  feedData[`${customerId}_liked`] = 0;
  feedData[`${customerId}_forked`] = 0;
  feedData.scored = FeedScore.Min;

  if (isPublic) {
    feedData.public_at = createdAt;
    feedData[`${customerId}_public_at`] = createdAt;
  } else {
    feedData.public_at = 0;
  }

  const ref = getDatabase().ref('/feeds');
  const newRecord = ref.push();
  newRecord.set(feedData);
  return newRecord.key;
}

export async function saveFeed(id, data = {}) {
  const updatedAt = -moment().format(Increment);
  const updateData = {
    ...data,
    updated_at: updatedAt,
  };

  getDatabase().ref(`/feeds/${id}`).update(updateData);
  return id;
}

export async function likeFeed(customerId, { feed_id, user_id, scored, liked }) {
  likeCustomer(customerId, user_id);
  const updatedAt = -moment().format(Increment);
  const newLiked = liked || [];
  newLiked.push(customerId);

  return saveFeed(feed_id, {
    scored: customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Like,
    liked: newLiked,
    [`${customerId}_liked`]: updatedAt,
  });
}

export async function bookmarkFeed(customerId, { feed_id, user_id, scored, bookmarked }) {
  bookmarkCustomer(customerId, user_id);
  const updatedAt = -moment().format(Increment);
  const newBookmarked = bookmarked || [];
  newBookmarked.push(customerId);
  return saveFeed(feed_id, {
    scored: customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Bookmark,
    bookmarked: newBookmarked,
    [`${customerId}_bookmarked`]: updatedAt,
  });
}

export async function unlikeFeed(customerId, { feed_id, user_id, scored, liked }) {
  unlikeCustomer(customerId, user_id);
  const newLiked = liked ? liked.filter((e) => e !== customerId) : [];
  return saveFeed(feed_id, {
    scored: customerId === user_id ? scored || FeedScore.Min : scored - FeedScore.Like,
    liked: newLiked,
    [`${customerId}_liked`]: 0,
  });
}

export async function unbookmarkFeed(customerId, { feed_id, user_id, scored, bookmarked }) {
  unbookmarkCustomer(customerId, user_id);
  const newBookmarked = bookmarked ? bookmarked.filter((e) => e !== customerId) : [];
  return saveFeed(feed_id, {
    scored: customerId === user_id ? scored || FeedScore.Min : scored - FeedScore.Bookmark,
    bookmarked: newBookmarked,
    [`${customerId}_bookmarked`]: 0,
  });
}

export async function forkFeed(customerId, { feed_id, user_id, scored, forked }) {
  forkCustomer(customerId, user_id);
  const updatedAt = -moment().format(Increment);
  const newForked = forked || [];
  if (!newForked.includes(customerId)) {
    newForked.push(customerId);
  }
  return saveFeed(feed_id, {
    scored: customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Fork,
    forked: newForked,
    [`${customerId}_forked`]: updatedAt,
  });
}
