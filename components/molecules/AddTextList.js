import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import ColorPicker, { Panel5 } from 'reanimated-color-picker';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../constants/Color';
import { i18n } from '../../i18n';

export default memo(function AddTextList({ onClose }) {
  const tailwind = useTailwind();
  const inputRef = useRef();
  const [text, setText] = useState('');
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
      <View style={tailwind('flex-row m-4')}>
        <TextInput
          ref={inputRef}
          placeholderTextColor={styles.input.color}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder={i18n.t('Text')}
          autoFocus
        />
        <Pressable style={[styles.selectedColorButton, { backgroundColor: selectedColor }]} />
        <TouchableHighlight onPress={onClickAdd} style={styles.button}>
          <Text style={{ color: styles.button.color }}>{i18n.t('Add')}</Text>
        </TouchableHighlight>
      </View>

      <ColorPicker onChange={onSelectColor} style={styles.colorPanel} value={selectedColor}>
        <Panel5 />
      </ColorPicker>
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: white,
    borderColor: white,
  },
  selectedColorButton: {
    marginLeft: 10,
    height: 40,
    aspectRatio: 1 / 1,
    borderWidth: 1,
    padding: 10,
    color: white,
    borderColor: white,
  },
  colorPanel: {
    width: '100%',
  },
  button: {
    flex: 0.3,
    paddingVertical: 15,
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
