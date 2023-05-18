import { useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, Text } from 'react-native';

import { white } from '../../constants/Color';
import { allowedFilters } from '../../constants/Filter';
import { small } from '../../constants/FontSize';
import { PlaceholderImage } from '../../constants/Image';

export default function FilterList({ selectedImage, onClose, onSelect }) {
  const source = selectedImage ? { uri: selectedImage.uri } : PlaceholderImage;

  const [filters] = useState(allowedFilters);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContainer}
      data={filters}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          onPress={() => {
            onSelect(item);
          }}>
          <Image source={source} style={[styles.image, item.style]} />
          <Text label={item.label} color={white} style={styles.text}>
            {item.label}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  text: {
    color: white,
    fontSize: small,
    paddingVertical: 5,
    width: 100,
    textAlign: 'center',
  },
});
