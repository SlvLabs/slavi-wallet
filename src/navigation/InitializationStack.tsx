import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import InitializeLocalizationScreen from '../containers/initialization/InitializeLocalizationScreen';
import InitializationPasscodeScreen from '../containers/initialization/InitializationPasscodeScreen';
import LicenseAgreementScreen from '../containers/initialization/LicenseAgreementScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import useTranslation from '../utils/use-translation';

const StackNavigator = createStackNavigator();

const InitializationStack = () => {
  const {t} = useTranslation();

  return useMemo( () => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.INITIALIZATION.LOCALIZATION}
      headerMode={'screen'}
      screenOptions={{...defaultScreenOption, headerShown: false}}>
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.LOCALIZATION}
        component={InitializeLocalizationScreen}
        options={{title: t('Welcome to slavi wallet')}}
      />
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.PASSCODE}
        component={InitializationPasscodeScreen}
        options={{title: t('Set passcode')}}
      />
      <StackNavigator.Screen
        name={ROUTES.INITIALIZATION.LICENSE_AGREEMENT}
        component={LicenseAgreementScreen}
        options={{title: t('Licence')}}
      />
    </StackNavigator.Navigator>
  ), []);
}

export default InitializationStack;
