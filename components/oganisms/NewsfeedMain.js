import { useContext } from 'react';

import { AppContext } from '../../contexts/AppContext';
// import NewsfeedList from '../molecules/NewsfeedList';
import RnNewsfeedList from '../molecules/RnNewsfeedList';

export default function NewsfeedMain() {
  const { customer } = useContext(AppContext);
  return <RnNewsfeedList visitorId={customer.id} />;
}
