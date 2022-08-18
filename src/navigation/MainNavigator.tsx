import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AccountInitializationStack from './AccountInitializationStack';
import AccountReadyScreen from '../containers/account-initialization/AccountReadyScreen';
import UpdateRequiredScreen from '../containers/update-required-screen';
import ApplicationTabs from './ApplicationTabs';
import HelpPageTabs from '../containers/account-initialization/HelpPageScreen';

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
    return <InitializationStack />;
  }

  if (!props.isAccountInitialized) {
    return <AccountInitializationStack />;
  }

  if (props.isInitializationFinished) {
    return <AccountReadyScreen />;
  }

  if (props.helpShow) {
    return <HelpPageTabs />;
  }

  return <ApplicationTabs />;
};

export default MainNavigator;
