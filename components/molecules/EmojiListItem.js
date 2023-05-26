import { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';

export default memo(function EmojiListItem({ source }) {
  const [isLoading, setIsLoading] = useState(null);
  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onLoadEnd = useCallback(() => setIsLoading(false), []);

  return (
    <Image source={source} style={styles.image} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd}>
      {isLoading ? <ActivityIndicator size="small" /> : null}
    </Image>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
