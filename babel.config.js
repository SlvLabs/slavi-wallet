module.exports = {
  presets: ['module:metro-react-native-babel-preset', ['@babel/preset-typescript', {allowDeclareFields: true}]],
  plugins: [
    '@babel/plugin-syntax-bigint',
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-class-static-block',
  ],
};
