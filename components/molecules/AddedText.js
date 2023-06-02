import { memo, useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import DuplicateButton from '../atomics/DuplicateButton';
import RotateButton from '../atomics/RotateButton';
import XButton from '../atomics/XButton';
import ZoomInButton from '../atomics/ZoomInButton';
import ZoomOutButton from '../atomics/ZoomOutButton';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default memo(function AddedText({
  index = 0,
  text,
  size,
  color,
  parentSize,
  previewMode,
  onClickX = () => {},
  onClickDuplicate = () => {},
}) {
  const [position] = useState({
    position: 'absolute',
  });

  const [buttonSize] = useState({
    width: size.height / 2,
    height: size.height / 2,
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scaleWidth = useSharedValue(size.width);
  const scaleHeight = useSharedValue(size.height);

  const textStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleWidth.value),
      height: withSpring(scaleHeight.value),
      fontSize: withSpring(scaleHeight.value),
      lineHeight: withSpring(scaleHeight.value),
      color,
      textAlign: 'center',
      borderColor: '#000',
      borderWidth: previewMode ? 0 : 1,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          rotate: rotate.value + 'deg',
        },
      ],
    };
  });

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (!scaleWidth.value) {
        return;
      }
      scaleWidth.value = scaleWidth.value * 2;
      scaleHeight.value = scaleHeight.value * 2;
    },
  });

  const onZoomOut = useCallback(() => {
    scaleWidth.value = scaleWidth.value * 2;
    scaleHeight.value = scaleHeight.value * 2;
  }, []);

  const onZoomIn = useCallback(() => {
    scaleWidth.value = scaleWidth.value / 2;
    scaleHeight.value = scaleHeight.value / 2;
  }, []);

  const onRotate = useCallback(() => {
    rotate.value = rotate.value + 15;
  }, []);

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  return (
    <>
      {text ? (
        <PanGestureHandler onGestureEvent={onDrag}>
          <AnimatedView style={[containerStyle, position]}>
            <TapGestureHandler numberOfTaps={2} onGestureEvent={onDoubleTap}>
              <AnimatedText style={[textStyle, size]}>{text}</AnimatedText>
            </TapGestureHandler>
            {previewMode ? null : (
              <>
                <ZoomOutButton size={buttonSize} parentScale={scaleWidth} onPress={onZoomOut} />
                <DuplicateButton
                  size={buttonSize}
                  parentScale={scaleWidth}
                  onPress={onClickDuplicate}
                />
                <ZoomInButton size={buttonSize} parentScale={scaleWidth} onPress={onZoomIn} />
                <XButton size={buttonSize} parentScale={scaleWidth} onPress={onClickX} />
                <RotateButton size={buttonSize} parentScale={scaleWidth} onPress={onRotate} />
              </>
            )}
          </AnimatedView>
        </PanGestureHandler>
      ) : (
        <View />
      )}
    </>
  );
});
