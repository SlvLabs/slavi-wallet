import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import CoinsListScreen from '../containers/coins/CoinsListScreen';
import CoinInfoScreen from '../containers/coins/CoinInfoScreen';
import defaultScreenOption from './config/default-screen-options';
import {ParamListBase} from '@react-navigation/routers';
import {RouteProp} from '@react-navigation/native';
import ROUTES from './config/routes';
import ReceiveScreen from '../containers/coins/ReceiveScreen';
import SendScreen from '../containers/send/send-screen';
import TokenAddingScreen from '../containers/coins/token-adding-screen';
import SuccessfullySendingScreen from '../containers/send/successfully-sending-screen';
import CoinSelectListScreen from '../containers/coins/coin-select-list-screen';
import useTranslation from '../utils/use-translation';
import NftInfoScreen from '../containers/nft/nft-info-screen';
import NftSendScreen from '../containers/nft/nft-send-screen';
import NtfSuccessSendingScreen from '../containers/nft/ntf-success-sending-screen';
import BuyCoinScreen from '../containers/coins/BuyCoinScreen';
import {BuyCoinWebViewScreen} from '../containers/coins/BuyCoinWebViewScreen';
import ScreenHeader from '../components/screen-header';
import {CoinFullListScreen} from '../containers/coins/coin-full-list-screen';

export interface CoinsStackParamList extends ParamListBase {
  List: {};
  Info: {
    coin: string;
  };
  Receive: {
    coin: string;
  };
  BuyCoin: {
    coin: string;
    ticker: string;
  };
  BuyCoinWebView: {
    url: string;
    ticker: string;
  };
  Send: {
    coin: string;
  };
  TokenAdding: {};
  SuccessfullySending: {
    recipients: {
      address: string;
      amount: string;
    }[];
    coin: string;
  };
  NftInfo: {
    network: string;
    contract: string;
    id: string;
  };
  NftSend: {
    network: string;
    contract: string;
    id: string;
  };
  NftSuccess: {
    name: string;
    from: string;
    to: string;
    amount?: string;
    ticker?: string;
    image?: string;
  };
}

export type CoinInfoRouteProps = RouteProp<CoinsStackParamList, 'Info'>;
export type CoinReceiveRouteProps = RouteProp<CoinsStackParamList, 'Receive'>;
export type CoinBuyRouteProps = RouteProp<CoinsStackParamList, 'BuyCoin'>;
export type CoinBuyWebViewProps = RouteProp<CoinsStackParamList, 'BuyCoinWebView'>;
export type CoinSendRouteProps = RouteProp<CoinsStackParamList, 'Send'>;
export type CoinSuccessfullySendingRouteProps = RouteProp<CoinsStackParamList, 'SuccessfullySending'>;
export type NftInfoRouteProps = RouteProp<CoinsStackParamList, 'NftInfo'>;
export type NftSendRouteProps = RouteProp<CoinsStackParamList, 'NftSend'>;
export type NftSuccessRouteProps = RouteProp<CoinsStackParamList, 'NftSuccess'>;

const StackNavigator = createStackNavigator<CoinsStackParamList>();

const CoinsStack = () => {
  const {t} = useTranslation();
  return useMemo(
    () => (
      <StackNavigator.Navigator
        initialRouteName={ROUTES.COINS.LIST}
        screenOptions={defaultScreenOption}>
        <StackNavigator.Screen
          name={ROUTES.COINS.LIST}
          component={CoinsListScreen}
          options={{headerShown: false, headerTransparent: true}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.INFO}
          component={CoinInfoScreen}
          options={{title: t('Coin information')}}
        />
        <StackNavigator.Screen name={ROUTES.COINS.SEND} component={SendScreen} options={{title: t('Send coins')}} />
        <StackNavigator.Screen
          name={ROUTES.COINS.RECEIVE}
          component={ReceiveScreen}
          options={{title: t('Receive coins')}}
        />
        <StackNavigator.Screen name={ROUTES.COINS.BUY_COIN} component={BuyCoinScreen} />
        <StackNavigator.Screen
          name={ROUTES.COINS.BUY_COIN_WEB_VIEW}
          component={BuyCoinWebViewScreen}
          options={({route}) => {
            const params = route.params as CoinsStackParamList['BuyCoin'];
            return {title: t('Buy') + (params?.ticker ? ' ' + params?.ticker : '')};
          }}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.TOKEN_ADDING}
          component={TokenAddingScreen}
          options={{title: t('Add custom token')}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.SUCCESSFULLY_SENDING}
          component={SuccessfullySendingScreen}
          options={{title: t('Send coins')}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.COINS_SELECT}
          component={CoinSelectListScreen}
          options={{title: t('Select coin'), headerShown: false}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.NFT_INFO}
          component={NftInfoScreen}
          options={{header: () => <ScreenHeader title={t('nftExplorer')} />}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.NFT_SEND}
          component={NftSendScreen}
          options={{header: () => <ScreenHeader title={t('nftSendTitle')} />}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.NFT_SUCCESS}
          component={NtfSuccessSendingScreen}
          options={{headerShown: false}}
        />
        <StackNavigator.Screen
          name={ROUTES.COINS.FULL_LIST}
          component={CoinFullListScreen}
          options={{headerShown: false}}
        />
      </StackNavigator.Navigator>
    ),
    [t],
  );
};

export default CoinsStack;
