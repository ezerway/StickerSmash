const Original = 'Original';
const Juno = 'Juno';
const Sepia = 'Sepia';
const Grayscale = 'Grayscale';
const Gingham = 'Gingham';
const Mayfair = 'Mayfair';
const Valencia = 'Valencia';

const styleMap = {
  [Original]: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [Juno]: [1, 0, 0, 0, 0, -0.4, 1.3, -0.4, 0.2, -0.1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [Grayscale]: [
    0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0, 0,
    0, 1, 0,
  ],
  [Sepia]: [
    0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0,
  ],
  [Gingham]: [2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0.5, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [Mayfair]: [1, 1, 0.5, 0, 0, 0, 0.5, 1, 0, 0, 0.5, 0.5, 1, 0, 0, 0, 0, 0, 1, 0],
  [Valencia]: [1, 0, 0, 0, 0, -0.2, 1, 0, 0, 0, -0.8, 1.6, 1, 0, 0, 0, 0, 0, 1, 0],
};

const allowedFilters = [Original, Juno, Sepia, Grayscale, Gingham, Mayfair, Valencia].map(
  (type) => ({
    type,
    label: type,
    style: styleMap[type],
  })
);

const OriginalFilter = {
  type: Original,
  label: Original,
  style: styleMap[Original],
};

export {
  Original,
  Juno,
  Sepia,
  Grayscale,
  Gingham,
  Mayfair,
  Valencia,
  allowedFilters,
  OriginalFilter,
};