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
import { privateFeedsKey, userActionLogsKey } from '../constants/FirebaseKeys';
import { PlaceholderImage } from '../constants/Image';
import { defaultImageSize } from '../constants/ImageSize';

export const newsfeedType = 'newsfeedType';
export const profileType = 'profileType';
export const likedType = 'likedType';
export const bookmarkedType = 'bookmarkedType';
export const forkedType = 'forkedType';
export const trendingType = 'trendingType';

export const childKeyMap = {
  [profileType]: privateFeedsKey,
  [likedType]: userActionLogsKey,
  [bookmarkedType]: userActionLogsKey,
  [forkedType]: userActionLogsKey,
};

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
    created_at: createdAt,
    updated_at: createdAt,
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

function getFeedsByType(type = newsfeedType, childKey = null) {
  const db = getDatabase();

  if (type === profileType) {
    return db.ref('private_feeds').child(childKey).orderByChild('updated_at');
  }

  if (type === likedType) {
    return db.ref('user_action_logs').child(childKey).child('liked').orderByChild('updated_at');
  }

  if (type === bookmarkedType) {
    return db
      .ref('user_action_logs')
      .child(childKey)
      .child('bookmarked')
      .orderByChild('updated_at');
  }

  if (type === forkedType) {
    return db.ref('user_action_logs').child(childKey).child('forked').orderByChild('updated_at');
  }

  if (type === trendingType) {
    return db.ref('feed_scores').orderByChild('scored');
  }

  return db.ref('public_feeds').orderByChild('updated_at');
}

export async function getFeeds(
  childKey = null,
  isFake = false,
  feedType = newsfeedType,
  startAtKey = 0,
  limit = 2
) {
  if (isFake) {
    return fakeFeeds();
  }

  let query = await getFeedsByType(feedType, childKey);

  if (startAtKey) {
    query = query.startAt(startAtKey, 'updated_at');
  }

  query = query.limitToFirst(limit);
  const snapshot = await query.once('value');

  if (!snapshot.exists()) {
    return [];
  }

  const feedCollection = [];
  snapshot.forEach(async (e) => {
    feedCollection.push(e.val());
  });

  const feeds = [];
  for (let i = 0; i < feedCollection.length; i++) {
    const { feed_id, updated_at } = feedCollection[i];

    if (!feed_id) {
      continue;
    }

    const feedRef = getDatabase().ref('feeds');
    const snapshot = await feedRef.orderByKey().equalTo(feed_id).once('value');
    feeds.push({
      cusor: updated_at,
      feed_id,
      ...snapshot.toJSON()[feed_id],
    });
  }

  return feeds;
}

export async function addFeed(user = {}, isPublic = true, feedData = {}) {
  const userId = user.id;
  const createdAt = -moment().format(Increment);
  feedData.user_id = userId;
  feedData.created_at = createdAt;
  feedData.updated_at = createdAt;
  feedData.scored = FeedScore.Min;
  feedData[`${userId}_bookmarked`] = 0;
  feedData[`${userId}_liked`] = 0;
  feedData[`${userId}_forked`] = 0;

  if (isPublic) {
    feedData.public_at = createdAt;
  }

  const ref = getDatabase().ref('/feeds');
  const newRecord = ref.push();
  newRecord.set(feedData);

  const privateFeedsRef = getDatabase()
    .ref('/private_feeds/' + userId)
    .push();
  await privateFeedsRef.set({
    feed_id: newRecord.key,
    created_at: createdAt,
    updated_at: createdAt,
  });

  getDatabase()
    .ref('/feed_scores/' + newRecord.key)
    .set({
      feed_id: newRecord.key,
      scored: FeedScore.Min,
    });

  if (isPublic) {
    const ref = getDatabase().ref('/public_feeds').push();
    await ref.set({
      feed_id: newRecord.key,
      created_at: createdAt,
      updated_at: createdAt,
    });
  }

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
  getDatabase()
    .ref('user_action_logs/' + user_id + '/liked')
    .push({
      feed_id,
      updated_at: updatedAt,
      created_at: updatedAt,
    });

  const newScored = customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Like;

  saveFeed(feed_id, {
    scored: newScored,
    [`${customerId}_liked`]: updatedAt,
  });

  getDatabase().ref(`/feeds/${feed_id}/liked`).update(Object.assign({}, newLiked));

  getDatabase()
    .ref('/feed_scores/' + feed_id)
    .update({
      feed_id,
      scored: newScored,
    });
}

