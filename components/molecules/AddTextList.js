import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, TouchableHighlight, View } from 'react-native';
import ColorPicker, { Panel5 } from 'reanimated-color-picker';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../constants/Color';
import { i18n } from '../../i18n';

export default memo(function AddTextList({ onClose }) {
  const tailwind = useTailwind();
  const inputRef = useRef();
  const [text, setText] = useState('');
  const [textColor] = useState(white);
  const [selectedColor, setSelectedColor] = useState(white);

  const onChangeText = useCallback((val) => {
    setText(val);
  }, []);

  const onClickAdd = useCallback(() => {
    if (!text) {
      inputRef.current.focus();
      return;
    }
    onClose({ text, color: selectedColor });
  }, [text, selectedColor]);

  const onSelectColor = ({ hex }) => {
    setSelectedColor(() => hex);
  };

  useEffect(() => {
    setText('');
    setSelectedColor(white);
  }, []);

  return (
    <View style={tailwind('flex-col')}>
      <View style={tailwind('flex-row mb-4 mx-4 justify-between')}>
        <TextInput
          ref={inputRef}
          placeholderTextColor={textColor}
          style={[
            tailwind('pl-3 pr-3 h-10 w-2/3 border'),
            { color: textColor, borderColor: textColor },
          ]}
          onChangeText={onChangeText}
          value={text}
          placeholder={i18n.t('Text')}
          autoFocus
        />
        <Pressable style={[tailwind('p-3 h-10 w-10'), { backgroundColor: selectedColor }]} />
        <TouchableHighlight
          onPress={onClickAdd}
          style={tailwind('justify-center items-center pl-3 pr-3')}>
          <Text style={{ color: textColor }}>{i18n.t('Add')}</Text>
        </TouchableHighlight>
      </View>

      <ColorPicker style={tailwind('mx-4')} onChange={onSelectColor} value={selectedColor}>
        <Panel5 />
      </ColorPicker>
    </View>
  );
});
