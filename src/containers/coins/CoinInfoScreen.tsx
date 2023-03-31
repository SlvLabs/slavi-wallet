import React, {useCallback, useEffect, useMemo} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CoinInfoRouteProps} from '../../navigation/CoinsStack';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import ROUTES from '../../navigation/config/routes';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import store from '@slavi/wallet-core/src/store';
import CoinTabs from '../../components/coin-info/tabs/coin-tabs';
import CoinControlButtons from '../../components/coin-info/coin-control-buttons';
import {CoinParams} from '../../components/coin-info/tabs/info-view';
import {useCoinInfo, useCoinSpecsService} from '@slavi/wallet-core';
import useTranslation from '../../utils/use-translation';
import ScrollableScreen from '../../components/scrollable-screen';

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

  const {t} = useTranslation();

  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';

  const specService = useCoinSpecsService();

  const spec = useMemo(() => specService.getSpec(coin), [specService, coin]);

  const onPressReceive = useCallback(() => {
    navigation.navigate(ROUTES.COINS.RECEIVE, {
      coin: coin,
    });
  }, [coin, navigation]);

  const onPressBuy = useCallback(() => {
    navigation.navigate(ROUTES.COINS.BUY_COIN, {
      coin: data.id,
      ticker: data.ticker,
    });
  }, [data, navigation]);

  const onPressSend = useCallback(() => {
    navigation.navigate(ROUTES.COINS.SEND, {
      coin: coin,
    });
  }, [coin, navigation]);

  const onPressExchange = useCallback(() => {
    if (spec?.swap) {
      navigation.navigate(ROUTES.TABS.SWAP, {
        screen: ROUTES.SWAP.MAIN,
        params: {
          network: data.parent ?? coin,
          srcCoin: coin,
        },
      });
    }
  }, [spec, coin, data, navigation]);

  const {
    state: {list, dict, isLoading},
    request,
  } = useCoinInfo(coin);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <ScrollableScreen title={t('Coin information')}>
      <CoinBalanceHeader
        name={data.name}
        balance={data.balance}
        cryptoBalance={data.cryptoBalance}
        cryptoTicker={data.crypto}
        fiatBalance={data.fiatBalance}
        fiatTicker={data.fiat}
        logo={data.logo}
        type={data.type}
        ticker={data.ticker}
      />
      <CoinControlButtons
        onPressExchange={onPressExchange}
        onPressReceive={onPressReceive}
        onPressSend={onPressSend}
        onPressBuy={onPressBuy}
        exchangeDisabled={!spec?.swap}
        buyEnabled={spec?.buyAllowed || false}
      />
      <CoinTabs
        infoParams={list || []}
        fiat={fiat}
        crypto={crypto}
        infoIsLoading={isLoading}
        coin={coin}
        coinParams={dict as unknown as CoinParams}
      />
    </ScrollableScreen>
  );
};

export default CoinInfoScreen;
