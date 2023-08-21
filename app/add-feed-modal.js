import { useContext } from 'react';
import { Pressable, Text } from 'react-native';

import AddFeedModalMain from '../components/oganisms/AddFeedModalMain';
import BlankPageTemplate from '../components/templates/BlankPageTemplate';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { i18n } from '../i18n';
import { requestPushNotifications } from '../services/AppService';

export default function AddFeedModal() {
  const { customerId, setCustomerId } = useContext(AppContext);

  if (!customerId) {
    const requestPushNotify = () => {
      requestPushNotifications().then((newCustomerId) => {
        setCustomerId(newCustomerId);
      });
    };

    return (
      <HomePageContextProvider>
        <BlankPageTemplate>
          <Pressable onPress={requestPushNotify}>
            <Text>{i18n.t('Access')}</Text>
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
