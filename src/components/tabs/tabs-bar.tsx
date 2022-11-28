import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import {NavigationState, Route, SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';

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
            <LinearGradient {...theme.gradients.activeTabV2} style={{...styles.tabOption, ...styles.activeTabOption}}>
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

  },
  tabOptionContainer: {

  },
  tabOption: {},
  activeTabOption: {},
  activeTabLabel: {},
  tabLabel: {},
});
