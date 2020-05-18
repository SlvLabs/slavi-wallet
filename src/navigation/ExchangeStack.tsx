import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainExchangeScreen from '../containers/exchange/MainExchangeScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import {useTranslation} from 'react-i18next';

const ExchangeStack = () => {
  const StackNavigator = createStackNavigator();
  const {t} = useTranslation();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.EXCHANGE.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.EXCHANGE.MAIN}
        component={MainExchangeScreen}
        options={{title: t('Exchange')}}
      />
    </StackNavigator.Navigator>
  );
};

export default ExchangeStack;
