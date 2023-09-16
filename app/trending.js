import { useContext } from 'react';

import HomeHeader from '../components/oganisms/HomeHeader';
import TrendingMain from '../components/oganisms/TrendingMain';
import GuestTrendingList from '../components/templates/GuestTrendingList';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { AppContext } from '../contexts/AppContext';
import { HomePageContextProvider } from '../contexts/HomePageContext';
import { requestPushNotifications } from '../services/AppService';

export default function Trending() {
  const { customer, setCustomer } = useContext(AppContext);

  if (!customer) {
    requestPushNotifications().then((newCustomer) => {
      setCustomer(newCustomer);
    });

    return (
      <HomePageContextProvider>
        <NoFooterPageTemplate header={<HomeHeader />}>
          <GuestTrendingList />
        </NoFooterPageTemplate>
      </HomePageContextProvider>
    );
  }

  return (
    <HomePageContextProvider>
      <NoFooterPageTemplate header={<HomeHeader />}>
        <TrendingMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
