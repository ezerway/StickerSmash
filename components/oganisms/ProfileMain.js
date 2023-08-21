import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useContext } from 'react';
import { useTailwind } from 'tailwind-rn';

import { AppContext } from '../../contexts/AppContext';
import { i18n } from '../../i18n';
import ProfileBar from '../atomics/ProfileBar';
import NewsfeedList from '../molecules/NewsfeedList';

export default function ProfileMain() {
  const tailwind = useTailwind();
  const { customerId, customerName } = useContext(AppContext);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return alert(i18n.t('YouDidntSelectAnyImage'));
    }

    const { width, height, uri } = result.assets[0];
    router.push({
      pathname: '/add-feed-modal',
      params: {
        image_uri: uri,
        width,
        height,
      },
    });
  }, []);

  const router = useRouter();

  return (
    <>
      <NewsfeedList customerId={customerId} />
      <ProfileBar onPressAdd={pickImage} label={customerName} style={tailwind('pb-4')} />
    </>
  );
}
