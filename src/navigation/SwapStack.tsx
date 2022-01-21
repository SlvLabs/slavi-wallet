import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import SwapScreen from '../containers/swap/swap-screen';
import useTranslation from '../utils/use-translation';

const StackNavigator = createStackNavigator();

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
        options={{title: t('Swap')}}
      />
    </StackNavigator.Navigator>
  ), []);
}

export default SwapStack;
