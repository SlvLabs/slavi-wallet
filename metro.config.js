/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('readable-stream'),
      vm: require.resolve('vm-browserify'),
      randomBytes: require.resolve('react-native-randombytes'),
    },
  },
};
