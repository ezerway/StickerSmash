import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { memo, useContext } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { footerFlex, headerFlex, mainFlex } from '../../constants/Layout';
import { AppContext } from '../../contexts/AppContext';

export default memo(function NoFooterPageTemplate({ header, children }) {
  const tailwind = useTailwind();
  const { backgroundColor } = useContext(AppContext);

  return (
    <View
      style={[
        tailwind('flex-1 items-center'),
        { backgroundColor, paddingTop: Constants.statusBarHeight },
      ]}>
      <View style={[tailwind('w-full'), { flex: headerFlex }]}>{header}</View>
      <View style={[tailwind('w-full'), { flex: mainFlex + footerFlex }]}>{children}</View>
      <StatusBar style="auto" />
    </View>
  );
});
