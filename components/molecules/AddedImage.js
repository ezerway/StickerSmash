import { memo } from 'react';

import EmojiSticker from './EmojiSticker';

export default memo(function AddedImage({
  index = 0,
  source,
  size,
  parentSize,
  previewMode,
  onClickX = () => {},
}) {
  return (
    <EmojiSticker
      index={index}
      source={source ? { uri: source } : null}
      size={size}
      parentSize={parentSize}
      previewMode={previewMode}
      onClickX={onClickX}
    />
  );
});
