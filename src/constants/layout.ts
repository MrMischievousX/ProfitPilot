import {Dimensions, PixelRatio, Platform} from 'react-native';
import memoize from 'lodash.memoize';

const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth = 380;

export const isSmallDevice = width <= 375 && height <= 667 ? true : false;
export const guidelineBaseWidthAndroid = width <= 375 ? 400 : 380;

export const dp = memoize((size: number) => {
  let dim;
  if (Platform.OS === 'android') {
    dim = (width / guidelineBaseWidthAndroid) * size;
  } else {
    dim = (width / guidelineBaseWidth) * size;
  }

  dim = Math.round(PixelRatio.roundToNearestPixel(dim));

  if (isSmallDevice) {
    return dim * 0.92;
  }
  return dim;
});

export const window = {width, height};
