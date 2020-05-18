import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OperationsListScreen from '../containers/operations/OperationsListScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import {useTranslation} from 'react-i18next';

const OperationsStack = () => {
  const StackNavigator = createStackNavigator();
  const {t} = useTranslation();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.OPERATIONS.LIST}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.OPERATIONS.LIST}
        component={OperationsListScreen}
        options={{title: t('Operations history')}}
      />
    </StackNavigator.Navigator>
  );
};

export default OperationsStack;
