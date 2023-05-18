import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Platform } from 'react-native';

function init() {
  import('./App').then((Module) => registerRootComponent(Module.default));
}

if (Platform.OS === 'web') {
  LoadSkiaWeb().then(init);
} else {
  init();
}
