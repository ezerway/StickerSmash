import { FlashList } from '@shopify/flash-list';
import { memo, useCallback, useState } from 'react';
import { Platform } from 'react-native';

import { getStickers } from '../../services/FirebaseService';
import EmojiListItem from '../atomics/EmojiListItem';

export default memo(function EmojiList({ onClose, onSelect }) {
  const [emojis, setEmojis] = useState([
    require('../../assets/images/emoji1.png'),
    require('../../assets/images/emoji2.png'),
    require('../../assets/images/emoji3.png'),
    require('../../assets/images/emoji4.png'),
    require('../../assets/images/emoji5.png'),
    require('../../assets/images/emoji6.png'),
  ]);

  const [lastItem, setLastItem] = useState({});
  const [limit] = useState(5);

  const [loading, setLoading] = useState(null);

  const fetchStickers = useCallback(async (startAtKey = 0, limit, isLoadMore = false) => {
    setLoading(true);
    const result = await getStickers(startAtKey, limit);

    if (result.length) {
      setLastItem(result[result.length - 1]);
    }

    const converted = result.map((sticker) => ({
      uri: sticker?.images['512'],
    }));
    setEmojis((items) => (isLoadMore ? items.concat(converted) : converted));
    setLoading(false);
  }, []);

  const onEndReached = useCallback(async () => {
    fetchStickers(lastItem.id, limit, true);
  }, [lastItem, limit]);

  return (
    <FlashList
      horizontal
      // contentContainerStyle={tailwind('flex-row items-center justify-between mx-2 rounded-t-2xl')}
      data={emojis}
      renderItem={({ item, index }) => {
        return <EmojiListItem key={index} onSelect={onSelect} onClose={onClose} item={item} />;
      }}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      estimatedItemSize={100}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
    />
  );
});
