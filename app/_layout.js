import * as Device from 'expo-device';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { addChangeListener as addEzExpoShareChangeListener } from 'ez-expo-share';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TailwindProvider } from 'tailwind-rn';

import { AppContextProvider } from '../contexts/AppContext';
import { requestPushNotifications } from '../services/AppService';
import { checkAndUpdate } from '../services/UpdaterService';
import utilities from '../tailwind.json';

// This is a workaround to a reanimated issue -> https://github.com/software-mansion/react-native-reanimated/issues/3355
if (Platform.OS === 'web') {
  // eslint-disable-next-line no-underscore-dangle
  window._frameTimestamp = null;
}

export default function RootLayout() {
  const [customerId, setCustomerId] = useState();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web' || !Device.isDevice) {
      return;
    }

    const init = async () => {
      checkAndUpdate();
      const customerId = await requestPushNotifications();
      setCustomerId(customerId);
    };

    init();
    return () => {};
  }, []);

  useEffect(() => {
    const listener = addEzExpoShareChangeListener(({ image_uri }) => {
      router.replace({
        pathname: '/add-feed-modal',
        params: {
          image_uri,
        },
      });
    });

    return () => {
      listener.remove();
    };
  });

  return (
    <TailwindProvider utilities={utilities}>
      <AppContextProvider appCustomerId={customerId}>
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
