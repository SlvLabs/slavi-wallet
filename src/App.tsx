import './global';

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {initStore} from './store';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import bootstrap from './services/bootstraper';
import {ServiceLocatorCoreInterface} from '@slavi/wallet-core/src/types';
import asyncStorageProvider from './services/asynс-storage-provider';
import servicesContext from '@slavi/wallet-core/src/contexts/services-context';
import {
  setGlobalLoading,
  unsetGlobalLoading,
} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';
import crashlytics from '@react-native-firebase/crashlytics';
import DefaultBoundary from './error-bounary/default-boundary';
import SimpleErrorBoundary from './components/error-boundary/simple-error-boundary';
import perf from '@react-native-firebase/perf';
import DebugPerformanceMonitor from './utils/debug-performance-monitor';
import PerformanceMonitorInterface from '@slavi/wallet-core/src/utils/performance-monitor-interface';
import theme from './theme';
import Config from "react-native-config";
import { load as initializationLoad } from '@slavi/wallet-core/src/store/modules/initialization/initialization-thunk-actions';
import SimpleToast from 'react-native-simple-toast';
import WalletConnectSessionRequestModal from './components/wallet-connect/session-request-modal';
import WalletConnectSignRequestModal from './components/wallet-connect/sign-request-modal';
import WalletConnectTxRequestModal from './components/wallet-connect/tx-request-modal';

const App: () => ReactNode = () => {
  const [isAccountInitialized, setAccountInitialized] =
    useState<boolean>(false);
  const [isBootstrapped, setBootstrapped] = useState<boolean>(true);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isInitFinishShow, setInitFinishShow] = useState<boolean>(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const services = useRef<ServiceLocatorCoreInterface>({
    dataStoreProvider: asyncStorageProvider,
  });

  const devMode = useMemo(() => Config.DEV_MODE === '1', [Config.DEV_MODE]);

  const store = useMemo(() => initStore(services.current), []);

  const authSubscriber = useCallback(
    () => setAccountInitialized(store.getState().account.isInitialized),
    [store],
  );
  store.subscribe(authSubscriber);

  store.subscribe(() => {
    setBootstrapped(store.getState().globalLoading.loading !== 0);
  });

  store.subscribe(() => {
    setInitialized(store.getState().initialization.initializationCompleted);
  });

  store.subscribe(() => {
    setInitFinishShow(store.getState().initialization.finishShow);
  });

  store.subscribe(() => {
    setIsUpdateAvailable(store.getState().initialization.updateAvailable);
  });

  store.subscribe(() => {
    setIsUpdateRequired(store.getState().initialization.updateRequired);
  });

  store.subscribe(() => setIsAuthorized(store.getState().auth.authorized));

  useEffect(() => {
    let performanceMonitor: PerformanceMonitorInterface;
    if (!__DEV__) {
      console.log('production performance mode');
      performanceMonitor = perf();
    } else {
      console.log('debug performance mode');
      performanceMonitor = new DebugPerformanceMonitor();
    }

    store.dispatch(setGlobalLoading());
    performanceMonitor.startTrace('BOOTSTRAP').then(trace => {
      bootstrap(store, asyncStorageProvider, performanceMonitor, services.current, devMode, Config.APP_VERSION)
        .then(() => {
          console.log('bootstraped');
          trace.stop();

          store.dispatch<any>(initializationLoad()).then(() => {
            store.dispatch(unsetGlobalLoading());
          });
        })
        .catch(e => {
          crashlytics().recordError(e);
          console.error(e);
          console.error(e.stack);
        });
    });
    return () => {
      if(services.current.ws) {
        services.current.ws.close();
      }
    }
  }, [store, devMode]);

  useEffect(() => {
    if(isUpdateAvailable) {
      SimpleToast.showWithGravity('A new version of the application is available. We recommend updating.',
        SimpleToast.LONG,
        SimpleToast.CENTER,
      );
    }
  }, [isUpdateAvailable]);

  return (
    <DefaultBoundary FallbackComponent={() => <SimpleErrorBoundary />}>
      <StatusBar
        backgroundColor={theme.colors.black}
        barStyle={'light-content'}
      />
      <Provider store={store}>
        <servicesContext.Provider value={services.current}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
              {devMode && <Text>This is development version!</Text>}
              <MainNavigator
                isInitialized={isInitialized}
                isAuthorized={isAuthorized}
                isAccountInitialized={isAccountInitialized}
                isLoading={isBootstrapped || store.getState().globalLoading.loading !== 0}
                isInitializationFinished={isInitFinishShow}
                isUpdateRequired={isUpdateRequired}
              />
              {!isBootstrapped && <WalletConnectSessionRequestModal />}
              {!isBootstrapped && <WalletConnectSignRequestModal />}
              {!isBootstrapped && <WalletConnectTxRequestModal />}
            </NavigationContainer>
          </SafeAreaProvider>
        </servicesContext.Provider>
      </Provider>
    </DefaultBoundary>
  );
};

export default App;
