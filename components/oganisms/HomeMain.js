import { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { stickerSize } from '../../constants/ImageSize';
import { HomePageContext } from '../../contexts/HomePageContext';
import ImageViewer from '../atomics/ImageViewer';
import AddedImage from '../molecules/AddedImage';
import AddedText from '../molecules/AddedText';
import EmojiSicker from '../molecules/EmojiSticker';

export default function HomeMain() {
  const {
    imageRef,
    selectedImage,
    selectedStickers,
    addedTexts,
    addedImages,
    selectedFilter,
    setSelectedStickers,
    setAddedTexts,
    setAddedImages,
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

  const duplicateSticker = useCallback(
    (index) => () => {
      setSelectedStickers((stickers) => {
        const newStickers = stickers.slice();
        newStickers.push(stickers[index]);
        return newStickers;
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

  const duplicateText = useCallback(
    (index) => () => {
      setAddedTexts((addedTexts) => {
        const newAddedText = addedTexts.slice();
        newAddedText.push({ ...addedTexts[index]});
        return newAddedText;
      });
    },
    []
  );

  const removeAddedImage = useCallback(
    (index) => () => {
      setAddedImages((addedImages) => {
        addedImages[index] = null;
        return addedImages.slice();
      });
    },
    []
  );

  const duplicateAddedImage = useCallback(
    (index) => () => {
      setAddedImages((addedImages) => {
        const newAddedImages = addedImages.slice();
        newAddedImages.push(addedImages[index]);
        return newAddedImages;
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
        previewMode={previewMode}
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
          onClickDuplicate={duplicateSticker(index)}
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
          onClickDuplicate={duplicateText(index)}
        />
      ))}
      {addedImages.map((addedImage, index) => (
        <AddedImage
          key={index}
          index={index}
          source={addedImage}
          size={stickerSize}
          parentSize={editingBox}
          previewMode={previewMode}
          onClickX={removeAddedImage(index)}
          onClickDuplicate={duplicateAddedImage(index)}
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
