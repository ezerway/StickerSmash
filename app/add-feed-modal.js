import { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import AddFeedModalMain from '../components/oganisms/AddFeedModalMain';
import BlankPageTemplate from '../components/templates/BlankPageTemplate';
import { textButtonColor } from '../constants/Color';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { i18n } from '../i18n';
import { requestPushNotifications } from '../services/AppService';

export default function AddFeedModal() {
  const { customerId, setCustomerId } = useContext(AppContext);
  const tailwind = useTailwind();

  if (!customerId) {
    const requestPushNotify = () => {
      requestPushNotifications().then((newCustomerId) => {
        setCustomerId(newCustomerId);
      });
    };

    return (
      <HomePageContextProvider>
        <BlankPageTemplate>
          <Pressable
            style={[tailwind('w-full h-full items-center justify-center')]}
            onPress={requestPushNotify}>
            <Text style={{ color: textButtonColor }}>{i18n.t('Access')}</Text>
          </Pressable>
        </BlankPageTemplate>
      </HomePageContextProvider>
    );
  }

  return (
    <HomePageContextProvider>
      <BlankPageTemplate>
        <AddFeedModalMain />
      </BlankPageTemplate>
    </HomePageContextProvider>
  );
}
