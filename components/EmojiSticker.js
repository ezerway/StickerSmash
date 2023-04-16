import { useCallback, useContext, useState } from "react";
import { Image, View } from "react-native";
import { TapGestureHandler, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { AppContext } from "../contexts/AppContext";
import ZoomOutButton from "./ZoomOutButton";
import ZoomInButton from "./ZoomInButton";
import XButton from "./XButton";

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function EmojiSicker({
    index = 0, source, size, parentSize,
    onClickX = () => {}
}) {

    if (!source) {
        return <div style={{
            width: size.width,
            height: size.height
        }}></div>;
    }

    const [position] = useState({
        top: -(parentSize.height / 2 + size.height / 2 + size.height * index),
        right: -(parentSize.width / 2 - size.width / 2)
    });

    const [buttonSize] = useState({ width: size.width / 2, height: size.height / 2 });

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(size.width);
    
    const { previewMode } = useContext(AppContext);

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
            // borderStyle: "dashed",
            borderColor: "#000",
            borderWidth: previewMode ? 0 : 1,
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

    const onZoomOut = useCallback(() => {
        scaleImage.value = scaleImage.value * 2;
    }, []);

    const onZoomIn = useCallback(() => {
        scaleImage.value = scaleImage.value / 2;
    }, []);

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
            <AnimatedView style={[containerStyle, position]}>
                <TapGestureHandler numberOfTaps={2} onGestureEvent={onDoubleTap}>
                    <AnimatedImage source={source} style={[imageStyle, size]} resizeMode="contain"/>
                </TapGestureHandler>
                {
                    previewMode ? null : (
                        <>
                            <ZoomOutButton size={buttonSize} parentSize={size} parentScale={scaleImage} onPress={onZoomOut}/>
                            <ZoomInButton size={buttonSize} parentSize={size} parentScale={scaleImage} onPress={onZoomIn}/>
                            <XButton size={buttonSize} parentSize={size} parentScale={scaleImage} onPress={onClickX}/>
                        </>
                    )
                }
            </AnimatedView>
        </PanGestureHandler>
    )
}