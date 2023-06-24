import database from '@react-native-firebase/database';
import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

import { generateName, randomDate } from './RandomService';
import { defaultImageSize } from '../constants/ImageSize';
import { PlaceholderImage } from '../constants/Image';

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
    return ref.push().set(updateData);
  }

  const [id] = Object.keys(snapshot.toJSON());
  return database().ref(`/users/${id}`).update(updateData);
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

export async function getFeeds() {
  return fakeFeeds();
}
