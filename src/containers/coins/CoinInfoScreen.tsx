import React, {useCallback, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CoinInfoRouteProps} from '../../navigation/CoinsStack';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import ROUTES from '../../navigation/config/routes';
import SimpleToast from 'react-native-simple-toast';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import useCoinInfo from '@slavi/wallet-core/src/providers/ws/hooks/use-coin-info';
import store from '@slavi/wallet-core/src/store';
import {ScrollView} from 'react-native-gesture-handler';
import CoinTabs from '../../components/coin-info/tabs/coin-tabs';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CoinControlButtons from '../../components/coin-info/coin-control-buttons';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const CoinInfoScreen = () => {
  const route = useRoute<CoinInfoRouteProps>();
  const coin = route.params?.coin;
  if (!coin) {
    throw new Error('Coin is required for details display');
  }
  const navigation = useNavigation();
  const data = useCoinDetails(coin);
  if (!data) {
    throw new Error('Unknown coin for details display');
  }

  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';

  const onPressReceive = useCallback(() => {
    navigation.navigate(ROUTES.COINS.RECEIVE, {
      coin: coin,
    });
  }, [coin, navigation]);

  const onPressSend = useCallback(() => {
    navigation.navigate(ROUTES.COINS.SEND, {
      coin: coin,
    });
  }, [coin, navigation]);

  const onPressExchange = useCallback(() => {
    SimpleToast.show('Coming soon', SimpleToast.LONG);
  }, []);

  const {
    state: {list, dict, isLoading},
    request,
  } = useCoinInfo(coin);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient {...theme.gradients.backgroundGradient} style={styles.gradient}>
        <ScrollView>
          <CoinBalanceHeader
            name={data.name}
            balance={data.balance}
            cryptoBalance={data.cryptoBalance}
            cryptoTicker={data.crypto}
            fiatBalance={data.fiatBalance}
            fiatTicker={data.fiat}
            logo={data.logo}
            type={data.type}
            extraContent={
              <CoinControlButtons
                onPressExchange={onPressExchange}
                onPressReceive={onPressReceive}
                onPressSend={onPressSend}
              />
            }
          />
          <CoinTabs
            infoParams={list || []}
            fiat={fiat}
            crypto={crypto}
            infoIsLoading={isLoading}
            coin={coin}
            coinParams={dict}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

export default CoinInfoScreen;
