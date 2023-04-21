import { StyleSheet, View } from 'react-native';

import IconButton from '../atomics/IconButton';
import TextButton from '../atomics/TextButton';

export default function WideButton({ label, icon, style, onPress }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      {icon ? (
        <IconButton icon={icon} label={label} onPress={onPress} />
      ) : (
        <TextButton label={label} onPress={onPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
