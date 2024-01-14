import * as Device from 'expo-device';
import * as MediaLibrary from 'expo-media-library';
import { createContext, useEffect, useState, useRef } from 'react';
import { AppState, Platform } from 'react-native';

import { defaultBackgroundColor } from '../constants/Color';
import { requestPushNotifications as requestPushNotify } from '../services/AppService';
import * as DebugService from '../services/DebugService';
import { generateName } from '../services/RandomService';
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [customer, setCustomer] = useState();
  const [customerName, setCustomerName] = useState();

  const requestPushNotifications = async () => {
    await DebugService.addLog('requestPushNotifications init');
    const customer = await requestPushNotify();
    await DebugService.addLog(
      'requestPushNotifications done. customer: ' + customer ? JSON.stringify(customer) : 'null'
    );
    if (customer) {
      setCustomer(customer);
      return setCustomerName(customer.name);
    }
    generateName().then((name) => setCustomerName(name));
  };

  useEffect(() => {
    if (Platform.OS === 'web' || !Device.isDevice) {
      return;
    }

    requestPushNotifications();
    return () => {};
  }, []);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        await requestPushNotifications();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        backgroundColor,
        mediaStatus,
        customer,
        customerName,
        setBackgroundColor,
        requestMediaPermission,
        setCustomer,
        requestPushNotifications,
        setCustomerName,
      }}>
      {children}
    </AppContext.Provider>
  );
};
