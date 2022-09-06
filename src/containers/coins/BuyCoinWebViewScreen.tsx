import {StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {CoinBuyWebViewProps} from '../../navigation/CoinsStack';
import WebView from 'react-native-webview';
import SafeAreaView from 'react-native-safe-area-view';

export const BuyCoinWebViewScreen = () => {
  const route = useRoute<CoinBuyWebViewProps>();
  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always', bottom: 'never'}}>
      <WebView source={{uri: route.params.url}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
