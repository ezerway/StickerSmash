import { Skia } from '@shopify/react-native-skia';
import * as Sharing from 'expo-sharing';
import { useCallback, useRef, useState, createContext, useContext, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';

import { AppContext } from './AppContext';
import { OriginalFilter } from '../constants/Filter';
import { PlaceholderImage } from '../constants/Image';
import { defaultImageSize } from '../constants/ImageSize';

export const HomePageContext = createContext(null);

let defaultImage = null;

export const HomePageContextProvider = ({ children }) => {
  const { mediaStatus, requestMediaPermission } = useContext(AppContext);
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [addedTexts, setAddedTexts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(OriginalFilter);
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [showToolPicker, setShowToolPicker] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(null);
  const [showTextModal, setShowTextModal] = useState(null);
  const [showFilterPicker, setShowFilterPicker] = useState(null);
  const [previewMode, setPreviewMode] = useState(null);
  const [flipMode, setFlipMode] = useState(null);
  const [editingBox, setEditingBox] = useState({ ...defaultImageSize });

  const clearAll = useCallback(() => {
    setSelectedImage(defaultImage);
    setShowAppOptions(null);
    setSelectedStickers([]);
    setAddedTexts([]);
    setSelectedFilter(OriginalFilter);
    setPreviewMode(null);
    setFlipMode(null);
    setEditingBox({ ...defaultImageSize });
  }, []);

  const togglePreview = useCallback(() => {
    setPreviewMode((value) => {
      return !value;
    });
  }, []);

  const toogleFlip = useCallback(() => {
    setFlipMode((value) => {
      return !value;
    });
  }, []);

  const generateImageUri = useCallback(async () => {
    try {
      if (!mediaStatus) {
        await requestMediaPermission();
      }
      return await captureRef(imageRef, {
        quality: 1,
        width: editingBox.width,
      });
    } catch {
      return null;
    }
  }, []);

  const nativeshare = useCallback(async () => {
    try {
      const currentImageUri = await generateImageUri();
      await Sharing.shareAsync(`file://${currentImageUri}`, {
        dialogTitle: 'Share it.',
        UTI: 'image/jpge',
      });
      setPreviewMode(false);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }, [mediaStatus]);

  const share = useCallback(async () => {
    setPreviewMode(true);
    setTimeout(nativeshare, 500);
  }, [mediaStatus]);

  useEffect(() => {
    Skia.Data.fromURI(PlaceholderImage).then((imageData) => {
      const image = Skia.Image.MakeImageFromEncoded(imageData);
      defaultImage = image;
      setSelectedImage(image);
    });
  }, [PlaceholderImage]);

  return (
    <HomePageContext.Provider
      value={{
        imageRef,
        selectedImage,
        selectedStickers,
        showAppOptions,
        showToolPicker,
        showStickerPicker,
        showTextModal,
        showFilterPicker,
        previewMode,
        flipMode,
        editingBox,
        addedTexts,
        selectedFilter,
        setSelectedImage,
        setSelectedStickers,
        setAddedTexts,
        setSelectedFilter,
        setShowAppOptions,
        setShowStickerPicker,
        setShowTextModal,
        setShowToolPicker,
        setShowFilterPicker,
        setPreviewMode,
        setEditingBox,
        clearAll,
        togglePreview,
        toogleFlip,
        generateImageUri,
        share,
      }}>
      {children}
    </HomePageContext.Provider>
  );
};
