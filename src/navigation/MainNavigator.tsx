import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AuthenticationStack from './AuthenticationStack';
import AccountInitializationStack from './AccountInitializationStack';
import ApplicationDrawer from './ApplicationDrawer';
import AccountReadyScreen from '../containers/account-initialization/AccountReadyScreen';

interface MainNavigatorProps {
  isInitialized: boolean;
  isAuthorized: boolean;
  isAccountInitialized: boolean;
  isLoading: boolean;
  isInitializationFinished: boolean;
}

const MainNavigator = (props: MainNavigatorProps) => {
  if (props.isLoading) {
    return <LoadingScreen />;
  }

  if (!props.isInitialized) {
    return <InitializationStack />;
  }

  if (!props.isAuthorized) {
    return <AuthenticationStack />;
  }

  if (!props.isAccountInitialized) {
    return <AccountInitializationStack />;
  }

  if(props.isInitializationFinished) {
    return <AccountReadyScreen />
  }

  return <ApplicationDrawer />;
};

export default MainNavigator;
