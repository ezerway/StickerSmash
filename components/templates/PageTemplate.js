import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { footerFlex, headerFlex, mainFlex } from '../../constants/Layout';

export default function PageTemplate({ header, children, footer }) {
 
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>{header}</View>
        <View style={styles.mainContainer}>{children}</View>
        <View style={styles.footerContainer}>{footer}</View>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  headerContainer: {
    flex: headerFlex,
  },
  mainContainer: {
    flex: mainFlex
  },
  footerContainer: {
    flex: footerFlex
  }
});
