import { Canvas, Image, useCanvasRef, useImage } from '@shopify/react-native-skia';
import { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { defaultBackgroundColor, white } from '../../../constants/Color';
import { small } from '../../../constants/FontSize';
import { i18n } from '../../../i18n';
import { timeSince } from '../../../services/TimeService';
import IconButton from '../IconButton';

export default memo(function NewsfeedListItem({
  feed = {},
  textColor = white,
  onLikePress = () => {},
  onForkPress = () => {},
}) {
  const tailwind = useTailwind();
  const canvasRef = useCanvasRef();
  const image = useImage(feed.image_url);

  const [liked, setLiked] = useState(feed.liked || 0);
  const [bookmarked, setBookmarked] = useState(Boolean(feed.bookmarked));
  const [downloaded, setDownloaded] = useState(feed.downloaded || 0);
  const [userLiked, setUserLiked] = useState(Boolean(feed.user_liked));
  const [createdAt] = useState(timeSince(feed.created_at));

  const pressLike = useCallback(() => {
    setUserLiked((liked) => {
      const newVal = !liked;
      setLiked((count) => count + (newVal ? 1 : -1));
      return newVal;
    });
  }, []);

  const pressBookmark = useCallback(() => {
    setBookmarked((bookmarked) => !bookmarked);
  }, []);

  const pressDownload = useCallback(() => {
    setDownloaded((downloaded) => ++downloaded);
    onForkPress(feed);
  }, [image]);

  const pressViewAuthor = useCallback(() => {}, []);

  return (
    <View style={tailwind('items-center justify-center px-4 pb-2 border-b')}>
      <View style={tailwind('w-full flex-row items-center justify-start mt-2 py-2 bg-white')}>
        <IconButton
          icon="earth"
          iconType="Ionicons"
          backgroundColor={textColor}
          color={defaultBackgroundColor}
          style={tailwind('ml-2 mr-1')}
          onPress={pressViewAuthor}
        />
        <Text>{feed.author}</Text>
        <Text style={{ fontSize: small }}>
          {' - '}
          {createdAt}
        </Text>
      </View>
      {image ? (
        <Canvas ref={canvasRef} style={[feed.size]}>
          <Image x={0} y={0} width={feed.size.width} height={feed.size.height} image={image} />
        </Canvas>
      ) : (
        <View
          style={[
            tailwind('items-center justify-center'),
            { width: feed.size.width, height: feed.size.height },
          ]}>
          <ActivityIndicator size="small" />
        </View>
      )}
      <View
        style={tailwind(
          'w-full flex-row items-center justify-between border-b mt-1 py-2 border-white text-white'
        )}>
        <Text style={[tailwind('text-white'), { color: textColor }]}>
          {i18n.t('Liked', { liked })}
        </Text>
        <Text style={[tailwind('text-white'), { color: textColor }]}>
          {i18n.t('Downloaded', { downloaded })}
        </Text>
      </View>
      <View style={tailwind('flex-row items-center justify-around mt-1 py-2')}>
        <IconButton
          icon={userLiked ? 'like1' : 'like2'}
          iconType="AntDesign"
          style={tailwind('flex-1')}
          onPress={pressLike}
        />
        <IconButton
          icon={bookmarked ? 'bookmark' : 'bookmark-outline'}
          style={tailwind('flex-1')}
          onPress={pressBookmark}
        />
        <IconButton
          icon="ios-code-download"
          iconType="Ionicons"
          style={tailwind('flex-1')}
          onPress={pressDownload}
        />
      </View>
    </View>
  );
});