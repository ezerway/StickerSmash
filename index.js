import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { version } from 'canvaskit-wasm/package.json';
import { Platform } from 'react-native';

function init() {
  import('expo-router/entry');
}

if (Platform.OS === 'web') {
  LoadSkiaWeb({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}`,
  }).then(init);
} else {
  init();
}
