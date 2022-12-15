import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import {NavigationState, Route, SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';
import Layout from '../../utils/layout';

export type WrappedTabBarRendererProps<T extends Route> = SceneRendererProps & {navigationState: NavigationState<T>};

export interface TabBarProps<T extends Route> {
  tabIndex: number;
  setTabIndex: ((index: number) => void);
  sceneRendererProps: WrappedTabBarRendererProps<T>;
}

export function TabsBar<T extends Route>({tabIndex, setTabIndex, sceneRendererProps: {navigationState}}: TabBarProps<T>) {
  return (
    <View style={styles.tabBar}>
      {navigationState.routes.map((route: Route, i: number) => (
        <TouchableOpacity key={`tab_${i}`} onPress={() => setTabIndex(i)} style={styles.tabOptionContainer}>
          {tabIndex === i ? (
            <LinearGradient {...theme.gradients.activeTab} style={{...styles.tabOption, ...styles.activeTabOption}}>
              <Text style={styles.activeTabLabel}>{route.title}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.tabOption}>
              <Text style={styles.tabLabel}>{route.title}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.tabsBackground,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 8,
  },
  tabOptionContainer: {
    flex: 1,
  },
  tabOption: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabOption: {},
  activeTabLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 12 : 13,
    lineHeight: Layout.isSmallDevice ? 12 : 16,
    color: theme.colors.white,
  },
  tabLabel: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 14 : 13,
    lineHeight: Layout.isSmallDevice ? 14 : 16,
    color: theme.colors.lightScroll,
  },
});
