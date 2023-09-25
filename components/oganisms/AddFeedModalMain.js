import storage from '@react-native-firebase/storage';
import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { activeTextButtonColor, processorBackground, textButtonColor } from '../../constants/Color';
import { defaultImageSize, iconButtonSize } from '../../constants/ImageSize';
import { AppContext } from '../../contexts/AppContext';
import { i18n } from '../../i18n';
import { addFeed } from '../../services/FeedService';
import { getFitSize } from '../../services/ResizeService';
import IconButton from '../atomics/IconButton';
import TextButton from '../atomics/TextButton';

export default function AddFeedModalMain() {
  const tailwind = useTailwind();
  const {
    image_uri,
    text = '',
    width = defaultImageSize.width,
    height = defaultImageSize.height,
  } = useLocalSearchParams();
  const { customer, customerName } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState(image_uri);
  const [isPublic, setIsPublic] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [uploaded, setUploaded] = useState(0);
  const [size, setSize] = useState(getFitSize({ width, height }, defaultImageSize));

  const clickCancel = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }, []);

  const clickShare = useCallback(async () => {
    setUploaded(1);
    const physicalFileParts = imageUrl.split('/');
    const physicalFileName = physicalFileParts[physicalFileParts.length - 1];
    const cloudFilePath = `users/${customer.id}/${physicalFileName}`;
    const reference = storage().ref(cloudFilePath);
    const putTask = reference.putFile(imageUrl);

    putTask.on('state_changed', (taskSnapshot) => {
      setUploaded(Math.min((taskSnapshot.bytesTransferred * 100) / taskSnapshot.totalBytes, 100));
    });
    putTask.then(async () => {
      const newFeed = {
        author: customerName,
        size: { width, height },
        image_url: await reference.getDownloadURL(),
        text: textValue,
      };
      addFeed(customer, isPublic, newFeed);
      setUploaded(0);

      if (router.canGoBack()) {
        router.back();
        return;
      }

      router.replace('/profile');
    });
  }, [customerName, width, height, textValue, isPublic]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const { width, height, uri } = result.assets[0];
    setImageUrl(uri);
    setSize(getFitSize({ width, height }, defaultImageSize));
  }, []);

  return (
    <View style={tailwind('flex w-full items-center')}>
      {uploaded ? (
        <View style={tailwind('w-full')}>
          <View
            style={[
              tailwind('h-1'),
              { width: `${uploaded}%`, backgroundColor: processorBackground },
            ]}
          />
        </View>
      ) : null}
      <View style={tailwind('w-full flex-row text-white px-4 py-2')}>
        <View style={[tailwind('flex-none flex-row w-1/6')]}>
          <IconButton
            onPress={clickCancel}
            icon="x"
            iconType="Feather"
            style={[tailwind('flex-none justify-start')]}
          />
        </View>
        <View style={[tailwind('flex-1 items-center justify-between')]}>
          <Text style={{ color: textButtonColor }}>{i18n.t('CreatePost')}</Text>
        </View>

        <View style={[tailwind('flex-none flex-row w-1/6')]}>
          {uploaded ? (
            <View
              style={[
                tailwind(
                  'w-full h-full flex-row items-center justify-center flex-none justify-end'
                ),
              ]}>
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <TextButton
              label={i18n.t('Share')}
              color={activeTextButtonColor}
              style={[tailwind('flex-none justify-end')]}
              textStyle={[tailwind('items-end')]}
              onPress={clickShare}
            />
          )}
        </View>
      </View>
      <View style={tailwind('w-full flex-row border-t px-4 pt-2')}>
        <View style={[tailwind('flex-1 flex-row items-center justify-start')]}>
          <IconButton icon="public" style={tailwind('mr-1')} />
          <Text style={{ color: textButtonColor }}>{i18n.t('Public')}</Text>
        </View>
        <View style={[tailwind('flex-none flex-row items-end justify-end w-1/6')]}>
          <Checkbox color={activeTextButtonColor} value={isPublic} onValueChange={setIsPublic} />
        </View>
      </View>
      <View style={tailwind('w-full flex-row px-4 py-4')}>
        <TextInput
          style={tailwind('w-full')}
          placeholder={i18n.t('WhatIsOnYourMind')}
          placeholderTextColor={textButtonColor}
          color={textButtonColor}
          cursorColor={activeTextButtonColor}
          textAlign="left"
          numberOfLines={4}
          multiline
          value={textValue}
          onChangeText={setTextValue}
        />
      </View>
      <View style={tailwind('w-full items-center justify-center')}>
        <Image style={size} source={imageUrl} />
        <View style={[tailwind('absolute top-0 right-0 flex-row items-center px-5 pt-2')]}>
          <IconButton
            onPress={pickImage}
            icon="magic"
            size={iconButtonSize.width * 0.8}
            iconType="FontAwesome"
            label={i18n.t('Edit')}
            style={tailwind('mr-1 bg-transparent')}
          />
        </View>
      </View>
    </View>
  );
}
