import { Skia } from '@shopify/react-native-skia';
import * as DomToImage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useContext } from 'react';
import { Alert, Platform, View, useWindowDimensions } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { black, white, yellow } from '../../constants/Color';
import { OriginalFilter } from '../../constants/Filter';
import { large } from '../../constants/FontSize';
import { mainFlex } from '../../constants/Layout';
import { Filter, Image, Sticker, Text } from '../../constants/Tool';
import { HomePageContext } from '../../contexts/HomePageContext';
import { i18n } from '../../i18n';
import { getFitSize } from '../../services/ResizeService';
import IconButton from '../atomics/IconButton';
import AddTextList from '../molecules/AddTextList';
import ChoseAPhotoButton from '../molecules/ChoseAPhotoButton';
import EmojiList from '../molecules/EmojiList';
import FilterList from '../molecules/FilterList';
import FooterPicker from '../molecules/FooterPicker';
import ShowToolButton from '../molecules/ShowToolButton';
import ToolList from '../molecules/ToolList';
import WideButton from '../molecules/WideButton';

export default function HomeFooter() {
  const tailwind = useTailwind();

  const {
    imageRef,
    selectedImage,
    showAppOptions,
    editingBox,
    showToolPicker,
    showStickerPicker,
    showTextModal,
    showFilterPicker,
    setSelectedImage,
    setSelectedStickers,
    setAddedTexts,
    setAddedImages,
    setSelectedFilter,
    setShowAppOptions,
    setShowToolPicker,
    setShowStickerPicker,
    setShowTextModal,
    setShowFilterPicker,
    setPreviewMode,
    setEditingBox,
    clearAll,
    generateImageUri,
  } = useContext(HomePageContext);

  const dim = useWindowDimensions();

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return alert(i18n.t('YouDidntSelectAnyImage'));
    }

    const { width, height, uri } = result.assets[0];
    const imageData = await Skia.Data.fromURI(uri);
    const image = Skia.Image.MakeImageFromEncoded(imageData);

    setSelectedImage(image);
    setEditingBox(
      getFitSize(
        { width, height },
        {
          width: dim.width,
          height: dim.height * mainFlex,
        }
      )
    );
    setShowAppOptions(true);
  }, []);

  const onSelectStickerPicker = useCallback((picker) => {
    setSelectedStickers((selected) => {
      return [...selected, picker];
    });
  }, []);

  const onCloseAddTextModal = useCallback(({ text, color }) => {
    setShowTextModal(false);
    if (!text) {
      return;
    }

    setAddedTexts((added) => {
      return [...added, { text, color }];
    });
  }, []);

  const onSelectFilterPicker = useCallback((filter) => {
    setSelectedFilter(filter);
  }, []);

  const pickImageByTool = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setAddedImages((selected) => {
      return [...selected, result.assets[0].uri];
    });
  }, []);

  const onSelectToolPicker = useCallback((selected) => {
    if (selected.type === Sticker) {
      return setShowStickerPicker(true);
    }
    if (selected.type === Text) {
      return setShowTextModal(true);
    }
    if (selected.type === Filter) {
      return setShowFilterPicker(true);
    }
    if (selected.type === Image) {
      return pickImageByTool();
    }
  }, []);

  const onRefresh = useCallback(() => {
    setSelectedStickers([]);
    setAddedTexts([]);
    setSelectedFilter(OriginalFilter);
    setAddedImages([]);
  }, []);
  const onAdd = useCallback(() => {
    setShowToolPicker(true);
  }, []);

  const showSaveAlert = useCallback(() => {
    const message = i18n.t('ContinueEditing');

    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        return;
      }

      return clearAll();
    }

    Alert.alert(i18n.t('Saved'), message, [
      {
        text: i18n.t('No'),
        style: 'cancel',
        onPress: () => clearAll(),
      },
      {
        text: i18n.t('OK'),
      },
    ]);
  }, []);

  const saveImage = useCallback(async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await generateImageUri();

        if (!localUri) {
          return alert(i18n.t('Error'));
        }

        MediaLibrary.saveToLibraryAsync(localUri);
        showSaveAlert();
      } catch (error) {
        alert(error);
      } finally {
        setPreviewMode(false);
      }
      return;
    }

    try {
      const imageLink = await DomToImage.toJpeg(imageRef.current, {
        quality: 1,
        ...editingBox,
      });
      const link = window.document.createElement('a');
      link.download = `${Date.now()}.jpeg`;
      link.href = imageLink;
      link.click();
      showSaveAlert();
    } catch (error) {
      alert(error);
    } finally {
      setPreviewMode(false);
    }
  }, [imageRef]);

  const onClickSaveImage = useCallback(async () => {
    setPreviewMode(true);
    setTimeout(saveImage, 500);
  }, []);

  const onToolModalClose = useCallback(() => {
    setShowToolPicker(false);
  }, []);

  const onStickerModalClose = useCallback(() => {
    setShowStickerPicker(false);
  }, []);

  const onFilterModalClose = useCallback(() => {
    setShowFilterPicker(false);
  }, []);

  return (
    <>
      {showAppOptions ? (
        <View style={tailwind('flex-1 justify-center items-center')}>
          <View style={tailwind('w-full flex-row justify-around items-center')}>
            <IconButton icon="refresh" label={i18n.t('Refresh')} onPress={onRefresh} />
            <ShowToolButton onPress={onAdd} />
            <IconButton icon="save-alt" label={i18n.t('Save')} onPress={onClickSaveImage} />
          </View>
        </View>
      ) : (
        <View style={tailwind('flex-1 justify-center items-center')}>
          <ChoseAPhotoButton onPress={pickImage} />
          <WideButton
            label={i18n.t('UseThisPhoto')}
            fontSize={large}
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <FooterPicker label={i18n.t('Tools')} visible={showToolPicker} onClose={onToolModalClose}>
        <ToolList onClose={onToolModalClose} onSelect={onSelectToolPicker} />
      </FooterPicker>
      <FooterPicker
        label={i18n.t('ChooseASticker')}
        visible={showStickerPicker}
        onClose={onStickerModalClose}>
        <EmojiList onClose={onStickerModalClose} onSelect={onSelectStickerPicker} />
      </FooterPicker>
      <FooterPicker label={i18n.t('AddText')} visible={showTextModal} onClose={onCloseAddTextModal}>
        <AddTextList onClose={onCloseAddTextModal} onSelect={onCloseAddTextModal} />
      </FooterPicker>
      <FooterPicker
        label={i18n.t('Filters')}
        visible={showFilterPicker}
        onClose={onFilterModalClose}>
        <FilterList
          selectedImage={selectedImage}
          onClose={onFilterModalClose}
          onSelect={onSelectFilterPicker}
        />
      </FooterPicker>
    </>
  );
}
