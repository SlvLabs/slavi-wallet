import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AccountInitializationStack from './AccountInitializationStack';
import AccountReadyScreen from '../containers/account-initialization/AccountReadyScreen';
import UpdateRequiredScreen from '../containers/update-required-screen';
import ApplicationTabs from './ApplicationTabs';
import HelpPageScreen from '../containers/account-initialization/HelpPageScreen';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './navigate';

interface MainNavigatorProps {
  isInitialized: boolean;
  isAccountInitialized: boolean;
  isLoading: boolean;
  isInitializationFinished: boolean;
  isUpdateRequired: boolean;
  helpShow: boolean;
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

  if (props.isInitializationFinished) {
    return <AccountReadyScreen />;
  }

  if (props.helpShow) {
    return <HelpPageScreen />;
  }

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef} onReady={() => isReadyRef.resolve() }>
      <ApplicationTabs />
    </NavigationContainer>
  );
};

export default MainNavigator;
