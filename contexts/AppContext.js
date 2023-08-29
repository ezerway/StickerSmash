import * as MediaLibrary from 'expo-media-library';
import { createContext, useEffect, useState } from 'react';

import { defaultBackgroundColor } from '../constants/Color';
import { requestPushNotifications as requestPushNotify } from '../services/AppService';
import { generateName } from '../services/RandomService';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children, appCustomerId, appCustomerName = null }) => {
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [customerId, setCustomerId] = useState(appCustomerId);
  const [customerName, setCustomerName] = useState(appCustomerName);

  const requestPushNotifications = async () => {
    const customerId = await requestPushNotify();
    setCustomerId(customerId);
  };

  useEffect(() => {
    if (customerName) {
      return;
    }

    generateName().then((name) => setCustomerName(name));
  }, [customerName]);

  return (
    <AppContext.Provider
      value={{
        backgroundColor,
        mediaStatus,
        customerId,
        customerName,
        setBackgroundColor,
        requestMediaPermission,
        setCustomerId,
        requestPushNotifications,
        setCustomerName,
      }}>
      {children}
    </AppContext.Provider>
  );
};
