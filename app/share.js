import { useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, Image } from 'react-native';

export default function Share() {
  const { url } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>{url}</Text>
        <Image style={{ width: 100, height: 100 }} source={{ uri: url }} />
      </View>
    </SafeAreaView>
  );
}
