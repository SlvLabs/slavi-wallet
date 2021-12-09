import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AuthenticationStack from './AuthenticationStack';
import AccountInitializationStack from './AccountInitializationStack';
import AccountReadyScreen from '../containers/account-initialization/AccountReadyScreen';
import UpdateRequiredScreen from '../containers/update-required-screen';
import ApplicationTabs from './ApplicationTabs';

interface MainNavigatorProps {
  isInitialized: boolean;
  isAuthorized: boolean;
  isAccountInitialized: boolean;
  isLoading: boolean;
  isInitializationFinished: boolean;
  isUpdateRequired: boolean;
}

const MainNavigator = (props: MainNavigatorProps) => {
  if(props.isUpdateRequired) {
    return <UpdateRequiredScreen />
  }

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

  return <ApplicationTabs />;
};

export default MainNavigator;
