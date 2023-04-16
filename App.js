import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as DomToImage from 'dom-to-image';
import { captureRef } from 'react-native-view-shot';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import { useCallback, useRef, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSicker from './components/EmojiSticker';
import { imageSize, stickerSize } from './constants/ImageSize';
import { AppContext } from './contexts/AppContext';
import { i18n } from './i18n';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(null);
  const [previewMode, setPreviewMode] = useState(null);
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();

  if (!mediaStatus) {
    requestMediaPermission();
  }

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (result.canceled) {
      return alert(i18n.t("You didn't select any image."));
    }

    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  }, []);

  const onSelectPicker = useCallback((picker) => {
    setSelectedStickers((selected) => {
      return [...selected, picker];
    });
  }, []);
  const clearAll = useCallback(() => {
    setSelectedImage(null);
    setSelectedStickers([]);
    setShowAppOptions(null);
  }, []);
  const onRefresh = useCallback(() => {
    setSelectedStickers([]);
  }, []);
  const onAddSticker = useCallback(() => {
    setShowStickerPicker(true);
  }, []);

  const removeSticker = useCallback((index) => () => {
    setSelectedStickers((stickers) => {
      stickers[index] = null;
      return stickers.slice();
    });
  }, []);

  const showSaveAlert = useCallback(() => {
    const message = i18n.t('Continue editing?');

    if (Platform.OS === 'web') {
      if (confirm(message)) {
        return;
      }

      return clearAll();
    }

    Alert.alert(
      i18n.t('Saved'),
      message,
      [
        {
          text: i18n.t('No'),
          style: 'cancel',
          onPress: () => clearAll(),
        },
        {
          text: i18n.t('OK'),
        },
      ]
    );
  }, []);

  const saveImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
          width: imageSize.width
        });

        if (!localUri) {
          return alert("Error.")
        }

        MediaLibrary.saveToLibraryAsync(localUri);
        showSaveAlert();
      } catch (error) {
        alert(error);
      } finally {
        setPreviewMode(false);
      }
      return;
    }

    try {
      const imageLink = await DomToImage.toJpeg(imageRef.current, { quality: 1, ...imageSize });
      const link = document.createElement('a');
      link.download = `${Date.now()}.jpeg`;
      link.href = imageLink;
      link.click();
      showSaveAlert();
    } catch (error) {
      alert(error)
    } finally {
      setPreviewMode(false);
    }
  }, [imageRef]);

  const onClickSaveImage = useCallback(async () => {
    setPreviewMode(true);
    setTimeout(saveImage, 500);
  }, []);

  const onModalClose = useCallback(() => {
    setShowStickerPicker(false);
  }, []);

  return (
    <AppContext.Provider value={{
      previewMode
    }}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} size={imageSize} />
            {
              selectedStickers.map((selectedSticker, index) => (
                <EmojiSicker
                      key={index}
                      index={index}
                      source={selectedSticker}
                      size={stickerSize}
                      parentSize={imageSize}
                      onClickX={removeSticker(index)}
                      />
              ))
            }
          </View>
        </View>
        {
          showAppOptions
            ? (
              <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                  <IconButton icon="refresh" label={i18n.t('Refresh')} onPress={onRefresh} />
                  <CircleButton onPress={onAddSticker} />
                  <IconButton icon="save-alt" label={i18n.t('Save')} onPress={onClickSaveImage} />
                </View>
              </View>
            )
            : (
              <View style={styles.footerContainer}>
                <Button theme="primary" label={i18n.t('Choose a photo')} onPress={pickImage}></Button>
                <Button label={i18n.t('Use this photo')} onPress={() => setShowAppOptions(true)}></Button>
              </View>
            )
        }
        <EmojiPicker visible={showStickerPicker} onClose={onModalClose}>
          <EmojiList onClose={onModalClose} onSelect={onSelectPicker} />
        </EmojiPicker>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
