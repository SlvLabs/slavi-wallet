import {ImageSourcePropType} from 'react-native';
import {coinPlaceholder} from '../assets/images';
import Config from 'react-native-config';

const cdnURL = Config.CDN_URL;

const getImageSource = (uri?: string | ImageSourcePropType | null, placeholder?: string): ImageSourcePropType => {
  if (!uri || typeof uri === 'string') {
    return uri && cdnURL ? {uri: cdnURL + uri} : placeholder || coinPlaceholder;
  }
  return uri;
};

export default getImageSource;
