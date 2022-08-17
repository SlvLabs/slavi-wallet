import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import CoinsStack from './CoinsStack';
import OperationsStack from './OperationsStack';
import ROUTES from './config/routes';
import CustomIcon from '../components/custom-icon/custom-icon';
import theme from '../theme';
import SettingsStack from './SettingsStack';
import DefiStack from './DefiStack';
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

  const labels = useMemo(
    () => ({
      [ROUTES.TABS.COINS]: t('tab_Wallet'),
      [ROUTES.TABS.DEFI]: t('tab_Earn'),
      [ROUTES.TABS.OPERATIONS]: t('tab_Operations'),
      [ROUTES.TABS.SWAP]: t('tab_Exchange'),
      [ROUTES.TABS.SETTINGS]: t('tab_Settings'),
    }),
    [t],
  );

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
          </View>
        );
      },
      tabBarLabel: ({color}: TextStyle) => {
        return <Text style={{...styles.label, color: color}}>{labels[route.name]}</Text>;
      },
    }),
    [labels],
  );

  return useMemo(
    () => (
      <Tab.Navigator
        screenOptions={getScreenOptions}
        tabBarOptions={{
          activeTintColor: theme.colors.white,
          style: {
            height: 60 + insets.bottom,
            backgroundColor: theme.colors.black,
            paddingTop: 0,
          },
          tabStyle: styles.tab,
        }}
        lazy={true}>
        <Tab.Screen name={ROUTES.TABS.COINS} component={CoinsStack} />
        <Tab.Screen name={ROUTES.TABS.DEFI} component={DefiStack} />
        <Tab.Screen name={ROUTES.TABS.OPERATIONS} component={OperationsStack} />
        <Tab.Screen name={ROUTES.TABS.SWAP} component={SwapStack} />
        <Tab.Screen name={ROUTES.TABS.SETTINGS} component={SettingsStack} />
      </Tab.Navigator>
    ),
    [getScreenOptions],
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
  tab: {
    height: 60,
  },
  tabElement: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  }
});

// export default ApplicationTabs;
