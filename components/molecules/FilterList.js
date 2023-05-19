import { memo, useState } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';

import { allowedFilters } from '../../constants/Filter';
import FilterItem from '../atomics/FilterItem';

export default memo(function FilterList({ selectedImage, onClose, onSelect }) {
  const [filters] = useState(allowedFilters);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContainer}
      data={filters}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <FilterItem key={index} onSelect={onSelect} item={item} image={selectedImage} />
      )}
    />
  );
});

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
