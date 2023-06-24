import HomeFooter from '../components/oganisms/HomeFooter';
import HomeHeader from '../components/oganisms/HomeHeader';
import HomeMain from '../components/oganisms/HomeMain';
import PageTemplate from '../components/templates/PageTemplate';
import { HomePageContextProvider } from '../contexts/HomePageContext';

export default function Home() {
  return (
    <HomePageContextProvider>
      <PageTemplate header={<HomeHeader />} footer={<HomeFooter />}>
        <HomeMain />
      </PageTemplate>
    </HomePageContextProvider>
  );
}
