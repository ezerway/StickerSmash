import { memo, useCallback, useRef, useState } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { white } from '../../constants/Color';
import { i18n } from '../../i18n';

export default memo(function AddUserNameList({ name = '', onClose }) {
  const tailwind = useTailwind();
  const inputRef = useRef();
  const [text, setText] = useState(name);
  const [textColor] = useState(white);

  const onChangeText = useCallback((val) => {
    setText(val);
  }, []);

  const onClickSave = useCallback(() => {
    if (!text) {
      inputRef.current.focus();
      return;
    }
    onClose({ text });
  }, [text]);

  return (
    <View style={tailwind('flex-col')}>
      <View style={tailwind('flex-row mb-4 mx-4 justify-between')}>
        <TextInput
          ref={inputRef}
          placeholderTextColor={textColor}
          style={[
            tailwind('pl-3 pr-3 h-10 w-4/5 border'),
            { color: textColor, borderColor: textColor },
          ]}
          onChangeText={onChangeText}
          value={text}
          placeholder={i18n.t('Bob')}
          autoFocus
        />
        <TouchableHighlight
          onPress={onClickSave}
          style={tailwind('justify-center items-center pl-3 pr-3')}>
          <Text style={{ color: textColor }}>{i18n.t('Save')}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
});
