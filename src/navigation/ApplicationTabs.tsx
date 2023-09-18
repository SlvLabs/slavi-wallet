import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import CoinsStack from './CoinsStack';
import OperationsStack from './OperationsStack';
import ROUTES from './config/routes';
import CustomIcon from '../components/custom-icon/custom-icon';
import theme from '../theme';
import SettingsStack from './SettingsStack';
import EarnStack from './earn-stack';
import SwapStack from './SwapStack';
import useTranslation from '../utils/use-translation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const icons = {
  [ROUTES.TABS.COINS]: 'wallet2',
  [ROUTES.TABS.DEFI]: 'defi2',
  [ROUTES.TABS.OPERATIONS]: 'history2',
  [ROUTES.TABS.SWAP]: 'swap2',
  [ROUTES.TABS.SETTINGS]: 'settings2',
};

const Tab = createBottomTabNavigator();

type GetScreenOptions = (a: {route: {name: string}}) => any;

export default function ApplicationTabs() {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const getScreenOptions: GetScreenOptions = useCallback(
    ({route}: {route: {name: string}}) => ({
      tabBarIcon: ({size, focused}: any) => {
        const name = icons[route.name];
        return (
          <View style={styles.tabElement}>
            <View
              style={{
                height: 10,
                width: 50,
                borderTopColor: focused ? theme.colors.borderGreen : 'transparent',
                borderTopWidth: 1,
              }}
            />
            <CustomIcon name={name} size={size} color={focused ? theme.colors.borderGreen : theme.colors.gold2} />
          </View>);
        },
        tabBarLabelStyle: styles.label,
        activeTintColor: theme.colors.white,
        tabBarStyle: {
            height: 60 + insets.bottom,
            backgroundColor: theme.colors.black,
            paddingTop: 0,
            paddingBottom: 4,
        },
        lazy: true,
        headerShown: false,
    }),
    [insets],
  );

  return useMemo(
    () => (
      <Tab.Navigator screenOptions={getScreenOptions}>
        <Tab.Screen name={ROUTES.TABS.COINS} component={CoinsStack} options={{tabBarLabel: t('tab_Wallet')}} />
        <Tab.Screen name={ROUTES.TABS.DEFI} component={EarnStack} options={{tabBarLabel: t('tab_Earn')}} />
        <Tab.Screen name={ROUTES.TABS.OPERATIONS} component={OperationsStack} options={{tabBarLabel: t('tab_Operations')}} />
        <Tab.Screen name={ROUTES.TABS.SWAP} component={SwapStack} options={{tabBarLabel: t('tab_Exchange')}} />
        <Tab.Screen name={ROUTES.TABS.SETTINGS} component={SettingsStack} options={{tabBarLabel: t('tab_Settings')}} />
      </Tab.Navigator>
    ),
    [getScreenOptions, insets.bottom, t],
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 14,
    color: theme.colors.whiteOpacity,
  },
  tabElement: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
    focused: {
        borderTopColor: theme.colors.borderGreen,
        borderTopWidth: 1,
    },
});
