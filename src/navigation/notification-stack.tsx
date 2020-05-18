import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import {useTranslation} from 'react-i18next';
import NotificationListScreen from '../containers/notification/notification-list-screen';

const NotificationStack = () => {
  const StackNavigator = createStackNavigator();
  const {t} = useTranslation();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.NOTIFICATION.LIST}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.NOTIFICATION.LIST}
        component={NotificationListScreen}
        options={{title: t('Notifications')}}
      />
    </StackNavigator.Navigator>
  );
};

export default NotificationStack;
