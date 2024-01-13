import * as Device from 'expo-device';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { addChangeListener as addEzExpoShareChangeListener } from 'ez-expo-share';
import { useEffect, useRef, useState } from 'react';
import { AppState, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TailwindProvider } from 'tailwind-rn';

import { AppContextProvider } from '../contexts/AppContext';
import { DebugContextProvider } from '../contexts/DebugContext';
import { DebugContextProvider } from '../contexts/DebugContext';
import { requestPushNotifications } from '../services/AppService';
import * as DebugService from '../services/DebugService';
import * as DebugService from '../services/DebugService';
import { initImageCacheFolder, saveImageUriToCache } from '../services/FileService';
import { checkAndUpdate } from '../services/UpdaterService';
import utilities from '../tailwind.json';

// This is a workaround to a reanimated issue -> https://github.com/software-mansion/react-native-reanimated/issues/3355
if (Platform.OS === 'web') {
  // eslint-disable-next-line no-underscore-dangle
  window._frameTimestamp = null;
}

export default function RootLayout() {
  const [customer, setCustomer] = useState();
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === 'web' || !Device.isDevice) {
      return;
    }

    DebugService.addLog('before init');
    const init = async () => {
      DebugService.addLog('init');
      const customer = await requestPushNotifications();
      DebugService.addLog('init -> customer -> ' + JSON.stringify(customer));
      setCustomer(customer);
      DebugService.addLog('init -> customer -> checkAndUpdate');
      checkAndUpdate();
      DebugService.addLog('init -> customer -> checkAndUpdate done.');
    };

    init();
    return () => {};
  }, []);

  useEffect(() => {
    initImageCacheFolder();

    const listener = addEzExpoShareChangeListener(async ({ image_uri }) => {
      if (!image_uri || image_uri === 'null') {
        return;
      }

      const localImageUri = await saveImageUriToCache(image_uri);
      router.replace({
        pathname: '/add-feed-modal',
        params: {
          image_uri: localImageUri,
        },
      });
    });

    return () => {
      listener.remove();
    };
  }, []);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const customer = await requestPushNotifications();
        setCustomer(customer);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <TailwindProvider utilities={utilities}>
      <DebugContextProvider>
        <AppContextProvider appCustomer={customer}>
          <GestureHandlerRootView style={styles.container}>
            <Slot />
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </AppContextProvider>
      </DebugContextProvider>
      <DebugContextProvider>
        <AppContextProvider appCustomer={customer}>
          <GestureHandlerRootView style={styles.container}>
            <Slot />
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </AppContextProvider>
      </DebugContextProvider>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
