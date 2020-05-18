import LoadingScreen from '../containers/LoadingScreen';
import React from 'react';
import InitializationStack from './InitializationStack';
import AuthenticationStack from './AuthenticationStack';
import AccountInitializationStack from './AccountInitializationStack';
import ApplicationDrawer from './ApplicationDrawer';

interface MainNavigatorProps {
  isInitialized: boolean;
  isAuthorized: boolean;
  isAccountInitialized: boolean;
  isLoading: boolean;
}

const MainNavigator = (props: MainNavigatorProps) => {
  if (props.isLoading) {
    return <LoadingScreen loadingText={'Loading'} />;
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

  return <ApplicationDrawer />;
};

export default MainNavigator;
