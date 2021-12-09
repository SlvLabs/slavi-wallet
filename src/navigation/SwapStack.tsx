import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import SwapScreen from '../containers/swap/swap-screen';

const StackNavigator = createStackNavigator();

const SwapStack = () => useMemo( () => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.SWAP.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.SWAP.MAIN}
        component={SwapScreen}
        options={{title: 'Swap'}}
      />
    </StackNavigator.Navigator>
  ), []);

export default SwapStack;
