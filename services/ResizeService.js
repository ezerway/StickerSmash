function getFitSize(originSize = {}, containerSize = {}) {
  if (containerSize.width >= originSize.width && containerSize.height >= originSize.height) {
    return {
      width: originSize.width,
      height: originSize.height,
    };
  }
  const isPortrait = originSize.width < originSize.height;
  const ratio = originSize.width / originSize.height;

  if (isPortrait) {
    const height = containerSize.height;
    const width = height * ratio;

    let delta = 1;

    if (width > containerSize.width) {
      delta = containerSize.width / width;
    }

    return {
      height: height * delta,
      width: width * delta,
    };
  }

  const width = containerSize.width;
  const height = width * ratio;

  let delta = 1;

  if (height > containerSize.height) {
    delta = containerSize.height / height;
  }

  return {
    height: height * delta,
    width: width * delta,
  };
}

export { getFitSize };
