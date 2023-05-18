import * as MediaLibrary from 'expo-media-library';
import { createContext, useState } from 'react';

import { defaultBackgroundColor } from '../constants/Color';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);

  return (
    <AppContext.Provider
      value={{
        backgroundColor,
        mediaStatus,
        setBackgroundColor,
        requestMediaPermission,
      }}>
      {children}
    </AppContext.Provider>
  );
};
