import { memo, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import Base from './base';

export default memo(function FooterPicker({ label, visible, onClose, children }) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return <Base {...{ label, visible, onClose, children }} bottom={keyboardHeight} />;
});
