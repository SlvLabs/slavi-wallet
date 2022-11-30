import {TabView} from 'react-native-tab-view';
import React, {ReactNode, useCallback, useState} from 'react';
import {TabsBar, WrappedTabBarRendererProps} from './tabs-bar';
import {Route, SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';

export type WrappedSceneRendererProps<T> = SceneRendererProps & {route: T};

export interface RouteData extends Route {
  title: string;
}

export interface WrappedTabViewProps {
  routes: RouteData[],
  renderScene: (data: WrappedSceneRendererProps<RouteData>) => ReactNode;
}

export function WrappedTabView({routes, renderScene}: WrappedTabViewProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const renderTabBar = useCallback((props: WrappedTabBarRendererProps<RouteData>) => (
    <TabsBar<any>  sceneRendererProps={props} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
  ), [tabIndex]);

  return (
    <TabView
      navigationState={{ index: tabIndex, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setTabIndex}
      lazy={true}
    />
  );
}
