import { useContext } from 'react';

import BookmarkMain from '../components/oganisms/BookmarkMain';
import HomeHeader from '../components/oganisms/HomeHeader';
import GuestNewsFeedList from '../components/templates/GuestNewsFeedList';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { requestPushNotifications } from '../services/AppService';

export default function Bookmark() {
  const { customer, setCustomer } = useContext(AppContext);

  if (!customer) {
    requestPushNotifications().then((newCustomer) => {
      setCustomer(newCustomer);
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
        <BookmarkMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
