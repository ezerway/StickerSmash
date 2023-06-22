import * as Sharing from 'expo-sharing';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { HomePageContext } from '../../contexts/HomePageContext';
import { i18n } from '../../i18n';
import IconButton from '../atomics/IconButton';
import Navigation from '../molecules/Navigation';

export default function HomeHeader() {
  const tailwind = useTailwind();
  const { clearAll, togglePreview, toogleFlip, share, showAppOptions } =
    useContext(HomePageContext);
  const [canShare, setCanShare] = useState(null);

  useEffect(() => {
    Sharing.isAvailableAsync().then((available) => {
      setCanShare(available);
    });
  }, []);

  return (
    <View style={tailwind('flex-1 flex-row justify-around items-center')}>
      {showAppOptions ? (
        <>
          <IconButton
            iconType="MaterialCommunityIcons"
            icon="eye-outline"
            label={i18n.t('Preview')}
            onPress={togglePreview}
          />
          <IconButton
            iconType="MaterialIcons"
            icon="flip"
            label={i18n.t('Flip')}
            onPress={toogleFlip}
          />
          {canShare ? <IconButton icon="share" label={i18n.t('Share')} onPress={share} /> : null}
          <IconButton icon="home" label={i18n.t('Home')} onPress={clearAll} />
        </>
      ) : (
        <Navigation />
      )}
    </View>
  );
}
