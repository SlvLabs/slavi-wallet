import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AccountMenuScreen from '../containers/account-initialization/AccountMenuScreen';
import ImportAccountMenuScreen from '../containers/account-initialization/import/ImportAccountMenuScreen';
import CreateMnemonicScreen from '../containers/account-initialization/create/CreateMnemonicScreen';
import ConfirmMnemonicScreen from '../containers/account-initialization/create/ConfirmMnemonicScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';

const AccountInitializationStack = () => {
  const StackNavigator = createStackNavigator();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.ACCOUNT_INITIALIZATION.MENU}
      headerMode={'screen'}
      screenOptions={{...defaultScreenOption, headerShown: false}}>
      <StackNavigator.Screen
        name={ROUTES.ACCOUNT_INITIALIZATION.MENU}
        component={AccountMenuScreen}
        options={{title: 'Account creating'}}
      />
      <StackNavigator.Screen
        name={ROUTES.ACCOUNT_INITIALIZATION.IMPORT_MENU}
        component={ImportAccountMenuScreen}
        options={{title: 'Account importing'}}
      />
      <StackNavigator.Screen
        name={ROUTES.ACCOUNT_INITIALIZATION.CREATE_MNEMONIC}
        component={CreateMnemonicScreen}
        options={{title: 'Mnemonic creation'}}
      />
      <StackNavigator.Screen
        name={ROUTES.ACCOUNT_INITIALIZATION.CONFIRM_MNEMONIC}
        component={ConfirmMnemonicScreen}
        options={{title: 'Mnemonic confirmation'}}
      />
    </StackNavigator.Navigator>
  );
};

export default AccountInitializationStack;
