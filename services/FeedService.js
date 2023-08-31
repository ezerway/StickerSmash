import moment from 'moment';

import { getDatabase } from './FirebaseService';
import { generateName, randomDate } from './RandomService';
import { Increment } from '../constants/DateFormatTypes';
import * as FeedScore from '../constants/FeedScore';
import { PlaceholderImage } from '../constants/Image';
import { defaultImageSize } from '../constants/ImageSize';

const fakeFeed = async () => {
  const response = await fetch(PlaceholderImage);
  const userId = Math.floor(Math.random() * 1000);
  const createdAt = randomDate().format(Increment);
  return {
    feed_id: Math.floor(Math.random() * 1000),
    size: defaultImageSize,
    image_url: response.url,
    author: await generateName(),
    user_id: userId,
    created_at: createdAt,
    public_at: createdAt,
    private_at: -1,
    [`${userId}_public_at`]: createdAt,
    [`${userId}_private_at`]: -1,
    scored: Math.floor(Math.random() * 1000),
  };
};

const fakeFeeds = async () => {
  const arr = [];

  for (let index = 0; index < 10; index++) {
    arr.push(await fakeFeed());
  }

  return arr;
};

export async function getFeeds(user_id = null, isFake = false) {
  if (isFake) {
    return fakeFeeds();
  }

  const ref = getDatabase().ref('/feeds');
  const snapshot = user_id
    ? await ref.orderByChild(`${user_id}_private_at`).once('value')
    : await ref.orderByChild(`public_at`).startAt(0).once('value');

  if (!snapshot || !snapshot.val()) {
    return [];
  }

  const object = snapshot.toJSON();
  return Object.values(object);
}

export async function getProfileFeeds(user_id = null, isFake = false) {
  if (isFake) {
    return fakeFeeds();
  }

  const ref = getDatabase().ref('/feeds');
  const snapshot = ref.orderByChild(`${user_id}_public_at`).once('value');

  if (!snapshot || !snapshot.val()) {
    return [];
  }

  const object = snapshot.toJSON();
  return Object.values(object);
}

export async function addFeed(customerId, isPublic = true, feedData = {}) {
  const createdAt = moment().format(Increment);
  feedData.user_id = customerId;
  feedData.created_at = createdAt;
  feedData.updated_at = createdAt;

  if (isPublic) {
    feedData.scored = 0;
    feedData.public_at = createdAt;
    feedData.private_at = -1;
    feedData[`${customerId}_public_at`] = createdAt;
    feedData[`${customerId}_private_at`] = -1;
  } else {
    feedData.scored = -1;
    feedData.public_at = -1;
    feedData.private_at = createdAt;
    feedData[`${customerId}_public_at`] = -1;
    feedData[`${customerId}_private_at`] = createdAt;
  }

  const ref = getDatabase().ref('/feeds');
  const newRecord = ref.push();
  newRecord.set(feedData);
  return newRecord.key;
}

export async function saveFeed(id, data = {}) {
  const updatedAt = moment().format(Increment);
  const updateData = {
    ...data,
    updated_at: updatedAt,
  };

  getDatabase().ref(`/feeds/${id}`).update(updateData);
  return id;
}

export async function likeFeed(customerId, { feed_id, customer_id, scored, liked }) {
  return saveFeed(feed_id, {
    scored: customerId === customer_id ? scored || 0 : scored + FeedScore.Like,
    liked: liked ? liked.push(customerId) : [customerId],
    [`${customerId}_liked`]: 1,
  });
}

export async function bookmarkFeed(customerId, { feed_id, customer_id, scored, bookmarked }) {
  return saveFeed(feed_id, {
    scored: customerId === customer_id ? scored || 0 : scored + FeedScore.Bookmark,
    bookmarked: bookmarked ? bookmarked.push(customerId) : [customerId],
    [`${customerId}_bookmarked`]: 1,
  });
}

export async function unlikeFeed(customerId, { feed_id, customer_id, scored, liked }) {
  const newLiked = liked ? liked.filter((e) => e !== customerId) : [];
  return saveFeed(feed_id, {
    scored: customerId === customer_id ? scored || 0 : scored - FeedScore.Like,
    liked: newLiked,
    [`${customerId}_liked`]: 0,
  });
}

export async function unbookmarkFeed(customerId, { feed_id, customer_id, scored, bookmarked }) {
  const newBookmarked = bookmarked ? bookmarked.filter((e) => e !== customerId) : [];
  return saveFeed(feed_id, {
    scored: customerId === customer_id ? scored || 0 : scored - FeedScore.Bookmark,
    bookmarked: newBookmarked,
    [`${customerId}_bookmarked`]: 0,
  });
}

export async function forkFeed(customerId, { feed_id, customer_id, scored, forked }) {
  return saveFeed(feed_id, {
    scored: customerId === customer_id ? scored || 0 : scored + FeedScore.Fork,
    forked: forked ? forked.push(customerId) : [],
  });
}

export async function getTrendingFeeds() {
  const ref = getDatabase().ref('/feeds');
  const snapshot = await ref.orderByChild('scored').startAt(1).once('value');

  if (!snapshot || !snapshot.val()) {
    return [];
  }

  const object = snapshot.toJSON();
  return Object.values(object);
}
