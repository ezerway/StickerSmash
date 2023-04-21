import * as DomToImage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useContext } from 'react';
import { Alert, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { captureRef } from 'react-native-view-shot';

import { mainFlex } from '../../constants/Layout';
import { HomePageContext } from '../../contexts/HomePageContext';
import { i18n } from '../../i18n';
import { getFitSize } from '../../services/ResizeService';
import CircleButton from '../atomics/CircleButton';
import IconButton from '../atomics/IconButton';
import EmojiList from '../molecules/EmojiList';
import EmojiPicker from '../molecules/EmojiPicker';
import WideButton from '../molecules/WideButton';

export default function HomeFooter() {
  const {
    imageRef,
    showAppOptions,
    editingBox,
    showStickerPicker,
    setSelectedImage,
    setSelectedStickers,
    setShowAppOptions,
    setShowStickerPicker,
    setPreviewMode,
    setEditingBox,
    clearAll,
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
    const ratio = width / height;

    setSelectedImage({
      uri,
      width,
      height,
      ratio,
    });
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

  const onSelectPicker = useCallback((picker) => {
    setSelectedStickers((selected) => {
      return [...selected, picker];
    });
  }, []);

  const onRefresh = useCallback(() => {
    setSelectedStickers([]);
  }, []);
  const onAddSticker = useCallback(() => {
    setShowStickerPicker(true);
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
        const localUri = await captureRef(imageRef, {
          quality: 1,
          width: editingBox.width,
        });

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

  const onModalClose = useCallback(() => {
    setShowStickerPicker(false);
  }, []);

  return (
    <>
      {showAppOptions ? (
        <View style={styles.footerToolbar}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label={i18n.t('Refresh')} onPress={onRefresh} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label={i18n.t('Save')} onPress={onClickSaveImage} />
          </View>
        </View>
      ) : (
        <View style={styles.footerToolbar}>
          <WideButton
            label={i18n.t('ChooseAPhoto')}
            icon="photo-library"
            onPress={pickImage}
            style={styles.selectImageSectionButton}
          />
          <WideButton label={i18n.t('UseThisPhoto')} onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker visible={showStickerPicker} onClose={onModalClose}>
        <EmojiList onClose={onModalClose} onSelect={onSelectPicker} />
      </EmojiPicker>
    </>
  );
}

const styles = StyleSheet.create({
  footerToolbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectImageSectionButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
