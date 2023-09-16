import { registerForPushNotificationsAsync } from './PushNotificationService';
import { initCustomer } from './UserService';

export async function requestPushNotifications() {
  const token = await registerForPushNotificationsAsync();

  if (!token) {
    return;
  }

  return initCustomer(token);
}
