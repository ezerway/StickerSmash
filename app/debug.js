import { useContext, useMemo } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { DebugContext } from '../contexts/DebugContext';

export default function Debug() {
  const { logs, clearAllLogs } = useContext(DebugContext);
  const taiwind = useTailwind();

  const Header = useMemo(() => {
    return (
      <View style={taiwind('w-full')}>
        <TouchableOpacity onPress={clearAllLogs} style={taiwind('px-mdSpace py-smSpace')}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const Item = useMemo(({ log }) => {
    return (
      <View style={taiwind('flex w-full p-smSpace')}>
        <Text style={taiwind('w-10/12')}>{log.message}</Text>
        <Text style={taiwind('w-2/12')}>{log.created_at}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={taiwind('w-full')}>
      <FlatList
        data={logs}
        renderItem={(log) => <Item log={log} />}
        keyExtractor={(log) => log.id}
        ListHeaderComponent={Header}
      />
    </SafeAreaView>
  );
}
