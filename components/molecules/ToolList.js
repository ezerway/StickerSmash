import { useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, Text } from 'react-native';

import { white } from '../../constants/Color';
import { large } from '../../constants/FontSize';
import { allowedTools } from '../../constants/Tool';

export default function ToolList({ onClose, onSelect }) {
  const [tools] = useState([...allowedTools]);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContainer}
      data={tools}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          style={styles.item}
          onPress={() => {
            onSelect(item);
            onClose();
          }}>
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
  item: {
    width: 100,
    height: 100,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: white,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    color: white,
    fontSize: large,
  },
});
