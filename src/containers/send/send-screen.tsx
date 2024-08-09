import React from 'react';
import {useRoute} from '@react-navigation/core';
import {CoinSendRouteProps} from '../../navigation/CoinsStack';
import useCoinPattern from '@slavi/wallet-core/src/store/modules/coins/use-coin-pattern';
import SendBtcScreen from './send-btc-screen';
import SendEthScreen from './send-eth-screen';
import getHandlerByPattern from '@slavi/wallet-core/src/services/coin-pattern/utils/select-handler-by-pattern';
import {
  BTC_PATTERN,
  ERC20_PATTERN,
  ETH_PATTERN,
  MINA_PATTERN,
  POLKA_PATTERN,
  SOLANA_PATTERN,
  TRC10_PATTERN,
  TRC20_PATTERN,
  TRON_PATTERN,
  SOLANA_SPL_PATTERN,
} from '@slavi/wallet-core/src/services/coin-pattern/utils/pattern-names';
import SendErc20Screen from './send-erc20-screen';
import SendPolkadotScreen from './send-polkadot';
import SendSolanaScreen from './send-solana-screen';
import SendTronScreen from './send-tron-screen';
import SendTrc10Screen from './send-trc10-screen';
import SendTrc20Screen from './send-trc20-screen';
import SendMinaScreen from './send-mina-screen';
import SendSolanaSplScreen from './send-solana-spl-screen';

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
    [SOLANA_PATTERN, <SendSolanaScreen coin={coin} />],
    [TRON_PATTERN, <SendTronScreen coin={coin} />],
    [TRC10_PATTERN, <SendTrc10Screen coin={coin} />],
    [TRC20_PATTERN, <SendTrc20Screen coin={coin} />],
    [MINA_PATTERN, <SendMinaScreen coin={coin} />],
    [SOLANA_SPL_PATTERN, <SendSolanaSplScreen coin={coin} />],
  ]);

  const screen = getHandlerByPattern(pattern, screensMap);
  if (!screen) {
    throw new Error('not found renderer for pattern ' + pattern);
  }

  return screen;
};

export default SendScreen;
