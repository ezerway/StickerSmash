import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import ColorPicker, { Panel5 } from 'reanimated-color-picker';

import { white } from '../../constants/Color';
import { i18n } from '../../i18n';

export default memo(function AddTextList({ onClose }) {
  const inputRef = useRef();
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(white);
  const [showColorPanel, setShowColorPanel] = useState(false);

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

  const onPressSelectedColor = useCallback(() => {
    setShowColorPanel((value) => !value);
  }, []);

  const onSelectColor = ({ hex }) => {
    setSelectedColor(() => hex);
    setShowColorPanel(false);
  };

  useEffect(() => {
    setText('');
    setSelectedColor(white);
    setShowColorPanel(false);
  }, []);

  return (
    <View style={styles.centeredView}>
      <TextInput
        ref={inputRef}
        placeholderTextColor={styles.input.color}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={i18n.t('Text')}
        autoFocus
      />
      <Pressable
        style={[styles.selectedColorButton, { backgroundColor: selectedColor }]}
        onPress={onPressSelectedColor}
      />

      {showColorPanel ? (
        <ColorPicker onChange={onSelectColor} style={styles.colorPanel} value={selectedColor}>
          <Panel5 />
        </ColorPicker>
      ) : null}
      <TouchableHighlight onPress={onClickAdd} style={styles.button}>
        <Text style={{ color: styles.button.color }}>{i18n.t('Add')}</Text>
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
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
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
  },
  button: {
    flex: 0.3,
    paddingVertical: 15,
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
