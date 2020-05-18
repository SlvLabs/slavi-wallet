import React from 'react';
import {useRoute} from '@react-navigation/core';
import {CoinSendRouteProps} from '../../navigation/CoinsStack';
import useCoinPattern from '@slavi/wallet-core/src/store/modules/coins/use-coin-pattern';
import SendBtcScreen from './send-btc-screen';
import SendEthScreen from './send-eth-screen';
import getHandlerByPattern from '@slavi/wallet-core/src/services/coin-pattern/utils/select-handler-by-pattern';
import {
  BTC_PATTERN,
  ETH_PATTERN,
  ERC20_PATTERN,
  POLKA_PATTERN,
} from '@slavi/wallet-core/src/services/coin-pattern/utils/pattern-names';
import SendErc20Screen from './send-erc20-screen';
import SendPolkadotScreen from './send-polkadot';

const SendScreen = () => {
  const route = useRoute<CoinSendRouteProps>();
  const coin = route.params?.coin;
  if (!coin) {
    throw new Error('Unknown coin for sending');
  }

  const pattern = useCoinPattern(coin);
  if (!pattern) {
    throw new Error('Coin with unknown pattern for sending');
  }

  const screensMap = new Map<string, any>([
    [BTC_PATTERN, <SendBtcScreen coin={coin} />],
    [ETH_PATTERN, <SendEthScreen coin={coin} />],
    [ERC20_PATTERN, <SendErc20Screen coin={coin} />],
    [POLKA_PATTERN, <SendPolkadotScreen coin={coin} />],
  ]);

  const screen = getHandlerByPattern(pattern, screensMap);
  if (!screen) {
    throw new Error('not found renderer for pattern ' + pattern);
  }

  return screen;
};

export default SendScreen;
