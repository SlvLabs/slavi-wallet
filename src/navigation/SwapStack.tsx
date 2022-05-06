import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import SwapScreen from '../containers/swap/swap-screen';
import useTranslation from '../utils/use-translation';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';

export interface SwapStackParamList extends ParamListBase {
  swap: {
    network: string;
    srcCoin: string;
  }
}

export type CoinSwapRouteProps = RouteProp<SwapStackParamList, 'swap'>;

const StackNavigator = createStackNavigator<SwapStackParamList>();

const SwapStack = () => {
  const {t} = useTranslation();

  return useMemo( () => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.SWAP.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.SWAP.MAIN}
        component={SwapScreen}
        options={{title: t('Swap'), headerShown: false}}
      />
    </StackNavigator.Navigator>
  ), []);
}

export default SwapStack;
