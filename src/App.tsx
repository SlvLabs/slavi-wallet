import './global';

import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppState, Platform, StatusBar, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {initStore} from './store';
import MainNavigator from './navigation/MainNavigator';
import {createCoreBootstrap} from './services/bootstraper';
import {ServiceLocatorCoreInterface} from '@slavi/wallet-core/src/types';
import asyncStorageProvider from './services/asynс-storage-provider';
import servicesContext from '@slavi/wallet-core/src/contexts/services-context';
import {setGlobalLoading, unsetGlobalLoading} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';
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
import {unsetRequireTimeFix} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {BlurView} from '@react-native-community/blur';
import {NotificationUnsupported} from '@slavi/wallet-core/src/services/errors/notification-unsupported';
import {saveReferral} from './utils/save-utm-interval';
import {useAppExit} from './hooks/use-app-exit';
import WalletConnectSessionRequestModalV2 from './components/wallet-connect/session-request-modal-v2';
import {ReleaseNoteModal} from './components/modal/release-note-modal';

const App: () => ReactNode = () => {
  const [isAccountInitialized, setAccountInitialized] = useState<boolean>(false);
  const [isBootstrapped, setBootstrapped] = useState<boolean>(true);
  const [isRealBootstraped, setIsRealBootstrapped] = useState<boolean>(false);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [isInitFinishShow, setInitFinishShow] = useState<boolean>(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const [isUpdateRequired, setIsUpdateRequired] = useState<boolean>(false);
  const [isTimeFixRequired, setIsTimeFixRequired] = useState<boolean>(false);
  const [helpShow, setHelpShow] = useState<boolean>(false);
  const [referralShow, setReferralShow] = useState<boolean>(false);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
  const [isMnemonicConfirmed, setIsMnemonicConfirmed] = useState<boolean>(false);
  const [activeCoins, setActiveCoins] = useState<string[]>([]);

  const services = useRef<ServiceLocatorCoreInterface>({
    dataStoreProvider: asyncStorageProvider,
  });

  const devMode = Config.DEV_MODE === '1';

  const store = useMemo(() => initStore(services.current), []);

  const clearIsTimeFixRequired = useCallback(() => {
    store.dispatch(unsetRequireTimeFix());
  }, [store]);

  const authSubscriber = useCallback(() => setAccountInitialized(store.getState().account.isInitialized), [store]);
  store.subscribe(authSubscriber);

  store.subscribe(() => {
    setBootstrapped(store.getState().globalLoading.loading !== 0);
  });

  store.subscribe(() => {
    setInitialized(store.getState().initialization.initializationCompleted);
  });

  store.subscribe(() => {
    if (store.getState().initialization.finishShow) {
      services.current.utmService?.post().catch(e => {
        console.log((e as Error).message);
        console.log(e.stack);
      });
    }
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

  store.subscribe(() => {
    setReferralShow(store.getState().initialization.referralState.active);
  });

  store.subscribe(() =>
    setActiveCoins(prev => {
      const possibleNew = Object.values(store.getState().coins.coins)
        .filter(c => c.shown)
        .map(c => c.name);
      let should = false;
      if (possibleNew.length === prev.length) {
        for (const coin of possibleNew) {
          if (!prev.includes(coin)) {
            should = true;
            break;
          }
        }
      } else {
        should = true;
      }
      return should ? possibleNew : prev;
    }),
  );

  const onAuthChange = useCallback(
    (authorized: boolean) => {
      if (!services.current.authService) {
        return;
      }

      const state = store.getState();

      if (!state.globalLoading.loading) {
        if (services.current.authService.isAuthEnable()) {
          setIsAuthorized(authorized);
        } else {
          setIsAuthorized(true);
        }
      }
    },
    [store],
  );

  store.subscribe(() => setIsMnemonicConfirmed(store.getState().account.confirmed));

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
        Config.WC_PROJECT_ID,
        devMode,
        Config.APP_VERSION,
      ),
    [store, devMode, performanceMonitor],
  );

  const onLoadInitial = useCallback(() => {
    saveReferral(services.current.utmService);
    setInitialLoaded(true);
    const authService = services.current.authService;
    if (authService) {
      setIsAuthorized(authService.getAuthState());
      authService?.onAuthChange.add(onAuthChange);
    }
    store.dispatch(unsetGlobalLoading());
  }, [onAuthChange, store]);

  useEffect(() => {
    setInitialLoaded(false);
    store.dispatch(setGlobalLoading());
    coreBootstraper
      .loadInitial()
      .then(onLoadInitial)
      .catch(e => {
        try {
          crashlytics().recordError(e);
        } catch (e) {}

        if (e instanceof NotificationUnsupported) {
          console.warn('Notification unsupported on this device');
          onLoadInitial();
        } else {
          console.error(e);
          console.error(e.stack);
        }
      });
  }, [store, coreBootstraper, onLoadInitial]);

  useEffect(() => {
    if (!isMnemonicConfirmed || !initialLoaded) {
      return;
    }
    setIsRealBootstrapped(false);
    store.dispatch(setGlobalLoading());
    performanceMonitor.startTrace('BOOTSTRAP').then(trace => {
      const callback = () => {
        trace.stop();

        store.dispatch<any>(initializationLoad()).then(() => {
          store.dispatch(unsetGlobalLoading());
          setIsRealBootstrapped(true);
        });
      };
      coreBootstraper
        .loadWalletServices()
        .then(callback)
        .catch((e: Error) => {
          try {
            crashlytics().recordError(e);
          } catch (e) {}

          if (e instanceof NotificationUnsupported) {
            console.warn('Notification unsupported on this device');
            callback();
          } else {
            console.error(e);
            console.error(e.stack);
          }
        });
    });
    return () => {
      if (services.current.ws) {
        // expecting close socket on any change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        services.current.ws.close();
        setIsRealBootstrapped(false);
      }
    };
  }, [store, devMode, initialLoaded, isMnemonicConfirmed, coreBootstraper, performanceMonitor]);

  useEffect(() => {
    if (!initialLoaded || !isMnemonicConfirmed || !isRealBootstraped) {
      return;
    }
    let canceled = false;
    const addressService = services?.current.addressesService;
    if (!addressService) {
      return;
    } else {
      performanceMonitor
        .startTrace('change generation')
        .then(async trace => {
          if (services.current.addressesService) {
            await services.current.addressesService.handleChangeAddressesInitial(activeCoins, () => canceled);
          }
          trace.stop();
        })
        .catch(e => {
          crashlytics().recordError(e);
          console.error(e);
          console.error(e.stack);
        });
      return () => {
        canceled = true;
      };
    }
  }, [performanceMonitor, activeCoins, initialLoaded, isMnemonicConfirmed, isRealBootstraped]);

  useEffect(() => {
    if (isUpdateAvailable) {
      SimpleToast.showWithGravity(
        'A new version of the application is available. We recommend updating.',
        SimpleToast.LONG,
        SimpleToast.CENTER,
      );
    }
  }, [isUpdateAvailable]);

  const [isFocused, setIsFocused] = useState<boolean>(true);
  useEffect(() => {
    const onChange = (newState: 'active' | 'background' | 'inactive' | 'unknown' | 'extension') => {
      if (newState === 'active') {
        setIsFocused(true);
      } else {
        if (newState === 'background' || newState === 'inactive') {
          setIsFocused(false);
        }
      }
    };

    const subscriber = AppState.addEventListener('change', onChange);
    return () => {
      subscriber.remove()
    };
  }, []);

  const authLoading = useAutoBlock(services.current.authService);

  useAppExit();

  return (
    <DefaultBoundary FallbackComponent={() => <SimpleErrorBoundary />}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'light-content'} />
      <Provider store={store}>
        <servicesContext.Provider value={services.current}>
          <SafeAreaProvider>
            {!isBootstrapped && isAccountInitialized && <AuthModal visible={!isAuthorized} loading={authLoading} />}
            <MainNavigator
              isInitialized={isInitialized}
              isAccountInitialized={isAccountInitialized}
              isLoading={isBootstrapped || store.getState().globalLoading.loading !== 0}
              isInitializationFinished={isInitFinishShow}
              isUpdateRequired={isUpdateRequired}
              helpShow={helpShow}
              isReferralShow={referralShow}
            />
            {!isBootstrapped && <WalletConnectSessionRequestModal />}
            {!isBootstrapped && <WalletConnectSessionRequestModalV2 />}
            {!isBootstrapped && <WalletConnectSignRequestModal />}
            {!isBootstrapped && <WalletConnectTxRequestModal />}
            {!isBootstrapped && isAccountInitialized && isInitialized && <WalletConnectLink loading={!isAuthorized} />}
            {!isBootstrapped && isAccountInitialized && isInitialized && isAuthorized && <ReleaseNoteModal />}
            {devMode && (
              <Text
                style={{
                  backgroundColor: theme.colors.black,
                  color: theme.colors.white,
                  textAlign: 'center',
                }}>
                This is development version!
              </Text>
            )}
            {!isFocused && Platform.OS === 'ios' && (
              <BlurView
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              />
            )}
            {isTimeFixRequired && <TimeFixRequiredModal onCancel={clearIsTimeFixRequired} />}
          </SafeAreaProvider>
        </servicesContext.Provider>
      </Provider>
    </DefaultBoundary>
  );
};

export default App;
