import * as Application from 'expo-application';
import { Alert, Linking } from 'react-native';

import { i18n } from '../i18n';

let isPresent = false;

export function showResquestNotificationAlert() {
  if (isPresent) {
    return;
  }

  isPresent = true;
  Alert.alert(
    i18n.t('AppWouldLikeToSendYouNotifications', { app: Application.applicationName }),
    i18n.t('AppWouldLikeToSendYouNotificationsDesc'),
    [
      {
        text: i18n.t('DontAllow'),
        style: 'cancel',
        onPress: () => {
          isPresent = false;
        },
      },
      {
        text: i18n.t('Allow'),
        onPress: () => {
          isPresent = false;
          Linking.openSettings();
        },
      },
    ]
  );
}
