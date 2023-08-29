import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { memo, useContext } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { AppContext } from '../../contexts/AppContext';

export default memo(function BlankPageTemplate({ children }) {
  const tailwind = useTailwind();
  const { backgroundColor } = useContext(AppContext);

  return (
    <View
      style={[
        tailwind('flex-1 items-center'),
        { backgroundColor, paddingTop: Constants.statusBarHeight },
      ]}>
      {children}
      <StatusBar style="auto" />
    </View>
  );
});
