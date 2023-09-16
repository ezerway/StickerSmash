import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { trendingType } from '../../services/FeedService';
import TrendingList from '../molecules/TrendingList';

export default function TrendingMain() {
  const { customer } = useContext(AppContext);
  return <TrendingList visitorId={customer.id} customerId={customer.id} feedType={trendingType} />;
}
