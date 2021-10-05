import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../containers/authentification/LoginScreen';
import RestoreScreen from '../containers/authentification/RestoreScreen';
import ROUTES from './config/routes';

const AuthenticationStack = () => {
  const StackNavigator = createStackNavigator();
  // TODO: change header
  return (
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
  );
};

export default AuthenticationStack;
