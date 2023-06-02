import { MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import {
  defaultBackgroundColor,
  modalHeaderBackgroundColor,
  modalHeaderColor,
} from '../../../constants/Color';
import { large } from '../../../constants/FontSize';
import { modalIconButtonSize } from '../../../constants/ImageSize';

export default memo(function FooterPicker({ label, visible, bottom = 0, onClose, children }) {
  const tailwind = useTailwind();
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View
        style={[
          tailwind('absolute bottom-0 h-2/3 w-full rounded-t-2xl'),
          { backgroundColor: defaultBackgroundColor },
          { bottom },
        ]}>
        <View
          style={[
            tailwind('flex-row items-center justify-between h-8 pl-4 pr-1 rounded-t-2xl'),
            { backgroundColor: modalHeaderBackgroundColor },
          ]}>
          <Text style={{ color: modalHeaderColor, fontSize: large }}>{label}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={modalIconButtonSize.width} color={modalHeaderColor} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
});
