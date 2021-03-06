import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import NotificationListScreen from '../containers/notification/notification-list-screen';
import useTranslation from '../utils/use-translation';

const StackNavigator = createStackNavigator();

const NotificationStack = () => {
  const {t} = useTranslation();
  return useMemo(() =>(
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
  ), []);
};

export default NotificationStack;
