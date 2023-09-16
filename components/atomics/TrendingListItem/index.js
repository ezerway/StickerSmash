import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { Min } from '../../../constants/FeedScore';
import { small } from '../../../constants/FontSize';

export default memo(function TrendingListItem({
  feed = {},
  onPress = () => {},
  imageSize = { width: 70, height: 70 },
}) {
  const tailwind = useTailwind();

  const [likedCount] = useState((feed.liked || []).length);
  const [bookmarkedCount] = useState((feed.bookmarked || []).length);
  const [forkedCount] = useState((feed.forked || []).length);
  const [actionCount] = useState(+likedCount + +bookmarkedCount + +forkedCount);
  const [scored] = useState(Math.abs(feed.scored - Min));

  const [isLoading, setIsLoading] = useState(null);
  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onLoadEnd = useCallback(() => setIsLoading(false), []);
  const scoreFrontSize = { fontSize: small };

  return (
    <Pressable onPress={onPress}>
      <View style={tailwind('flex flex-row px-2 py-2 items-center')}>
        <View style={tailwind('w-5/12 flex flex-row')}>
          <Image
            style={[
              tailwind('mr-2 self-center items-center justify-center self-center'),
              imageSize,
            ]}
            contentFit="cover"
            source={feed.image_url}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}>
            {isLoading ? <ActivityIndicator size="small" /> : null}
          </Image>
          <View style={tailwind('flex flex-col')}>
            <Text style={tailwind('text-sm font-bold')}>{feed.author}</Text>
            <Text style={tailwind('text-gray-600')}>{feed.text}</Text>
          </View>
        </View>
        <View style={tailwind('w-5/12 flex flex-row justify-end items-center')}>
          <Text style={[tailwind('w-8 px-1 text-center'), scoreFrontSize]}>{likedCount}</Text>
          <Text style={[tailwind('w-8 px-1 text-center'), scoreFrontSize]}>{bookmarkedCount}</Text>
          <Text style={[tailwind('w-8 px-1 text-center'), scoreFrontSize]}>{forkedCount}</Text>
          <Text style={[tailwind('w-8 px-1 text-center'), scoreFrontSize]}>{actionCount}</Text>
        </View>
        <Text style={tailwind('w-1/6 text-lg sm:text-xl font-bold text-right')}>{scored}</Text>
      </View>
    </Pressable>
  );
});
