import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import EarnScreen from '../containers/earn/earn-screen';
import {WalletStakingEarnScreen} from '../containers/earn/wallet-staking-earn-screen';
import {ParamListBase} from '@react-navigation/routers';
import {RouteProp} from '@react-navigation/native';

export interface EarnStackParamList extends ParamListBase {
  Main: {};
  Investment: {
    coin: string;
    showAddresses: boolean;
    disabled: boolean;
  };
}

export type EarnMainRouteProps = RouteProp<EarnStackParamList, 'Main'>;
export type EarnInvestmentRouteProps = RouteProp<EarnStackParamList, 'Investment'>;

const StackNavigator = createStackNavigator<EarnStackParamList>();

const EarnStack = () => {
  return useMemo(
    () => (
      <StackNavigator.Navigator
        initialRouteName={ROUTES.EARN.MAIN}
        screenOptions={defaultScreenOption}>
        <StackNavigator.Screen name={ROUTES.EARN.MAIN} component={EarnScreen} options={{headerShown: false}} />
        <StackNavigator.Screen name={ROUTES.EARN.INVESTMENT} component={WalletStakingEarnScreen} options={{headerShown: false}} />
      </StackNavigator.Navigator>
    ),
    [],
  );
};

export default EarnStack;
