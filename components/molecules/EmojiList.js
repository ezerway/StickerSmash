import { memo, useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet } from 'react-native';

import EmojiListItem from './EmojiListItem';
import { getStickers } from '../../services/FirebaseService';

export default memo(function EmojiList({ onClose, onSelect }) {
  const [emojis, setEmojis] = useState([
    require('../../assets/images/emoji1.png'),
    require('../../assets/images/emoji2.png'),
    require('../../assets/images/emoji3.png'),
    require('../../assets/images/emoji4.png'),
    require('../../assets/images/emoji5.png'),
    require('../../assets/images/emoji6.png'),
  ]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }
    getStickers().then((stickers) => {
      setEmojis((old) =>
        old.concat(
          stickers.map((sticker) => ({
            uri: sticker.images['512'],
          }))
        )
      );
    });
  }, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.listContainer}
      data={emojis}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          onPress={() => {
            onSelect(item);
            onClose();
          }}>
          <EmojiListItem source={item} />
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
});
