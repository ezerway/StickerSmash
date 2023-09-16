import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default memo(function EmojiListItem({
  width = 100,
  height = 100,
  item,
  onSelect = () => {},
  onClose = () => {},
}) {
  const tailwind = useTailwind();
  const [isLoading, setIsLoading] = useState(null);
  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onLoadEnd = useCallback(() => setIsLoading(false), []);
  const onPress = useCallback(() => {
    onSelect(item);
    onClose();
  }, []);

  return (
    <Pressable style={tailwind('mx-2')} onPress={onPress}>
      <Image
        source={item}
        style={[tailwind('items-center justify-center'), { width, height }]}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}>
        {isLoading ? <ActivityIndicator size="small" /> : null}
      </Image>
    </Pressable>
  );
});
