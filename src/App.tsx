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
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {initStore} from './store';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import bootstrap, {BootstrapResult} from './services/bootstraper';
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

const App: () => ReactNode = () => {
  const [isAccountInitialized, setAccountInitialized] =
    useState<boolean>(false);
  const [isBootstrapped, setBootstrapped] = useState<boolean>(true);

  const services = useRef<ServiceLocatorCoreInterface>({
    dataStoreProvider: asyncStorageProvider,
  });

  const store = useMemo(() => initStore(services.current), []);

  const authSubscriber = useCallback(
    () => setAccountInitialized(store.getState().account.isInitialized),
    [store],
  );
  store.subscribe(authSubscriber);

  store.subscribe(() => {
    setBootstrapped(store.getState().globalLoading.loading !== 0);
  });

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
      bootstrap(store, asyncStorageProvider, performanceMonitor)
        .then((result: BootstrapResult) => {
          console.log('bootstraped');
          services.current.ws = result.ws;
          services.current.coinService = result.coinsService;
          services.current.roiService = result.roiService;
          services.current.currencyService = result.currencyService;
          services.current.addressesService = result.addressService;
          services.current.coinSpecsService = result.coinSpecsService;
          services.current.innerAddressBookService =
            result.innerAddressBookService;
          services.current.outerAddressBookService =
            result.outerAddressBookService;
          services.current.coinPatternService = result.coinPatternService;
          services.current.balancesService = result.balancesService;
          services.current.abiProvider = result.abiProvider;
          services.current.performanceMonitor = performanceMonitor;

          trace.stop();
          store.dispatch(unsetGlobalLoading());
        })
        .catch(e => {
          crashlytics().recordError(e);
          console.error(e);
          console.error(e.stack);
          console.error(
            'Что-то пошло не так, не удалось инициализировать приложение, см. App.js',
          );
        });
    });
  }, [store]);

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
              <MainNavigator
                isInitialized={true}
                isAuthorized={true}
                isAccountInitialized={isAccountInitialized}
                isLoading={isBootstrapped}
              />
            </NavigationContainer>
          </SafeAreaProvider>
        </servicesContext.Provider>
      </Provider>
    </DefaultBoundary>
  );
};

export default App;
