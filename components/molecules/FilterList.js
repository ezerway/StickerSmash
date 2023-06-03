import { memo, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { allowedFilters } from '../../constants/Filter';
import FilterItem from '../atomics/FilterItem';

export default memo(function FilterList({ selectedImage, onClose, onSelect }) {
  const tailwind = useTailwind();
  const [filters] = useState(allowedFilters);

  return (
    <FlatList
      horizontal
      contentContainerStyle={tailwind('flex-row items-center justify-between mx-2 rounded-t-2xl')}
      data={filters}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <FilterItem key={index} onSelect={onSelect} item={item} image={selectedImage} />
      )}
    />
  );
});
