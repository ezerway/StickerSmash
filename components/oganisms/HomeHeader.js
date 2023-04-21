import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { HomePageContext } from '../../contexts/HomePageContext';
import { i18n } from '../../i18n';
import IconButton from '../atomics/IconButton';
import ToggleIconButton from '../atomics/ToggleIconButton';

export default function HomeHeader() {
  const { clearAll, toolePreview } = useContext(HomePageContext);

  return (
    <View style={styles.headerToolbar}>
      <ToggleIconButton
        iconType="MaterialCommunityIcons"
        icon="eye-outline"
        activeIcon="eye-off-outline"
        label={i18n.t('Preview')}
        onPress={toolePreview}
      />
      <IconButton icon="home" label={i18n.t('Home')} onPress={clearAll} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerToolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
