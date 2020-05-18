import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SettingsScreen from '../containers/settings/SettingsScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import MnemonicExportScreen from '../containers/settings/mnemonic-export-screen';
import MnemonicImportScreen from '../containers/settings/mnemonic-import-screen';
import LanguageScreen from '../containers/settings/language-screen';
import CurrencyScreen from '../containers/settings/currency-screen';
import InvalidateCachesScreen from '../containers/settings/invalidate-caches-screen';

const SettingsStack = () => {
  const StackNavigator = createStackNavigator();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.SETTINGS.MAIN}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.MAIN}
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.EXPORT_MNEMONIC}
        component={MnemonicExportScreen}
        options={{title: 'Export'}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.IMPORT_MNEMONIC}
        component={MnemonicImportScreen}
        options={{title: 'Import new mnemonic'}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.CURRENCY_CHANGE}
        component={CurrencyScreen}
        options={{title: 'Change currency'}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.LANGUAGE}
        component={LanguageScreen}
        options={{title: 'Set default language'}}
      />
      <StackNavigator.Screen
        name={ROUTES.SETTINGS.INVALIDATE_CACHES}
        component={InvalidateCachesScreen}
        options={{title: 'Invalidate some caches'}}
      />
    </StackNavigator.Navigator>
  );
};

export default SettingsStack;
