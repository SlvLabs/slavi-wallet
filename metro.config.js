const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json', 'map'],
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('readable-stream'),
      vm: require.resolve('vm-browserify'),
      randomBytes: require.resolve('react-native-randombytes'),
      assert: require.resolve('assert'),
    },
  },
  maxWorkers: 2,
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
