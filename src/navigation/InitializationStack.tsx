import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import InitializeLocalizationScreen from '../containers/initialization/InitializeLocalizationScreen';
import InitializationPasscodeScreen from '../containers/initialization/InitializationPasscodeScreen';
import LicenseAgreementScreen from '../containers/initialization/LicenseAgreementScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';

const InitializationStack = () => {
  const StackNavigator = createStackNavigator();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.INITIALIZATION.LOCALIZATION}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.LOCALIZATION}
        component={InitializeLocalizationScreen}
        options={{title: 'Welcome to slavi wallet'}}
      />
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.PASSCODE}
        component={InitializationPasscodeScreen}
        options={{title: 'Set passcode'}}
      />
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.LICENSE_AGREEMENT}
        component={LicenseAgreementScreen}
        options={{title: 'Licence'}}
      />
    </StackNavigator.Navigator>
  );
};

export default InitializationStack;
