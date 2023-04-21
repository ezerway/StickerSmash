import { useCallback, useRef, useState } from 'react';

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
  const [editingBox, setEditingBox] = useState({ ...defaultImageSize });

  const clearAll = useCallback(() => {
    setSelectedImage(null);
    setShowAppOptions(null);
    setSelectedStickers([]);
    setPreviewMode(null);
    setEditingBox({ ...defaultImageSize });
  }, []);

  const toolePreview = useCallback(() => {
    setPreviewMode((value) => {
      return !value;
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
        editingBox,
        setSelectedImage,
        setSelectedStickers,
        setShowAppOptions,
        setShowStickerPicker,
        setPreviewMode,
        setEditingBox,
        clearAll,
        toolePreview,
      }}>
      <PageTemplate header={showAppOptions ? <HomeHeader /> : null} footer={<HomeFooter />}>
        <HomeMain />
      </PageTemplate>
    </HomePageContext.Provider>
  );
}
