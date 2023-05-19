import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text } from 'react-native';

import { white } from '../../constants/Color';
import { small } from '../../constants/FontSize';
import { stickerSize } from '../../constants/ImageSize';
import { allowedTools } from '../../constants/Tool';

export default memo(function ToolList({ onClose, onSelect }) {
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
          <MaterialCommunityIcons
            size={stickerSize.width}
            name={item.icon}
            color={white}
            style={styles.icon}
          />
          <Text color={white} style={styles.text}>
            {item.label}
          </Text>
        </Pressable>
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
  icon: {},
  text: {
    color: white,
    fontSize: small,
    paddingVertical: 5,
    width: 100,
    textAlign: 'center',
  },
});
