import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { memo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { footerFlex, headerFlex, mainFlex } from '../../constants/Layout';
import { AppContext } from '../../contexts/AppContext';

export default memo(function PageTemplate({ header, children, footer }) {
  const { backgroundColor } = useContext(AppContext);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerContainer}>{header}</View>
      <View style={styles.mainContainer}>{children}</View>
      <View style={styles.footerContainer}>{footer}</View>
      <StatusBar style="auto" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  headerContainer: {
    flex: headerFlex,
    width: '100%',
  },
  mainContainer: {
    flex: mainFlex,
    width: '100%',
  },
  footerContainer: {
    flex: footerFlex,
    width: '100%',
  },
});
