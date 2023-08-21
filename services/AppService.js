import { saveCustomer } from './FirebaseService';
import { registerForPushNotificationsAsync } from './PushNotificationService';

export async function requestPushNotifications() {
  const token = await registerForPushNotificationsAsync();

  if (!token) {
    return;
  }

  const customerId = await saveCustomer(token);
  return customerId;
}
