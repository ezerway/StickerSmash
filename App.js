import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import { useCallback, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(null);

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

  const onRefresh = useCallback(() => {}, []);
  const onAddSticker = useCallback(() => {
    setShowStickerPicker(true);
  }, []);

  const onSaveImage = useCallback(() => {
  }, []);

  const onModalClose = useCallback(() => {
    setShowStickerPicker(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {
        showAppOptions
        ? (
          <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Refresh" onPress={onRefresh}/>
                <CircleButton onPress={onAddSticker}/>
                <IconButton icon="save-alt" label="Save" onPress={onSaveImage}/>
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
        <EmojiList onClose={onModalClose} onSelect={setSelectedSticker}/>
        </EmojiPicker>
      <StatusBar style="auto" />
    </View>
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
