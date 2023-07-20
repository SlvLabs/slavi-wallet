import {Platform} from 'react-native';
import {getReadableVersion, getVersion} from 'react-native-device-info';

export function getAppVersion() {
  return Platform.OS === 'ios' ? getReadableVersion() : getVersion();
}
