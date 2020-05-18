import {ImageSourcePropType} from 'react-native';
import {coinPlaceholder} from '../assets/images';
import Config from 'react-native-config';

const cdnURL = Config.CDN_URL;

const getImageSource = (uri?: string): ImageSourcePropType =>
  uri ? {uri: cdnURL + uri} : coinPlaceholder;

export default getImageSource;
