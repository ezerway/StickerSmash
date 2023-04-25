import * as Sharing from 'expo-sharing';
import { useCallback, useRef, useState } from 'react';
import { captureRef } from 'react-native-view-shot';

import HomeFooter from '../components/oganisms/HomeFooter';
import HomeHeader from '../components/oganisms/HomeHeader';
import HomeMain from '../components/oganisms/HomeMain';
import PageTemplate from '../components/templates/PageTemplate';
import { defaultImageSize } from '../constants/ImageSize';
import { HomePageContext } from '../contexts/HomePageContext';

export default function HomePage() {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [showAppOptions, setShowAppOptions] = useState(null);
  const [showStickerPicker, setShowStickerPicker] = useState(null);
  const [previewMode, setPreviewMode] = useState(null);
  const [flipMode, setFlipMode] = useState(null);
  const [editingBox, setEditingBox] = useState({ ...defaultImageSize });

  const clearAll = useCallback(() => {
    setSelectedImage(null);
    setShowAppOptions(null);
    setSelectedStickers([]);
    setPreviewMode(null);
    setFlipMode(null);
    setEditingBox({ ...defaultImageSize });
  }, []);

  const toolePreview = useCallback(() => {
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
      return await captureRef(imageRef, {
        quality: 1,
        width: editingBox.width,
      });
    } catch {
      return null;
    }
  }, []);

  const share = useCallback(async () => {
    Sharing.shareAsync(await generateImageUri(), {}).catch((err) => {
      console.log(JSON.stringify(err));
    });
  }, []);

  return (
    <HomePageContext.Provider
      value={{
        imageRef,
        selectedImage,
        selectedStickers,
        showAppOptions,
        showStickerPicker,
        previewMode,
        flipMode,
        editingBox,
        setSelectedImage,
        setSelectedStickers,
        setShowAppOptions,
        setShowStickerPicker,
        setPreviewMode,
        setEditingBox,
        clearAll,
        toolePreview,
        toogleFlip,
        generateImageUri,
        share,
      }}>
      <PageTemplate header={showAppOptions ? <HomeHeader /> : null} footer={<HomeFooter />}>
        <HomeMain />
      </PageTemplate>
    </HomePageContext.Provider>
  );
}
