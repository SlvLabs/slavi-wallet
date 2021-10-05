import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import DefiScreen from '../containers/defi/defi-screen';

const DefiStack = () => {
  const StackNavigator = createStackNavigator();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.DEFI.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.DEFI.MAIN}
        component={DefiScreen}
        options={{title: 'DeFi'}}
      />
    </StackNavigator.Navigator>
  );
};

export default DefiStack;
