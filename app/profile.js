import HomeHeader from '../components/oganisms/HomeHeader';
import ProfileMain from '../components/oganisms/ProfileMain';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { HomePageContextProvider } from '../contexts/HomePageContext';

export default function Profile() {
  return (
    <HomePageContextProvider>
      <NoFooterPageTemplate header={<HomeHeader />}>
        <ProfileMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
