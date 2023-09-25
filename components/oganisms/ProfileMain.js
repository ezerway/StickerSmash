import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useContext, useState } from 'react';
import { useTailwind } from 'tailwind-rn';

import { AppContext } from '../../contexts/AppContext';
import { i18n } from '../../i18n';
import { profileType } from '../../services/FeedService';
import { updateCustomer } from '../../services/UserService';
import ProfileBar from '../atomics/ProfileBar';
import AddUserNameList from '../molecules/AddUserNameList';
import FooterPicker from '../molecules/FooterPicker';
// import NewsfeedList from '../molecules/NewsfeedList';
import RnNewsfeedList from '../molecules/RnNewsfeedList';

export default function ProfileMain() {
  const tailwind = useTailwind();
  const { customer, customerName, setCustomerName } = useContext(AppContext);

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

  const [showAddUserNameModal, setShowAddUserNameModal] = useState(false);

  const onCloseAddUserNameModal = useCallback(
    ({ text }) => {
      setShowAddUserNameModal(false);
      if (!text) {
        return;
      }

      if (!customer.id) {
        return;
      }

      if (customer.name === text) {
        return;
      }

      setCustomerName(text);
      updateCustomer(customer.id, customer.id, { name: text });
    },
    [customer.id]
  );

  const onPressName = useCallback(() => {
    setShowAddUserNameModal(true);
  }, []);

  return (
    <>
      {/* <NewsfeedList customerId={customer.id} visitorId={customer.id} feedType={profileType} /> */}
      <RnNewsfeedList customerId={customer.id} visitorId={customer.id} feedType={profileType} />
      <ProfileBar
        onPressAdd={pickImage}
        onPressName={onPressName}
        label={customerName}
        style={tailwind('pb-4')}
        downloaded={String((customer.downloaded || []).length)}
        liked={String((customer.liked || []).length)}
      />
      <FooterPicker
        label={i18n.t('DisplayName')}
        visible={showAddUserNameModal}
        onClose={onCloseAddUserNameModal}>
        <AddUserNameList
          name={customerName}
          onClose={onCloseAddUserNameModal}
          onSelect={onCloseAddUserNameModal}
        />
      </FooterPicker>
    </>
  );
}
