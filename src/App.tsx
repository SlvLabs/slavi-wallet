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
import {Platform, StatusBar, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {initStore} from './store';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import {createCoreBootstrap} from './services/bootstraper';
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
import Config from 'react-native-config';
import {load as initializationLoad} from '@slavi/wallet-core/src/store/modules/initialization/initialization-thunk-actions';
import SimpleToast from 'react-native-simple-toast';
import WalletConnectSessionRequestModal from './components/wallet-connect/session-request-modal';
import WalletConnectSignRequestModal from './components/wallet-connect/sign-request-modal';
import WalletConnectTxRequestModal from './components/wallet-connect/tx-request-modal';
import useAutoBlock from './utils/use-auto-block';
import AuthModal from './components/modal/auth-modal';
import WalletConnectLink from './components/wallet-connect/wallet-connect-link';
import {TimeFixRequiredModal} from './components/modal/time-fix-required-modal';
import { unsetRequireTimeFix } from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {BlurView} from '@react-native-community/blur';

const App: () => ReactNode = () => {
  const [isAccountInitialized, setAccountInitialized] =
    useState<boolean>(false);
  const [isBootstrapped, setBootstrapped] = useState<boolean>(true);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isInitFinishShow, setInitFinishShow] = useState<boolean>(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);
  const [isTimeFixRequired, setIsTimeFixRequired] = useState<boolean>(false);
  const [helpShow, setHelpShow] = useState<boolean>(false);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
  const [isMnemonicConfirmed, setIsMnemonicConfirmed] =
    useState<boolean>(false);

  const services = useRef<ServiceLocatorCoreInterface>({
    dataStoreProvider: asyncStorageProvider,
  });

  const devMode = useMemo(() => Config.DEV_MODE === '1', [Config.DEV_MODE]);

  const store = useMemo(() => initStore(services.current), []);

  const clearIsTimeFixRequired = useCallback(() => {
    store.dispatch(unsetRequireTimeFix());
  }, [store]);

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

  store.subscribe(() => {
    setIsTimeFixRequired(store.getState().initialization.timeFixRequired);
  });

  store.subscribe(() => {
    setHelpShow(store.getState().initialization.helpShow);
  });

  const onAuthChange = useCallback((authorized: boolean) => {
    if(!services.current.authService) {
      return;
    }

    const state = store.getState();

    if(!state.globalLoading.loading) {
      if (services.current.authService.isAuthEnable()) {
        setIsAuthorized(authorized)
      } else {
        setIsAuthorized(true);
      }
    }
  }, []);

  store.subscribe(() =>
    setIsMnemonicConfirmed(store.getState().account.confirmed),
  );

  const performanceMonitor = useMemo(() => {
    let performanceMonitorInterface: PerformanceMonitorInterface;
    if (!__DEV__) {
      console.log('production performance mode');
      performanceMonitorInterface = perf();
    } else {
      console.log('debug performance mode');
      performanceMonitorInterface = new DebugPerformanceMonitor();
    }
    return performanceMonitorInterface;
  }, []);

  const coreBootstraper = useMemo(
    () =>
      createCoreBootstrap(
        store,
        asyncStorageProvider,
        performanceMonitor,
        services.current,
        devMode,
        Config.APP_VERSION,
      ),
    [store, devMode, performanceMonitor],
  );

  useEffect(() => {
    setInitialLoaded(false);
    store.dispatch(setGlobalLoading());
    coreBootstraper.loadInitial().then(() => {
      setInitialLoaded(true);
      store.dispatch(unsetGlobalLoading());
    });
  }, [store, coreBootstraper]);

  useEffect(() => {
    if (!isMnemonicConfirmed || !initialLoaded) {
      return;
    }

    store.dispatch(setGlobalLoading());
    performanceMonitor.startTrace('BOOTSTRAP').then(trace => {
      coreBootstraper
        .loadWalletServices()
        .then(() => {
          console.log('bootstraped');
          trace.stop();

          store.dispatch<any>(initializationLoad()).then(() => {
            store.dispatch(unsetGlobalLoading());
          });

          services.current.authService?.onAuthChange.add(onAuthChange)
        })
        .catch(e => {
          crashlytics().recordError(e);
          console.error(e);
          console.error(e.stack);
        });
    });
    return () => {
      if (services.current.ws) {
        services.current.ws.close();
      }
    };
  }, [
    store,
    devMode,
    initialLoaded,
    isMnemonicConfirmed,
    coreBootstraper,
    performanceMonitor,
  ]);

  useEffect(() => {
    if (isUpdateAvailable) {
      SimpleToast.showWithGravity(
        'A new version of the application is available. We recommend updating.',
        SimpleToast.LONG,
        SimpleToast.CENTER,
      );
    }
  }, [isUpdateAvailable]);

  const authLoading = useAutoBlock(services.current.authService);

  return (
    <DefaultBoundary FallbackComponent={() => <SimpleErrorBoundary />}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'light-content'}
      />
      {authLoading && Platform.OS === 'ios' && (
        <BlurView
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Provider store={store}>
        <servicesContext.Provider value={services.current}>
          {!isBootstrapped && <AuthModal visible={!isAuthorized} loading={authLoading} />}
          <SafeAreaProvider>
            <NavigationContainer theme={DarkTheme} >
              <MainNavigator
                isInitialized={isInitialized}
                isAccountInitialized={isAccountInitialized}
                isLoading={
                  isBootstrapped || store.getState().globalLoading.loading !== 0
                }
                isInitializationFinished={isInitFinishShow}
                isUpdateRequired={isUpdateRequired}
                helpShow={helpShow}
              />
              {!isBootstrapped && <WalletConnectSessionRequestModal />}
              {!isBootstrapped && <WalletConnectSignRequestModal />}
              {!isBootstrapped && <WalletConnectTxRequestModal />}
              {isTimeFixRequired && <TimeFixRequiredModal onCancel={clearIsTimeFixRequired} />}
              {!isBootstrapped && isAccountInitialized && isInitialized && <WalletConnectLink loading={!isAuthorized}/>}
            </NavigationContainer>
            {devMode && <Text style={{
                backgroundColor: theme.colors.black,
                color: theme.colors.white,
                textAlign: 'center',
              }}>
                This is development version!
            </Text>}
          </SafeAreaProvider>
        </servicesContext.Provider>
      </Provider>
    </DefaultBoundary>
  );
};

export default App;
