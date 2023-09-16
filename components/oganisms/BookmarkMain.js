import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { bookmarkedType } from '../../services/FeedService';
import NewsfeedList from '../molecules/NewsfeedList';

export default function BookmarkMain() {
  const { customer } = useContext(AppContext);
  return (
    <NewsfeedList visitorId={customer.id} customerId={customer.id} feedType={bookmarkedType} />
  );
}
