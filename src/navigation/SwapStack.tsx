import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import SwapScreen from '../containers/swap/swap-screen';

const SwapStack = () => {
  const StackNavigator = createStackNavigator();
  return (
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
  );
};

export default SwapStack;
