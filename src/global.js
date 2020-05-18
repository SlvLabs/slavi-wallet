global.process = require('process');

global.Buffer = require('buffer').Buffer;

global.crypto = require('react-native-crypto');

if (!__DEV__) {
  global.process.env.NODE_ENV = 'production';
}
