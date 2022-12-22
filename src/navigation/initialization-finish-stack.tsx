import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import ROUTES from './config/routes';
import defaultScreenOption from './config/default-screen-options';
import AccountReadyScreen from '../containers/finish-initialization/account-ready-screen';
import {InitializationReferralScreen} from '../containers/finish-initialization/initialization-referral-screen';
import {ParamListBase} from '@react-navigation/routers';
import {RouteProp} from '@react-navigation/native';

interface InitializationFinishStackParamList extends ParamListBase {
  ready: {};
  referral: {
    invitingCode: string | null;
    codeLen: number;
  };
}

export type ReferralRouteProps = RouteProp<InitializationFinishStackParamList, 'referral'>;

const StackNavigator = createStackNavigator<InitializationFinishStackParamList>();

const InitializationFinishStack = () => {
  return useMemo(
    () => (
      <StackNavigator.Navigator
        initialRouteName={ROUTES.ACCOUNT_INITIALIZATION.READY}
        headerMode={'none'}
        screenOptions={defaultScreenOption}>
        <StackNavigator.Screen name={ROUTES.ACCOUNT_INITIALIZATION.READY} component={AccountReadyScreen} />
        <StackNavigator.Screen name={ROUTES.ACCOUNT_INITIALIZATION.REFERRAL} component={InitializationReferralScreen} />
      </StackNavigator.Navigator>
    ),
    [],
  );
};

export default InitializationFinishStack;
