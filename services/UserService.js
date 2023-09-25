import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

import { getDatabase } from './FirebaseService';
import { generateName } from './RandomService';
import { Increment } from '../constants/DateFormatTypes';
import { Bookmark, Fork, Like, Min } from '../constants/FeedScore';
import { privateFeedsKey, userActionLogsKey } from '../constants/FirebaseKeys';

export async function initCustomer(expo_push_token, data = {}) {
  const ref = getDatabase().ref('/users');
  const snapshot = await ref.orderByChild('expo_push_token').equalTo(expo_push_token).once('value');
  const updateData = {
    expo_push_token,
    os: Platform.OS,
    app_version: Application.nativeApplicationVersion,
    build_version: Application.nativeBuildVersion,
    locale: getLocales()[0].languageTag,
    timezone: getCalendars()[0].timeZone,
    ...data,
    updated_at: moment().format(Increment),
  };

  if (!snapshot.exists()) {
    const newRecord = ref.push();
    const name = await generateName();
    newRecord.set(updateData);

    return {
      id: newRecord.key,
      name,
      scored: Min,
      ...updateData,
    };
  }

  const [id] = Object.keys(snapshot.toJSON());
  const user = snapshot.toJSON()[id];
  const newData = {
    ...user,
    ...updateData,
  };

  getDatabase().ref(`/users/${id}`).update(newData);

  return {
    id,
    ...newData,
  };
}

export async function likeCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  const newLiked = user.liled || [];
  newLiked.push(currentCustomerId);
  user.liked = newLiked;
  user.scored = (user.scored || Min) + Like;
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function unlikeCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  user.liked = (user.liked || []).filter((i) => i !== currentCustomerId);
  user.scored = (user.scored || Min) - Like;
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function bookmarkCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  const newBookmarked = user.bookmarked || [];
  newBookmarked.push(currentCustomerId);
  user.bookmarked = newBookmarked;
  user.scored = (user.scored || Min) + Bookmark;
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function unbookmarkCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  user.bookmarked = (user.bookmarked || []).filter((i) => i !== currentCustomerId);
  user.scored = (user.scored || Min) - Bookmark;
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function forkCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  const newForked = user.forked || [];
  newForked.push(currentCustomerId);
  user.forked = newForked;
  user.scored = (user.scored || Min) + Fork;
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function getCustomer(customerId) {
  const ref = getDatabase().ref('/users');
  const snapshot = await ref.orderByKey().equalTo(customerId).once('value');
  return snapshot.toJSON()[customerId];
}

export async function updateCustomer(currentCustomerId, customerId, data = {}) {
  if (currentCustomerId !== customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  for (const key in data) {
    user[key] = data[key];
  }
  getDatabase().ref(`/users/${customerId}`).update(user);
}

export async function getTrendingCustomers() {
  const ref = getDatabase().ref('/users');
  const snapshot = await ref.orderByChild('scored').startAt(1).limitToFirst(2).once('value');
  const users = [];
  snapshot.forEach((e) => {
    users.push({
      id: e.key,
      ...e.val(),
    });
  });
  return users;
}

export async function getFakeTrendingCustomers() {
  const users = [];
  for (let id = 1; id < 3; id++) {
    users.push({
      id,
      name: await generateName(),
      scored: Min + Math.floor(Math.random() * 1000),
      liked: new Array(Math.floor(Math.random() * 1000)),
      forked: new Array(Math.floor(Math.random() * 1000)),
      bookmarked: new Array(Math.floor(Math.random() * 1000)),
    });
  }
  return users;
}
