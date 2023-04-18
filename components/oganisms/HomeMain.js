import { StyleSheet, View } from 'react-native';
import ImageViewer from '../atomics/ImageViewer';
import { useCallback, useContext } from 'react';
import { stickerSize } from '../../constants/ImageSize';
import EmojiSicker from '../molecules/EmojiSticker';
import { HomePageContext } from '../../contexts/HomePageContext';

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function HomeMain() {
  const {
    imageRef,
    selectedImage,
    selectedStickers,
    setSelectedStickers,
    editingBox,
    previewMode
  } = useContext(HomePageContext);

  const removeSticker = useCallback((index) => () => {
    setSelectedStickers((stickers) => {
      stickers[index] = null;
      return stickers.slice();
    });
  }, []);

  return (
    <View ref={imageRef} collapsable={false} style={styles.mainContent}>
      <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} size={editingBox} />
      {
        selectedStickers.map((selectedSticker, index) => (
          <EmojiSicker
            key={index}
            index={index}
            source={selectedSticker}
            size={stickerSize}
            parentSize={editingBox}
            previewMode={previewMode}
            onClickX={removeSticker(index)}
          />
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
});