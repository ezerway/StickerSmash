import { memo, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { allowedTools } from '../../constants/Tool';
import ToolItem from '../atomics/ToolItem';

export default memo(function ToolList({ onClose, onSelect }) {
  const tailwind = useTailwind();
  const [tools] = useState([...allowedTools]);

  return (
    <FlatList
      horizontal
      contentContainerStyle={tailwind('flex-row items-center justify-between mx-2 rounded-t-2xl')}
      data={tools}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <ToolItem key={index} onSelect={onSelect} onClose={onClose} item={item} />
      )}
    />
  );
});
