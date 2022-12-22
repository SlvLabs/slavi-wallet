import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import SettingsScreen from '../containers/settings/SettingsScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import MnemonicExportScreen from '../containers/settings/mnemonic-export-screen';
import MnemonicImportScreen from '../containers/settings/mnemonic-import-screen';
import LanguageScreen from '../containers/settings/language-screen';
import CurrencyScreen from '../containers/settings/currency-screen';
import InvalidateCachesScreen from '../containers/settings/invalidate-caches-screen';
import useTranslation from '../utils/use-translation';
import MainWalletConnectScreen from '../containers/wallet-connect/main-wallet-connect-screen';
import NotificationSettingsScreen from '../containers/settings/notification-settings-screen';
import SettingsSecurityStack from './settings-security-stack';
import {ReferralScreen} from '../containers/settings/referral-screen';

const StackNavigator = createStackNavigator();

const SettingsStack = () => {
  const {t} = useTranslation();

  return useMemo(
    () => (
      <StackNavigator.Navigator
        initialRouteName={ROUTES.SETTINGS.MAIN}
        headerMode={'screen'}
        screenOptions={defaultScreenOption}>
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.MAIN}
          component={SettingsScreen}
          options={{title: t('Settings')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.EXPORT_MNEMONIC}
          component={MnemonicExportScreen}
          options={{title: t('Your Secret Phrase')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.IMPORT_MNEMONIC}
          component={MnemonicImportScreen}
          options={{title: t('Import new mnemonic')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.CURRENCY_CHANGE}
          component={CurrencyScreen}
          options={{title: t('Change currency')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.LANGUAGE}
          component={LanguageScreen}
          options={{title: t('Set default language')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.INVALIDATE_CACHES}
          component={InvalidateCachesScreen}
          options={{title: t('Invalidate some caches')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.NOTIFICATION_SETTINGS}
          component={NotificationSettingsScreen}
          options={{title: t('PushNotificationHeader')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.WALLET_CONNECT}
          component={MainWalletConnectScreen}
          options={{title: t('walletConnect')}}
        />
        <StackNavigator.Screen
          name={ROUTES.SETTINGS.REFERRAL}
          component={ReferralScreen}
          options={{title: t('referralTitle')}}
        />
        <StackNavigator.Screen name={ROUTES.SETTINGS.SECURITY} component={SettingsSecurityStack} />
      </StackNavigator.Navigator>
    ),
    [t],
  );
};

export default SettingsStack;
