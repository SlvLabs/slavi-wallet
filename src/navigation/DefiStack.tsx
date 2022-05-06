import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import DefiScreen from '../containers/defi/defi-screen';
import useTranslation from '../utils/use-translation';

const StackNavigator = createStackNavigator();

const DefiStack = () => {
  return useMemo(() => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.DEFI.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.DEFI.MAIN}
        component={DefiScreen}
        options={{headerShown: false}}
      />
    </StackNavigator.Navigator>
  ), []);
}

export default DefiStack;
