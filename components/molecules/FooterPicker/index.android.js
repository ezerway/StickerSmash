import { memo } from 'react';

import Base from './base';

export default memo(function FooterPicker({ label, visible, onClose, children }) {
  return <Base {...{ label, visible, onClose, children }} />;
});
