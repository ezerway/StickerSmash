import { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { stickerSize } from '../../constants/ImageSize';
import { HomePageContext } from '../../contexts/HomePageContext';
import ImageViewer from '../atomics/ImageViewer';
import AddedText from '../molecules/AddedText';
import EmojiSicker from '../molecules/EmojiSticker';

export default function HomeMain() {
  const {
    imageRef,
    selectedImage,
    selectedStickers,
    selectedFilter,
    setSelectedStickers,
    setAddedTexts,
    addedTexts,
    editingBox,
    previewMode,
    flipMode,
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

  const removeText = useCallback(
    (index) => () => {
      setAddedTexts((addedTexts) => {
        addedTexts[index] = null;
        return addedTexts.slice();
      });
    },
    []
  );

  return (
    <View ref={imageRef} collapsable={false} style={styles.mainContent}>
      <ImageViewer
        selectedImage={selectedImage}
        filterStyle={selectedFilter?.style}
        size={editingBox}
        flipMode={flipMode}
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
      {addedTexts.map((addedText, index) => (
        <AddedText
          key={index}
          index={index}
          text={addedText?.text}
          color={addedText?.color}
          size={{
            height: stickerSize.height,
            width: stickerSize.width * addedText?.text?.length * 0.8,
          }}
          parentSize={editingBox}
          previewMode={previewMode}
          onClickX={removeText(index)}
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
