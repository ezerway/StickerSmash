import * as DebugService from './DebugService';
import { registerForPushNotificationsAsync } from './PushNotificationService';
import { initCustomer } from './UserService';

export async function requestPushNotifications() {
  try {
    const token = await registerForPushNotificationsAsync();

    if (!token) {
      return;
    }

    return initCustomer(token);
  } catch (e) {
    await DebugService.addLog('requestPushNotifications error: ' + (Object.is(e) ? e.toString : e));
  }
}
