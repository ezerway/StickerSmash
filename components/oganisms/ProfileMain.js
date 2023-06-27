import { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';

import { generateName } from '../../services/RandomService';
import ProfileBar from '../atomics/ProfileBar';
import NewsfeedList from '../molecules/NewsfeedList';

export default function ProfileMain() {
  const tailwind = useTailwind();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    generateName().then((name) => setUserName(name));
  }, []);

  return (
    <>
      <NewsfeedList />
      <ProfileBar label={userName} style={tailwind('pb-4')} />
    </>
  );
}
