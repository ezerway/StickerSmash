import database from '@react-native-firebase/database';
import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

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
  return stickers.toJSON();
}
