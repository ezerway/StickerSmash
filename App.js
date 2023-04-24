import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { defaultBackgroundColor } from './constants/Color';
import { AppContext } from './contexts/AppContext';
import HomePage from './pages/HomePage';

// This is a workaround to a reanimated issue -> https://github.com/software-mansion/react-native-reanimated/issues/3355
if (Platform.OS === 'web') {
  // eslint-disable-next-line no-underscore-dangle
  window._frameTimestamp = null;
}

export default function App() {
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();

  if (!mediaStatus) {
    requestMediaPermission();
  }

  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);

  return (
    <AppContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,
      }}>
      <GestureHandlerRootView style={styles.container}>
        <HomePage />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
