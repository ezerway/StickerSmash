import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppContextProvider } from './contexts/AppContext';
import { i18n } from './i18n';
import HomePage from './pages/HomePage';
import { saveCustomer } from './services/FirebaseService';
import { registerForPushNotificationsAsync } from './services/PushNotificationService';

// This is a workaround to a reanimated issue -> https://github.com/software-mansion/react-native-reanimated/issues/3355
if (Platform.OS === 'web') {
  // eslint-disable-next-line no-underscore-dangle
  window._frameTimestamp = null;
}

export default function App() {
  const eventListener = (event) => {
    if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE) {
      return;
    }

    Alert.alert(
      i18n.t('UpdateApp'),
      `${i18n.t(`VersionIsNowAvaiable`, { version: event.manifest.runtimeVersion })} ${i18n.t(
        `WouldYouLikeToUpdateItNow`
      )}`,
      [
        {
          text: i18n.t('Later'),
          style: 'cancel',
        },
        {
          text: i18n.t('UpdateNow'),
          onPress: () => Updates.reloadAsync(),
        },
      ]
    );
  };

  Updates.useUpdateEvents(eventListener);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      saveCustomer(token);
    });
    return () => {};
  }, []);

  return (
    <AppContextProvider>
      <GestureHandlerRootView style={styles.container}>
        <HomePage />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
