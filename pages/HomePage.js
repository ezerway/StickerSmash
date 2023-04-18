import HomeMain from '../components/oganisms/HomeMain';
import HomeFooter from '../components/oganisms/HomeFooter';
import { HomePageContext } from '../contexts/HomePageContext';
import { useRef, useState } from 'react';
import PageTemplate from '../components/templates/PageTemplate';
import { defaultImageSize } from '../constants/ImageSize';

export default function HomePage() {
    const imageRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedStickers, setSelectedStickers] = useState([]);
    const [showAppOptions, setShowAppOptions] = useState(null);
    const [showStickerPicker, setShowStickerPicker] = useState(null);
    const [previewMode, setPreviewMode] = useState(null);
    const [editingBox, setEditingBox] = useState({...defaultImageSize});
    return (
        <HomePageContext.Provider value={{
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
            setEditingBox
        }}>
            <PageTemplate footer={<HomeFooter />}>
                <HomeMain />
            </PageTemplate>
        </HomePageContext.Provider>
    );
}

