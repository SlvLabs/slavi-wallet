import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {CoinBuyWebViewProps} from '../../navigation/CoinsStack';
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const BuyCoinWebViewScreen = () => {
  const route = useRoute<CoinBuyWebViewProps>();
  const insets = useSafeAreaInsets();

  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <WebView source={{uri: route.params.url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});