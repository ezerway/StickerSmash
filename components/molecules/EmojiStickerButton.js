import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiStickButton({ onPress, position, size, children }) {

  const positionStyle = useAnimatedStyle(() => {
    return {
      ...withSpring(position.value).current,
    }
  });

  return (
    <AnimatedView style={[styles.buttonContainer, size, positionStyle]}>
      <Pressable style={styles.button} onPress={onPress}>
        {children}
      </Pressable>
    </AnimatedView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    borderRadius: '50%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#fff',
    opacity: 0.8,
  },
});