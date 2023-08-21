import { useContext } from 'react';

import HomeHeader from '../components/oganisms/HomeHeader';
import NewsfeedMain from '../components/oganisms/NewsfeedMain';
import GuestNewsFeedList from '../components/templates/GuestNewsFeedList';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { requestPushNotifications } from '../services/AppService';

export default function Newsfeed() {
  const { customerId, setCustomerId } = useContext(AppContext);

  if (!customerId) {
    requestPushNotifications().then((newCustomerId) => {
      setCustomerId(newCustomerId);
    });

    return (
      <HomePageContextProvider>
        <NoFooterPageTemplate header={<HomeHeader />}>
          <GuestNewsFeedList />
        </NoFooterPageTemplate>
      </HomePageContextProvider>
    );
  }

  return (
    <HomePageContextProvider>
      <NoFooterPageTemplate header={<HomeHeader />}>
        <NewsfeedMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
