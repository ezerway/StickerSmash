import { Image, View } from "react-native";
import { TapGestureHandler, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function EmojiSicker({ source, size }) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(size);

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value
            }, {
                translateY: translateY.value
            }]
        }
    });

    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            if (!scaleImage.value) {
                return;
            }
            scaleImage.value = scaleImage.value * 2;
        }
    });

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        }
    });

    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[containerStyle, { top: -300 }]}>
                <TapGestureHandler numberOfTaps={2} onGestureEvent={onDoubleTap}>
                    <AnimatedImage source={source} style={[imageStyle, { width: size, height: size }]} resizeMode="contain"/>
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    )
}