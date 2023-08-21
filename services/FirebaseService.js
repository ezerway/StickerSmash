import database from '@react-native-firebase/database';
import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

import { generateName, randomDate } from './RandomService';
import { PlaceholderImage } from '../constants/Image';
import { defaultImageSize } from '../constants/ImageSize';

export async function saveCustomer(expo_push_token) {
  const ref = database().ref('/users');
  const snapshot = await ref.orderByChild('expo_push_token').equalTo(expo_push_token).once('value');
  const updateData = {
    expo_push_token,
    os: Platform.OS,
    app_version: Application.nativeApplicationVersion,
    build_version: Application.nativeBuildVersion,
    locale: getLocales()[0].languageTag,
    timezone: getCalendars()[0].timeZone,
    updated_at: moment().toISOString(),
  };

  if (snapshot.val() === null) {
    const newRecord = ref.push();
    newRecord.set(updateData);
    return newRecord.key;
  }

  const [id] = Object.keys(snapshot.toJSON());
  database().ref(`/users/${id}`).update(updateData);
  return id;
}

export async function getStickers() {
  const ref = database().ref('/stickers');
  const stickers = await ref.orderByChild('added').once('value');
  const object = stickers.toJSON();
  return Object.values(object);
}

const fakeFeed = async () => {
  const response = await fetch(PlaceholderImage);
  return {
    feed_id: Math.floor(Math.random() * 1000),
    size: defaultImageSize,
    image_url: response.url,
    author: await generateName(),
    user_id: Math.floor(Math.random() * 1000),
    created_at: randomDate().toISOString(),
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

  const ref = database().ref('/feeds');
  const snapshot = user_id
    ? await ref.orderByChild('user_id').equalTo(user_id).once('value')
    : await ref.orderByChild('created_at').once('value');

  if (!snapshot || !snapshot.val()) {
    return [];
  }

  const object = snapshot.toJSON();
  return Object.values(object);
}

export async function addFeed(feedData, isPublic = true) {
  feedData.is_public = isPublic ? 1 : 0;
  const ref = database().ref('/feeds');
  const newRecord = ref.push();
  newRecord.set(feedData);
  return newRecord.key;
}
