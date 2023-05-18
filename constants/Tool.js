const Sticker = 'Sticker';
const Text = 'Text';
const Filter = 'Filter';
const Image = 'Image';

const iconMap = {
  [Sticker]: 'sticker-emoji',
  [Text]: 'format-color-text',
  [Filter]: 'image-filter-black-white',
  [Image]: 'file-image-plus',
}

const allowedTools = [Sticker, Text, Filter, Image].map((type) => ({
  type,
  label: type,
  icon: iconMap[type],
}));

export { Sticker, Text, Filter, Image, allowedTools };
