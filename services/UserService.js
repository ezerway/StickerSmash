import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

import { getDatabase } from './FirebaseService';
import { Increment } from '../constants/DateFormatTypes';

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

  if (snapshot.val() === null) {
    const newRecord = ref.push();
    newRecord.set(updateData);
    return {
      id: newRecord.key,
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
  user.liked = user.liked ? user.liked.push(currentCustomerId) : [currentCustomerId];
  getDatabase().ref(`/users/${customerId}/liked`).update(user);
}

export async function bookmarkedCustomer(currentCustomerId, customerId) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  user.liked = user.liked ? user.liked.push(currentCustomerId) : [currentCustomerId];
  getDatabase().ref(`/users/${customerId}/liked`).update(user);
}

export async function getCustomer(customerId) {
  const ref = getDatabase().ref('/users');
  const snapshot = await ref.orderByKey().equalTo(customerId).once('value');
  return snapshot.toJSON()[customerId];
}

export async function updateCustomer(currentCustomerId, customerId, data = {}) {
  if (currentCustomerId === customerId) {
    return;
  }

  const user = await getCustomer(customerId);
  for (const key in data) {
    user[key] = data[key];
  }
  getDatabase().ref(`/users/${customerId}/liked`).update(user);
}