export async function bookmarkFeed(customerId, { feed_id, user_id, scored, bookmarked }) {
  bookmarkCustomer(customerId, user_id);
  const updatedAt = -moment().format(Increment);
  const newBookmarked = bookmarked || [];
  newBookmarked.push(customerId);
  getDatabase()
    .ref('user_action_logs/' + user_id + '/bookmarked')
    .push({
      feed_id,
      updated_at: updatedAt,
      created_at: updatedAt,
    });

  const newScored = customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Bookmark;
  saveFeed(feed_id, {
    scored: newScored,
    [`${customerId}_bookmarked`]: updatedAt,
  });

  getDatabase().ref(`/feeds/${feed_id}/bookmarked`).update(Object.assign({}, newBookmarked));

  getDatabase()
    .ref('/feed_scores/' + feed_id)
    .update({
      feed_id,
      scored: newScored,
    });
}

export async function unlikeFeed(customerId, { feed_id, user_id, scored, liked }) {
  unlikeCustomer(customerId, user_id);
  const newLiked = liked ? liked.filter((e) => e !== customerId) : [];
  const newScored = customerId === user_id ? scored || FeedScore.Min : scored - FeedScore.Like;
  const updateData = {
    scored: newScored,
    [`${customerId}_liked`]: 0,
  };

  if (newLiked.length) {
    getDatabase().ref(`/feeds/${feed_id}/liked`).update(Object.assign({}, newLiked));
  } else {
    updateData.liked = [];
  }

  saveFeed(feed_id, updateData);

  getDatabase()
    .ref('/feed_scores/' + feed_id)
    .update({
      feed_id,
      scored: newScored,
    });
}

export async function unbookmarkFeed(customerId, { feed_id, user_id, scored, bookmarked }) {
  unbookmarkCustomer(customerId, user_id);
  const newBookmarked = bookmarked ? bookmarked.filter((e) => e !== customerId) : [];

  const ref = getDatabase().ref('user_action_logs/' + user_id + '/bookmarked');
  const snapshot = await ref.orderByChild('feed_id').equalTo(feed_id).once('value');
  if (snapshot.exists()) {
    snapshot.forEach((e) => {
      getDatabase()
        .ref('user_action_logs')
        .child(user_id)
        .child('bookmarked')
        .child(e.key)
        .remove();
    });
  }

  const newScored = customerId === user_id ? scored || FeedScore.Min : scored - FeedScore.Bookmark;
  const updateData = {
    scored: newScored,
    [`${customerId}_bookmarked`]: 0,
  };

  if (newBookmarked.length) {
    getDatabase().ref(`/feeds/${feed_id}/bookmarked`).update(Object.assign({}, newBookmarked));
  } else {
    updateData.bookmarked = [];
  }

  saveFeed(feed_id, updateData);

  getDatabase()
    .ref('/feed_scores/' + feed_id)
    .update({
      feed_id,
      scored: newScored,
    });
}

export async function forkFeed(customerId, { feed_id, user_id, scored, forked }) {
  forkCustomer(customerId, user_id);
  const updatedAt = -moment().format(Increment);
  const newForked = forked || [];
  if (!newForked.includes(customerId)) {
    newForked.push(customerId);
    getDatabase()
      .ref('user_action_logs/' + user_id + '/forked')
      .push({
        feed_id,
        updated_at: updatedAt,
        created_at: updatedAt,
      });
  }

  const newScored = customerId === user_id ? scored || FeedScore.Min : scored + FeedScore.Fork;
  saveFeed(feed_id, {
    scored: newScored,
    [`${customerId}_forked`]: updatedAt,
  });

  getDatabase().ref(`/feeds/${feed_id}/forked`).update(Object.assign({}, newForked));

  getDatabase()
    .ref('/feed_scores/' + feed_id)
    .update({
      feed_id,
      scored: newScored,
    });
}
