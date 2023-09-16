import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
import NewsfeedList from '../molecules/NewsfeedList';

export default function NewsfeedMain() {
  const { customer } = useContext(AppContext);
  return <NewsfeedList visitorId={customer.id} />;
}
