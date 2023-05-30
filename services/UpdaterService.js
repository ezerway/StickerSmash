import { nativeApplicationVersion } from 'expo-application';
import * as Updates from 'expo-updates';
import SpInAppUpdates, { IAUUpdateKind } from 'ez-sp-react-native-in-app-updates';
import { Alert, Platform } from 'react-native';

import { i18n } from '../i18n';

async function expoUpdate() {
  Alert.alert(
    i18n.t('UpdateApp'),
    `${i18n.t(`NewVersionIsNowAvaiable`)} ${i18n.t(`WouldYouLikeToUpdateItNow`)}`,
    [
      {
        text: i18n.t('Later'),
        style: 'cancel',
      },
      {
        text: i18n.t('UpdateNow'),
        onPress: async () => {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        },
      },
    ]
  );
}

async function checkAndUpdate() {
  if (Platform.OS === 'web') {
    return;
  }

  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );
  // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
  inAppUpdates.checkNeedsUpdate({ curVersion: nativeApplicationVersion }).then(async (result) => {
    if (!result.shouldUpdate) {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        return;
      }

      return expoUpdate();
    }

    const [major, minor] = nativeApplicationVersion.split('.');
    const [newMajor, newMinor] = result.storeVersion('.');

    if (major === newMajor && minor === newMinor) {
      return expoUpdate();
    }

    let updateOptions = {
      title: i18n.t('UpdateApp'),
      message: `${i18n.t(`NewVersionIsNowAvaiable`)} ${i18n.t(`WouldYouLikeToUpdateItNow`)}`,
      buttonUpgradeText: i18n.t('UpdateNow'),
      forceUpgrade: true,
    };
    if (Platform.OS === 'android') {
      // android only, on iOS the user will be promped to go to your app store page
      updateOptions = {
        updateType: IAUUpdateKind.IMMEDIATE,
      };
    }
    inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
  });
}

export { checkAndUpdate };
