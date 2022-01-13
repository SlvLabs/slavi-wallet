/**
 * @format
 */

//@ts-ignore - need for replace global nodejs object in react native
import TextEncoder from 'text-encoding';
import {AppRegistry, Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
