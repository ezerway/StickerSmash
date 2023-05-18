import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { Pressable, Text } from 'react-native';
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

  return (
    <View style={transformStyle}>
      <WithSkiaWeb
        getComponent={() => import('./SkiaImage')}
        fallback={<Text style={{ textAlign: 'center' }}>Loading...</Text>}
      />
    </View>
  );
}
