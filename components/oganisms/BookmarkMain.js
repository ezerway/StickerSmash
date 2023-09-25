import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { bookmarkedType } from '../../services/FeedService';
// import NewsfeedList from '../molecules/NewsfeedList';
import RnNewsfeedList from '../molecules/RnNewsfeedList';

export default function BookmarkMain() {
  const { customer } = useContext(AppContext);
  return (
    <RnNewsfeedList visitorId={customer.id} customerId={customer.id} feedType={bookmarkedType} />
  );
}
