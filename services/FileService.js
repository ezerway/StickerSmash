import * as FileSystem from 'expo-file-system';
import moment from 'moment';

const IMAGE_CACHE_FOLDER = FileSystem.cacheDirectory + 'images/';

/**
 *
 * @param {String} imageUri
 * @returns {Promise<String|null>}
 */
export async function saveImageUriToCache(imageUri) {
  return saveImageUriTo(IMAGE_CACHE_FOLDER, imageUri);
}

/**
 *
 * @param {String} imageUri
 * @returns {Promise<String|null>}
 */
export async function saveImageUriToDocument(imageUri) {
  return saveImageUriTo(FileSystem.documentDirectory, imageUri);
}

/**
 *
 * @param {String} folder
 * @param {String} imageUri
 * @returns {Promise<String|null>}
 */
export async function saveImageUriTo(folder, imageUri) {
  const localImageUri = folder + moment().unix() + '.png';

  try {
    const saveTask = imageUri.startsWith('http')
      ? FileSystem.downloadAsync(imageUri, localImageUri)
      : FileSystem.copyAsync({
          from: imageUri,
          to: localImageUri,
        });

    await saveTask;
    return localImageUri;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function initImageCacheFolder() {
  try {
    await clearImageCache();
    await FileSystem.makeDirectoryAsync(IMAGE_CACHE_FOLDER);
  } catch (e) {
    console.log(e);
  }
}

export async function clearImageCache() {
  try {
    FileSystem.deleteAsync(IMAGE_CACHE_FOLDER, { idempotent: true });
  } catch (e) {
    console.log(e);
  }
}
