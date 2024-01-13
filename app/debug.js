import { useRouter } from 'expo-router';
import { useCallback, useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { DebugContext } from '../contexts/DebugContext';

export default function Debug() {
  const { logs, addLog, clearAllLogs } = useContext(DebugContext);
  const taiwind = useTailwind();
  const router = useRouter();

  const HeaderButton = useCallback(({ text, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={taiwind(
          'w-1/3 flex items-center justify-center px-4 py-2 border border-white text-white'
        )}>
        <Text style={taiwind('text-white')}>{text}</Text>
      </TouchableOpacity>
    );
  }, []);

  const Header = useMemo(() => {
    return (
      <View style={taiwind('w-full bg-black flex-row items-end py-2 justify-center')}>
        <HeaderButton text="Test" onPress={() => addLog('test')} />
        <HeaderButton text="Clear" onPress={clearAllLogs} />
        <HeaderButton text="Back" onPress={() => router.back()} />
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item.id} style={taiwind('w-full flex-row justify-between px-2')}>
        <Text style={taiwind('w-2/3 text-white text-xs')}>{item.message}</Text>
        <Text style={taiwind('w-1/3 text-white text-xs')}>{item.created_at}</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={taiwind('w-full h-full bg-black')}>
      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={(log) => log.id}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}
