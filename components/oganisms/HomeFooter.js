import { Alert, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as DomToImage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import { captureRef } from 'react-native-view-shot';
import { useCallback, useContext } from 'react';
import { HomePageContext } from '../../contexts/HomePageContext';
import { i18n } from '../../i18n';
import EmojiList from '../molecules/EmojiList';
import EmojiPicker from '../molecules/EmojiPicker';
import IconButton from '../atomics/IconButton';
import Button from '../atomics/Button';
import CircleButton from '../atomics/CircleButton';
import { getFitSize } from '../../services/ResizeService';
import { mainFlex } from '../../constants/Layout';


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
        setEditingBox
    } = useContext(HomePageContext);

    const dim = useWindowDimensions();

    const pickImage = useCallback(async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });

        if (result.canceled) {
            return alert(i18n.t("YouDidntSelectAnyImage"));
        }

        const { width, height, uri } = result.assets[0];
        const ratio = width / height;

        setSelectedImage({
            uri,
            width, height,
            ratio
        });
        setEditingBox(getFitSize(
            { width, height },
            {
                width: dim.width,
                height: dim.height * mainFlex
            }
        ));
        setShowAppOptions(true);
    }, []);

    const onSelectPicker = useCallback((picker) => {
        setSelectedStickers((selected) => {
            return [...selected, picker];
        });
    }, []);
    const clearAll = useCallback(() => {
        setSelectedImage(null);
        setSelectedStickers([]);
        setShowAppOptions(null);
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
            if (confirm(message)) {
                return;
            }

            return clearAll();
        }

        Alert.alert(
            i18n.t('Saved'),
            message,
            [
                {
                    text: i18n.t('No'),
                    style: 'cancel',
                    onPress: () => clearAll(),
                },
                {
                    text: i18n.t('OK'),
                },
            ]
        );
    }, []);

    const saveImage = useCallback(async () => {
        if (Platform.OS !== 'web') {
            try {
                const localUri = await captureRef(imageRef, {
                    quality: 1,
                    width: editingBox.width
                });

                if (!localUri) {
                    return alert(i18n.t('Error'))
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
            const imageLink = await DomToImage.toJpeg(imageRef.current, { quality: 1, ...editingBox });
            const link = document.createElement('a');
            link.download = `${Date.now()}.jpeg`;
            link.href = imageLink;
            link.click();
            showSaveAlert();
        } catch (error) {
            alert(error)
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
            {
                showAppOptions
                    ? (
                        <View style={styles.footerToolbar}>
                            <View style={styles.optionsRow}>
                                <IconButton icon="refresh" label={i18n.t('Refresh')} onPress={onRefresh} />
                                <CircleButton onPress={onAddSticker} />
                                <IconButton icon="save-alt" label={i18n.t('Save')} onPress={onClickSaveImage} />
                            </View>
                        </View>
                    )
                    : (
                        <View style={styles.footerToolbar}>
                            <Button theme="primary" label={i18n.t('ChooseAPhoto')} onPress={pickImage}></Button>
                            <Button label={i18n.t('UseThisPhoto')} onPress={() => setShowAppOptions(true)}></Button>
                        </View>
                    )
            }
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
        justifyContent: 'center'
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});
