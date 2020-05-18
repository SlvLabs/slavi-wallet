import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import ApplicationTabs from './ApplicationTabs';
import BillingStack from './BillingStack';
import SettingsStack from './SettingsStack';
import ROUTES from './config/routes';
import WalletDrawer from '../components/drawer/wallet-drawer';
import NotificationStack from './notification-stack';

const ApplicationDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.DRAWER.TABS}
      drawerContent={({navigation, state}) => (
        <WalletDrawer navigation={navigation} state={state} />
      )}>
      <Drawer.Screen name={ROUTES.DRAWER.TABS} component={ApplicationTabs} />
      <Drawer.Screen name={ROUTES.DRAWER.BILLING} component={BillingStack} />
      <Drawer.Screen name={ROUTES.DRAWER.SETTINGS} component={SettingsStack} />
      <Drawer.Screen
        name={ROUTES.DRAWER.NOTIFICATION}
        component={NotificationStack}
      />
    </Drawer.Navigator>
  );
};

export default ApplicationDrawer;
