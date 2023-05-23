import database from '@react-native-firebase/database';
import * as Application from 'expo-application';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';
import { Platform } from 'react-native';

async function saveCustomer(expo_push_token) {
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

  return snapshot.ref.update(updateData);
}

export { saveCustomer };
