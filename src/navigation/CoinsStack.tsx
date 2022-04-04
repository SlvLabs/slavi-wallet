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

export interface CoinsStackParamList extends ParamListBase {
  List: {};
  Info: {
    coin: string;
  };
  Receive: {
    coin: string;
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
    ticker: string;
  };
}

export type CoinInfoRouteProps = RouteProp<CoinsStackParamList, 'Info'>;
export type CoinReceiveRouteProps = RouteProp<CoinsStackParamList, 'Receive'>;
export type CoinSendRouteProps = RouteProp<CoinsStackParamList, 'Send'>;
export type CoinSuccessfullySendingRouteProps = RouteProp<
  CoinsStackParamList,
  'SuccessfullySending'
>;

const StackNavigator = createStackNavigator<CoinsStackParamList>();

const CoinsStack = () => {
  const {t} = useTranslation();
  return useMemo( () => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.COINS.LIST}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.COINS.LIST}
        component={CoinsListScreen}
        options={{headerShown: false}}
      />
      <StackNavigator.Screen
        name={ROUTES.COINS.INFO}
        component={CoinInfoScreen}
        options={{title: t('Coin information')}}
      />
      <StackNavigator.Screen
        name={ROUTES.COINS.SEND}
        component={SendScreen}
        options={{title: t('Send coins')}}
      />
      <StackNavigator.Screen
        name={ROUTES.COINS.RECEIVE}
        component={ReceiveScreen}
        options={{title: t('Receive coins')}}
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
    </StackNavigator.Navigator>
  ), []);
};

export default CoinsStack;
