import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import CoinsStack from './CoinsStack';
import OperationsStack from './OperationsStack';
import ROUTES from './config/routes';
import CustomIcon from '../components/custom-icon/custom-icon';
import theme from '../theme';
import SettingsStack from './SettingsStack';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import DefiStack from './DefiStack';
import SwapStack from './SwapStack';

const icons = {
  [ROUTES.TABS.COINS]: 'wallet',
  [ROUTES.TABS.DEFI]: 'defi',
  [ROUTES.TABS.OPERATIONS]: 'history',
  [ROUTES.TABS.SWAP]: 'swap',
  [ROUTES.TABS.SETTINGS]: 'settings1',
};

const labels = {
  [ROUTES.TABS.COINS]: 'Wallet',
  [ROUTES.TABS.DEFI]: 'DeFi (soon)',
  [ROUTES.TABS.OPERATIONS]: 'Operations',
  [ROUTES.TABS.SWAP]: 'Swap (soon)',
  [ROUTES.TABS.SETTINGS]: 'Settings',
};

const ApplicationTabs = () => {
  const Tab = createBottomTabNavigator();

  const getScreenOptions = useCallback(
    ({route}) => ({
      tabBarIcon: ({size, focused}: any) => {
        const name = icons[route.name];
        return (
          <View style={{flex: 1}}>
            <View style={{height: 1, width: 50, backgroundColor: focused ? theme.colors.borderGreen : 'transparent', marginBottom: 8}}/>
            <MaskedView
              maskElement={
                <View  style={{
                  backgroundColor: 'transparent',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <CustomIcon name={name} size={size} color={'white'} />
                </View>
              }
              style={{ flex: 1, flexDirection: 'row', height: '100%' }}>
              {focused ?
                <LinearGradient {...theme.gradients.activeIcon} style={{flex: 1}}/>
                : <LinearGradient {...theme.gradients.inactiveIcon} style={{flex: 1}}/>
              }
            </MaskedView>
          </View>
        );
      },
      tabBarLabel: ({color}: TextStyle) => {
        return (
          <Text style={{...styles.label, color: color}}>
            {labels[route.name]}
          </Text>
        );
      },
    }),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={getScreenOptions}
      tabBarOptions={{
        activeTintColor: theme.colors.white,
        style: styles.tabBar,
        tabStyle: styles.tab,
      }}>
      <Tab.Screen name={ROUTES.TABS.COINS} component={CoinsStack} />
      <Tab.Screen name={ROUTES.TABS.DEFI} component={DefiStack} />
      <Tab.Screen name={ROUTES.TABS.OPERATIONS} component={OperationsStack} />
      <Tab.Screen name={ROUTES.TABS.SWAP} component={SwapStack} />
      <Tab.Screen name={ROUTES.TABS.SETTINGS} component={SettingsStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    lineHeight: 13,
    color: theme.colors.whiteOpacity,
  },
  tabBar: {
    backgroundColor: theme.colors.black,
    paddingTop: 0,
    padding: 18,
    height: 64,
    borderTopColor: theme.colors.lightTransparent,
    borderTopWidth: 1,
  },
  tab: {},
});

export default ApplicationTabs;
