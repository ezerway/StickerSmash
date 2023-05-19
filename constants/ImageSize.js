import { Dimensions } from 'react-native';

import { mainFlex } from './Layout';
const screenDimensions = Dimensions.get('screen');

const iconButtonSize = {
  width: 24,
  height: 24,
};

const defaultImageSize = {
  width: Math.floor(screenDimensions.width) - 30,
  height: Math.floor(screenDimensions.height * mainFlex) - 30,
};

const stickerSize = {
  width: 40,
  height: 40,
};

const stickerButtonSize = {
  width: 20,
  height: 20,
};

const iconStickerButtonSize = {
  width: 10,
  height: 10,
};

export { iconButtonSize, defaultImageSize, stickerSize, stickerButtonSize, iconStickerButtonSize };
