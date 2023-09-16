import * as MediaLibrary from 'expo-media-library';
import { createContext, useEffect, useState } from 'react';

import { defaultBackgroundColor } from '../constants/Color';
import { requestPushNotifications as requestPushNotify } from '../services/AppService';
import { generateName } from '../services/RandomService';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children, appCustomer }) => {
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [customer, setCustomer] = useState(appCustomer);
  const [customerName, setCustomerName] = useState(appCustomer?.name);

  const requestPushNotifications = async () => {
    const customer = await requestPushNotify();
    setCustomer(customer);
    setCustomerName(customer.name);
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
