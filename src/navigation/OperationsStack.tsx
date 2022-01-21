import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import OperationsListScreen from '../containers/operations/OperationsListScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import useTranslation from '../utils/use-translation';

const StackNavigator = createStackNavigator();

const OperationsStack = () => {
  const {t} = useTranslation();
  return useMemo(() => (
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
  ), []);
};

export default OperationsStack;
