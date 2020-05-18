import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BillingOperationsList from '../containers/billing/BillingOperationsList';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';

const BillingStack = () => {
  const StackNavigator = createStackNavigator();
  return (
    <StackNavigator.Navigator
      initialRouteName={ROUTES.BILLING.LIST}
      headerMode={'screen'}
      screenOptions={defaultScreenOption}>
      <StackNavigator.Screen
        name={ROUTES.BILLING.LIST}
        component={BillingOperationsList}
        options={{title: 'Billing operations'}}
      />
    </StackNavigator.Navigator>
  );
};

export default BillingStack;
