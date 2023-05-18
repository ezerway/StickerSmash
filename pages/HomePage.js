import HomeFooter from '../components/oganisms/HomeFooter';
import HomeHeader from '../components/oganisms/HomeHeader';
import HomeMain from '../components/oganisms/HomeMain';
import PageTemplate from '../components/templates/PageTemplate';
import { HomePageContextProvider, HomePageContext } from '../contexts/HomePageContext';

export default function HomePage() {
  return (
    <HomePageContextProvider>
      <HomePageContext.Consumer>
        {(value) => (
          <PageTemplate
            header={value.showAppOptions ? <HomeHeader /> : null}
            footer={<HomeFooter />}>
            <HomeMain />
          </PageTemplate>
        )}
      </HomePageContext.Consumer>
    </HomePageContextProvider>
  );
}
