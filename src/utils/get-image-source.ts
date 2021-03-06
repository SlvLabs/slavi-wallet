import {ImageSourcePropType} from 'react-native';
import {coinPlaceholder} from '../assets/images';
import Config from 'react-native-config';

const cdnURL = Config.CDN_URL;

const getImageSource = (uri?: string, placeholder?: string): ImageSourcePropType =>
  uri ? {uri: cdnURL + uri} : (placeholder || coinPlaceholder);

export default getImageSource;
