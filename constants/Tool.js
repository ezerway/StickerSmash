const Sticker = 'Sticker';
const Text = 'Text';
const Filter = 'Filter';
const Image = 'Image';

const allowedTools = [Sticker, Text, Filter, Image].map((type) => ({
  type,
  label: type,
  image: null,
}));

export { Sticker, Text, Filter, Image, allowedTools };
