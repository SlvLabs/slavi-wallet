import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AccountInitializationStack from './AccountInitializationStack';
import UpdateRequiredScreen from '../containers/update-required-screen';
import ApplicationTabs from './ApplicationTabs';
import HelpPageScreen from '../containers/account-initialization/HelpPageScreen';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './navigate';
import AccountReadyScreen from '../containers/finish-initialization/account-ready-screen';
import {InitializationReferralScreen} from '../containers/finish-initialization/initialization-referral-screen';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from './config/routes';

interface MainNavigatorProps {
  isInitialized: boolean;
  isAccountInitialized: boolean;
  isLoading: boolean;
  isInitializationFinished: boolean;
  isUpdateRequired: boolean;
  helpShow: boolean;
  isReferralShow: boolean;
}

const Stack = createStackNavigator();

function getDefaultRoute(props: MainNavigatorProps) {
  if (props.isInitializationFinished) {
    return ROUTES.MAIN.ACCOUNT_READY;
  }

  if (props.helpShow) {
    return ROUTES.MAIN.HELP;
  }

  if (props.isReferralShow) {
    return ROUTES.MAIN.REFERRAL;
  }

  return ROUTES.MAIN.TABS;
}

const MainNavigator = (props: MainNavigatorProps) => {
  if (props.isUpdateRequired) {
    return <UpdateRequiredScreen />;
  }

  if (props.isLoading) {
    return <LoadingScreen />;
  }

  if (!props.isInitialized) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <InitializationStack />
      </NavigationContainer>
    );
  }

  if (!props.isAccountInitialized) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <AccountInitializationStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef} onReady={() => isReadyRef.resolve()}>
      <Stack.Navigator initialRouteName={getDefaultRoute(props)} screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.MAIN.ACCOUNT_READY} component={AccountReadyScreen} />
        <Stack.Screen name={ROUTES.MAIN.HELP} component={HelpPageScreen} />
        <Stack.Screen name={ROUTES.MAIN.REFERRAL} component={InitializationReferralScreen} />
        <Stack.Screen name={ROUTES.MAIN.TABS} component={ApplicationTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
