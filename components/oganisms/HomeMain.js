import { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { stickerSize } from '../../constants/ImageSize';
import { HomePageContext } from '../../contexts/HomePageContext';
import ImageViewer from '../atomics/ImageViewer';
import EmojiSicker from '../molecules/EmojiSticker';

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function HomeMain() {
  const {
    imageRef,
    selectedImage,
    selectedStickers,
    setSelectedStickers,
    editingBox,
    previewMode,
    flipMode,
    toolePreview,
  } = useContext(HomePageContext);

  const removeSticker = useCallback(
    (index) => () => {
      setSelectedStickers((stickers) => {
        stickers[index] = null;
        return stickers.slice();
      });
    },
    []
  );

  return (
    <View ref={imageRef} collapsable={false} style={styles.mainContent}>
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={selectedImage}
        size={editingBox}
        flipMode={flipMode}
        onPressOut={toolePreview}
        onLongPress={toolePreview}
      />
      {selectedStickers.map((selectedSticker, index) => (
        <EmojiSicker
          key={index}
          index={index}
          source={selectedSticker}
          size={stickerSize}
          parentSize={editingBox}
          previewMode={previewMode}
          onClickX={removeSticker(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
