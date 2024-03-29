import {TabView} from 'react-native-tab-view';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {TabsBar, WrappedTabBarRendererProps} from './tabs-bar';
import {Route, SceneRendererProps} from 'react-native-tab-view/lib/typescript/src/types';

export type WrappedSceneRendererProps<T> = SceneRendererProps & {route: T};

export interface RouteData extends Route {
  title: string;
}

export interface WrappedTabViewProps {
  routes: RouteData[];
  renderScene: (data: WrappedSceneRendererProps<RouteData>) => ReactNode;
  onIndexChange?: (index: number) => void;
}

export interface WrappedTabViewHandle {
  switchTo: (tabIndex: number) => void;
}

const WrappedTabView: ForwardRefRenderFunction<WrappedTabViewHandle, WrappedTabViewProps> = (
  {routes, renderScene, onIndexChange},
  ref,
) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    switchTo(index: number) {
      setTabIndex(index);
    },
  }));

  const _onIndexChange = useCallback(
    (index: number) => {
      setTabIndex(index);
      if (onIndexChange) {
        onIndexChange(index);
      }
    },
    [onIndexChange],
  );

  const renderTabBar = useCallback(
    (props: WrappedTabBarRendererProps<RouteData>) => (
      <TabsBar<any> sceneRendererProps={props} tabIndex={tabIndex} setTabIndex={_onIndexChange} />
    ),
    [_onIndexChange, tabIndex],
  );

  return (
    <TabView
      navigationState={{index: tabIndex, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={_onIndexChange}
      lazy={true}
    />
  );
};

export default forwardRef(WrappedTabView);
