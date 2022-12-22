import {createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import OperationsListScreen from '../containers/operations/OperationsListScreen';
import defaultScreenOption from './config/default-screen-options';
import ROUTES from './config/routes';
import useTranslation from '../utils/use-translation';
import {ParamListBase} from '@react-navigation/routers';
import {RouteProp} from '@react-navigation/native';
import {OperationDetailsScreen} from '../containers/operations/operation-details-screen';

export interface OperationsStackParamsList extends ParamListBase {
  List: {};
  Details: {
    id: number;
  };
}

export type OperationListRouteProps = RouteProp<OperationsStackParamsList, 'List'>;
export type OperationDetailsRouteProps = RouteProp<OperationsStackParamsList, 'Details'>;

const StackNavigator = createStackNavigator<OperationsStackParamsList>();

const OperationsStack = () => {
  const {t} = useTranslation();
  return useMemo(
    () => (
      <StackNavigator.Navigator
        initialRouteName={ROUTES.OPERATIONS.LIST}
        headerMode={'screen'}
        screenOptions={defaultScreenOption}>
        <StackNavigator.Screen
          name={ROUTES.OPERATIONS.LIST}
          component={OperationsListScreen}
          options={{title: t('Operations history')}}
        />
        <StackNavigator.Screen name={ROUTES.OPERATIONS.DETAILS} component={OperationDetailsScreen} />
      </StackNavigator.Navigator>
    ),
    [t],
  );
};

export default OperationsStack;
