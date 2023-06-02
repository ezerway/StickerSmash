import * as Device from 'expo-device';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TailwindProvider } from 'tailwind-rn';

import { AppContextProvider } from '../contexts/AppContext';
import { saveCustomer } from '../services/FirebaseService';
import { registerForPushNotificationsAsync } from '../services/PushNotificationService';
import { checkAndUpdate } from '../services/UpdaterService';
import utilities from '../tailwind.json';

// This is a workaround to a reanimated issue -> https://github.com/software-mansion/react-native-reanimated/issues/3355
if (Platform.OS === 'web') {
  // eslint-disable-next-line no-underscore-dangle
  window._frameTimestamp = null;
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'web' || !Device.isDevice) {
      return;
    }

    const init = async () => {
      checkAndUpdate();
      const token = await registerForPushNotificationsAsync();

      if (!token) {
        return;
      }

      saveCustomer(token);
    };

    init();
    return () => {};
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <AppContextProvider>
        <GestureHandlerRootView style={styles.container}>
          <Slot />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </AppContextProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
