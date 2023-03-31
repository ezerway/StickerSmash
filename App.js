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

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(null);
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
      return alert('You didn\'t select any image.');
    }

    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  }, []);

  const clearAll = useCallback(() => {
    setSelectedImage(null);
    setSelectedSticker(null);
    setShowAppOptions(null);
  }, []);
  const onRefresh = useCallback(() => {
    setSelectedSticker(null);
  }, []);
  const onAddSticker = useCallback(() => {
    setShowStickerPicker(true);
  }, []);
  const showSaveAlert = useCallback(() => {
    const message = "Continue editing?";

    if (Platform.OS === 'web') {
      if (confirm(message)) {
        return;
      }
      
      return clearAll();
    }

    Alert.alert(
      "Saved",
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => clearAll(),
        },
        {
          text: 'OK',
        },
      ]
    );
  }, []);

  const onSaveImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
          width: 320
        });

        if (!localUri) {
          return alert("Error.")
        }

        MediaLibrary.saveToLibraryAsync(localUri);
        showSaveAlert();
      } catch (error) {
        alert(error);
      }
      return;
    }

    try {
      const imageLink = await DomToImage.toJpeg(imageRef.current, { quality: 1, width: 320, height: 440 });
      const link = document.createElement('a');
      link.download = `${Date.now()}.jpeg`;
      link.href = imageLink;
      link.click();
      showSaveAlert();
    } catch (error) {
      alert(error)
    }
  }, [imageRef]);

  const onModalClose = useCallback(() => {
    setShowStickerPicker(false);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {
            selectedSticker
              ? (<EmojiSicker source={selectedSticker} size={40} />)
              : null
          }
        </View>
      </View>
      {
        showAppOptions
          ? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Refresh" onPress={onRefresh} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
              </View>
            </View>
          )
          : (
            <View style={styles.footerContainer}>
              <Button theme="primary" label="Choose a photo" onPress={pickImage}></Button>
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)}></Button>
            </View>
          )
      }
      <EmojiPicker visible={showStickerPicker} onClose={onModalClose}>
        <EmojiList onClose={onModalClose} onSelect={setSelectedSticker} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
