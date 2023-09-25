import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { defaultBackgroundColor, white } from '../../../constants/Color';
import { small } from '../../../constants/FontSize';
import { defaultImageSize } from '../../../constants/ImageSize';
import { i18n } from '../../../i18n';
import { getFitSize } from '../../../services/ResizeService';
import { timeSince } from '../../../services/TimeService';
import IconButton from '../IconButton';

export default memo(function NewsfeedListItem({
  feed = {},
  textColor = white,
  onPressLike = () => {},
  onPressBookmark = () => {},
  onPressFork = () => {},
  isLiked = false,
  isBookmarked = false,
  isForked = false,
}) {
  const tailwind = useTailwind();
  const [image] = useState(feed.image_url);

  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [forked, setForked] = useState(isForked);
  const [createdAt] = useState(timeSince(Math.abs(feed.created_at)));
  const [size] = useState(getFitSize(feed.size, defaultImageSize));
  const [isForking, setIsForking] = useState(false);
  const [likedCount, setLikedCount] = useState((feed.liked || []).length);
  const [forkedCount] = useState((feed.forked || []).length);
  const [isPublic] = useState(feed.public_at);
  const [isLoading, setIsLoading] = useState(null);
  const onLoadStart = useCallback(() => setIsLoading(true), []);
  const onLoadEnd = useCallback(() => setIsLoading(false), []);

  const pressLike = useCallback(() => {
    setLiked((liked) => {
      const newVal = !liked;
      onPressLike(newVal);

      if (newVal) {
        setLikedCount((val) => val + 1);
      } else {
        setLikedCount((val) => val - 1);
      }

      return newVal;
    });
  }, []);

  const pressBookmark = useCallback(() => {
    setBookmarked((bookmarked) => {
      const newVal = !bookmarked;
      onPressBookmark(newVal);
      return newVal;
    });
  }, []);

  const pressFork = useCallback(() => {
    setIsForking(true);
    setForked(!forked);
    onPressFork(!forked);
  }, [feed, forked]);

  const pressViewAuthor = useCallback(() => {}, []);

  return (
    <View style={tailwind('items-center justify-center px-4 pb-2 border-b')}>
      <View style={tailwind('w-full flex-row items-center justify-start mt-2 py-2 bg-white')}>
        <IconButton
          icon={isPublic ? 'earth' : 'settings'}
          iconType="Ionicons"
          backgroundColor={textColor}
          color={defaultBackgroundColor}
          style={tailwind('ml-2 mr-1')}
        />
        <Pressable onPress={pressViewAuthor}>
          <Text>{feed.author}</Text>
        </Pressable>
        <Text style={{ fontSize: small }}>
          {' - '}
          {createdAt}
        </Text>
      </View>
      {feed.text ? (
        <View style={tailwind('w-full justify-start border-black border-t px-2 py-2 bg-white')}>
          <Text>{feed.text}</Text>
        </View>
      ) : null}
      <Image
        source={image}
        style={[tailwind('items-center justify-center'), size]}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}>
        {isLoading ? <ActivityIndicator size="small" /> : null}
      </Image>
      <View
        style={tailwind(
          'w-full flex-row items-center justify-between border-b mt-1 py-2 border-white text-white'
        )}>
        <Text style={[tailwind('text-white'), { color: textColor }]}>
          {i18n.t('Liked', { liked: likedCount })}
        </Text>
        <Text style={[tailwind('text-white'), { color: textColor }]}>
          {i18n.t('Forked', { forked: forkedCount })}
        </Text>
      </View>
      <View style={tailwind('flex-row items-center justify-around mt-1 py-2')}>
        <IconButton
          icon={liked ? 'like1' : 'like2'}
          iconType="AntDesign"
          style={tailwind('flex-1')}
          onPress={pressLike}
        />
        <IconButton
          icon={bookmarked ? 'bookmark' : 'bookmark-outline'}
          style={tailwind('flex-1')}
          onPress={pressBookmark}
        />
        {isForking ? (
          <View style={tailwind('flex-1')}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <IconButton
            icon="code-fork"
            iconType="FontAwesome"
            style={tailwind('flex-1')}
            onPress={pressFork}
          />
        )}
      </View>
    </View>
  );
});
