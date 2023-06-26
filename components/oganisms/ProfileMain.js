import { useEffect, useState } from 'react';

import { generateName } from '../../services/RandomService';
import ScoreBoardHeader from '../atomics/ScoreBoardHeader';
import NewsfeedList from '../molecules/NewsfeedList';

export default function ProfileMain() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    generateName().then((name) => setUserName(name));
  }, []);

  return (
    <>
      <NewsfeedList />
      <ScoreBoardHeader label={userName} />
    </>
  );
}
