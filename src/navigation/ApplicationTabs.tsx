import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import CoinsStack from './CoinsStack';
import OperationsStack from './OperationsStack';
import ROUTES from './config/routes';
import CustomIcon from '../components/custom-icon/custom-icon';
import theme from '../theme';
import SettingsStack from './SettingsStack';
import LinearGradient from 'react-native-linear-gradient';
import DefiStack from './DefiStack';
import SwapStack from './SwapStack';
import MaskedView from '@react-native-masked-view/masked-view';
import useTranslation from '../utils/use-translation';

const icons = {
  [ROUTES.TABS.COINS]: 'wallet',
  [ROUTES.TABS.DEFI]: 'defi',
  [ROUTES.TABS.OPERATIONS]: 'history',
  [ROUTES.TABS.SWAP]: 'swap',
  [ROUTES.TABS.SETTINGS]: 'settings1',
};

const Tab = createBottomTabNavigator();

type GetScreenOptions = (a: {route: {name: string}}) => any;

export default function ApplicationTabs() {
  const {t} = useTranslation();

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
          <View style={{flex: 1}}>
            <View
              style={{
                height: 1,
                width: 50,
                backgroundColor: focused ? theme.colors.borderGreen : 'transparent',
                marginBottom: 8,
              }}
            />
            <MaskedView
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomIcon name={name} size={size} color={'white'} />
                </View>
              }
              style={{flex: 1, flexDirection: 'row', height: '100%'}}>
              {focused ? (
                <LinearGradient {...theme.gradients.activeIcon} style={{flex: 1}} />
              ) : (
                <LinearGradient {...theme.gradients.inactiveIcon} style={{flex: 1}} />
              )}
            </MaskedView>
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
          style: styles.tabBar,
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
  tabBar: {
    backgroundColor: theme.colors.black,
    paddingTop: 0,
    padding: 18,
    borderTopColor: theme.colors.lightTransparent,
    borderTopWidth: 1,
  },
  tab: {},
});

// export default ApplicationTabs;
