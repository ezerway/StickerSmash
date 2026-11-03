import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { isRunningInExpoGo } from 'expo';
import { Platform } from 'react-native';

import * as DebugService from './DebugService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  await DebugService.addLog('registerForPushNotificationsAsync init');

  // Push notifications (remote notifications) are unavailable in Expo Go on Android since SDK 53.
  if (isRunningInExpoGo()) {
    await DebugService.addLog('registerForPushNotificationsAsync skipped in Expo Go');
    return `test_expo_push_token_${[
      Platform.OS,
      Platform.constants?.Brand || 'brand',
      Platform.constants?.Model || 'model',
    ].join('_')}`;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  await DebugService.addLog('getPermissionsAsync done.');
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    await DebugService.addLog('requestPermissionsAsync init ' + existingStatus);
    const { status } = await Notifications.requestPermissionsAsync();
    await DebugService.addLog('requestPermissionsAsync done ' + status);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  await DebugService.addLog('getExpoPushTokenAsync init');
  const token = isDevice
    ? (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants?.expoConfig?.extra?.eas?.projectId,
        })
      ).data
    : `test_expo_push_token_${[
        Platform.OS,
        Platform.constants?.Brand || 'brand',
        Platform.constants?.Model || 'model',
      ].join('_')}`;
  await DebugService.addLog('getExpoPushTokenAsync done.');

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
