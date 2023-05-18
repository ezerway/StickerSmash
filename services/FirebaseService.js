import database from '@react-native-firebase/database';
import { getLocales, getCalendars } from 'expo-localization';
import moment from 'moment';

async function saveCustomer(expo_push_token) {
  const ref = database().ref('/users');
  const snapshot = await ref.orderByChild('expo_push_token').equalTo(expo_push_token).once('value');

  if (snapshot.val() !== null) {
    return;
  }

  const newReference = ref.push();
  newReference.set({
    expo_push_token,
    locale: getLocales()[0].languageTag,
    timezone: getCalendars()[0].timeZone,
    updated_at: moment().toISOString(),
  });
}

export { saveCustomer };
