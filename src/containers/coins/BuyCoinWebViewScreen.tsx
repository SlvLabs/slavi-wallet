import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CoinBuyWebViewProps} from '../../navigation/CoinsStack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import WebView from 'react-native-webview';

export const BuyCoinWebViewScreen = () => {
  const route = useRoute<CoinBuyWebViewProps>();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const onWebViewMessage = useCallback(
    (e: WebViewMessageEvent) => {
      if (e.nativeEvent.data === 'success') {
        navigation.goBack();
        //navigation.navigate(ROUTES.COINS.LIST);
      } else if (e.nativeEvent.data === 'failed') {
        navigation.goBack();
      }
    },
    [navigation],
  );
  return (
    <View style={{...styles.container, paddingTop: insets.top}}>
      <WebView source={{uri: route.params.url}} onMessage={onWebViewMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
