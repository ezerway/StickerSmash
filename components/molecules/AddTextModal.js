import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
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

export default memo(function AddTextModal({ visible, onClose }) {
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

  const onClickClose = useCallback(() => {
    onClose({});
  }, []);

  const onPressSelectedColor = useCallback(() => {
    setShowColorPanel(true);
  }, []);

  const onSelectColor = ({ hex }) => {
    setSelectedColor(() => hex);
  };

  useEffect(() => {
    if (!visible) {
      return;
    }

    setText('');
    setSelectedColor(white);
    setShowColorPanel(false);
  }, [visible]);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{i18n.t('AddText')}</Text>
          </View>
          <View style={styles.formContainer}>
            <SafeAreaView style={styles.inputContainer}>
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
            </SafeAreaView>

            {showColorPanel ? (
              <ColorPicker
                style={styles.colorPanel}
                value={selectedColor}
                onComplete={onSelectColor}>
                <Panel5 />
              </ColorPicker>
            ) : null}
          </View>
          <View style={styles.actionContainer}>
            <TouchableHighlight onPress={onClickAdd} style={styles.button}>
              <Text style={{ color: styles.button.color }}>{i18n.t('Add')}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={onClickClose} style={styles.button}>
              <Text style={{ color: styles.button.color }}>{i18n.t('Close')}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: '#25292e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    width: '100%',
    backgroundColor: '#464C55',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    padding: 10,
    color: white,
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  inputContainer: {
    width: '84%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '84%',
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
