import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { lazy, useMemo } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const View = Animated.createAnimatedComponent(Pressable);

export default function ImageViewer({ flipMode = 0 }) {
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: flipMode ? -1 : 1,
        },
      ],
    };
  });

  const Skia = useMemo(() => {
    if (Platform.OS === 'web') {
      return (
        <WithSkiaWeb
          getComponent={() => import('./SkiaImage')}
          fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
        />
      );
    }

    return lazy(() => import('./SkiaImage'));
  }, [Platform.OS]);

  return <View style={transformStyle}>{Skia}</View>;
}
