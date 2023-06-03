import { memo, useEffect, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { getStickers } from '../../services/FirebaseService';
import EmojiListItem from '../atomics/EmojiListItem';

export default memo(function EmojiList({ onClose, onSelect }) {
  const tailwind = useTailwind();
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
            uri: sticker?.images['512'],
          }))
        )
      );
    });
  }, []);

  return (
    <FlatList
      horizontal
      contentContainerStyle={tailwind('flex-row items-center justify-between mx-2 rounded-t-2xl')}
      data={emojis}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      renderItem={({ item, index }) => (
        <EmojiListItem key={index} onSelect={onSelect} onClose={onClose} item={item} />
      )}
    />
  );
});
