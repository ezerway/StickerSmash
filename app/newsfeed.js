import HomeHeader from '../components/oganisms/HomeHeader';
import NewsfeedMain from '../components/oganisms/NewsfeedMain';
import NoFooterPageTemplate from '../components/templates/NoFooterPageTemplate';
import { HomePageContextProvider } from '../contexts/HomePageContext';

export default function Newsfeed() {
  return (
    <HomePageContextProvider>
      <NoFooterPageTemplate header={<HomeHeader />}>
        <NewsfeedMain />
      </NoFooterPageTemplate>
    </HomePageContextProvider>
  );
}
