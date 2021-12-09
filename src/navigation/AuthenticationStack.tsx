import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import LoginScreen from '../containers/authentification/LoginScreen';
import RestoreScreen from '../containers/authentification/RestoreScreen';
import ROUTES from './config/routes';

const StackNavigator = createStackNavigator();

const AuthenticationStack = () => useMemo(() => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.AUTHENTICATION.LOGIN}
      headerMode={'screen'}>
      <StackNavigator.Screen
        name={ROUTES.AUTHENTICATION.LOGIN}
        component={LoginScreen}
      />
      <StackNavigator.Screen
        name={ROUTES.AUTHENTICATION.RESTORE}
        component={RestoreScreen}
      />
    </StackNavigator.Navigator>
  ), []);

export default AuthenticationStack;
