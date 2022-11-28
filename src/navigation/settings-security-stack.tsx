import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import ROUTES from './config/routes';
import defaultScreenOption from './config/default-screen-options';
import useTranslation from '../utils/use-translation';
import SecurityScreen from '../containers/settings/security-screen';
import {usePinProtection} from '../hooks/usePinProtection';
import AutoBlockingScreen from '../containers/settings/auto-blocking-screen';

const StackNavigator = createStackNavigator();

const SettingsSecurityStack = () =>  {
  const {t} = useTranslation();

  usePinProtection();

  return useMemo(() => (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.SETTINGS_SECURITY.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.SETTINGS_SECURITY.MAIN}
        component={SecurityScreen}
        options={{title: t('security')}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS_SECURITY.AUTO_BLOCKING}
        component={AutoBlockingScreen}
        options={{title: t('autoBlocking')}}
      />
    </StackNavigator.Navigator>
  ), []);
}

export default SettingsSecurityStack;
