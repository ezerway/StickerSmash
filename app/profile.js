import { useContext } from 'react';

import HomeHeader from '../components/oganisms/HomeHeader';
import ProfileMain from '../components/oganisms/ProfileMain';
import GuestNewsFeedList from '../components/templates/GuestNewsFeedList';
import GuestProfileBar from '../components/templates/GuestProfileBar';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { requestPushNotifications } from '../services/AppService';

export default function Profile() {
  const { customerId, setCustomerId } = useContext(AppContext);

  if (!customerId) {
    requestPushNotifications().then((newCustomerId) => {
      setCustomerId(newCustomerId);
    });

    return (
      <HomePageContextProvider>
        <NoFooterPageTemplate header={<HomeHeader />}>
          <GuestNewsFeedList />
          <GuestProfileBar />
        </NoFooterPageTemplate>
      </HomePageContextProvider>
    );
  }

  return (
    <HomePageContextProvider>
      <NoFooterPageTemplate header={<HomeHeader />}>
        <ProfileMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
