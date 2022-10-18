import Config from 'react-native-config';
import CoreBootstrap from '@slavi/wallet-core/src/utils/bootstrap';
import {Store} from 'redux';
import {networks} from '@slavi/crypto-core';
import {
  DataStoreProviderInterface,
  ServiceLocatorCoreInterface,
} from '@slavi/wallet-core/src/types';
import {CoinsServiceConf} from '@slavi/wallet-core/src/services/coins-service';
import SimpleToast from 'react-native-simple-toast';
import PerformanceMonitorInterface from '@slavi/wallet-core/src/utils/performance-monitor-interface';
import translations from '../assets/translations/fallback';
import {FirebaseService, NavigationFunction} from './firebase-service';

const wsConfig = {
  url: Config.WS_URL,
  minReconnectTime: +Config.WS_MIN_RECONNECT_TIME || 1000,
  maxReconnectTime: +Config.WS_MAX_RECONNECT_TIME || 30000,
  ping: {
    timeout: +Config.WS_PING_TIMEOUT || 31000,
    route: Config.WS_PING_ROUTE,
  },
};

const coinsServiceConfig: CoinsServiceConf = {
  diskCacheEnabled: !!Config.DISK_CACHE || true,
};

const walletConnectClientMeta = {
  description: 'Slavi wallet application',
  url: 'https://slavi.io/',
  icons: ['https://slavi.io/images/logo.png'],
  name: 'SlaviWallet',
};

export const createCoreBootstrap = (
  store: Store,
  dataStorageProvider: DataStoreProviderInterface,
  performanceMonitor: PerformanceMonitorInterface,
  serviceLocator: ServiceLocatorCoreInterface,
  navigation: NavigationFunction,
  devMode?: boolean,
  appVersion?: string,
) => {
  const firebaseService = new FirebaseService(navigation);

  const coreBootstrap = new CoreBootstrap({
    wsConfig: wsConfig,
    systemLanguage: 'en',
    store: store,
    authCoinDerivedPath: Config.AUTH_DERIVED_PATH,
    authCoinNetwork: networks.AUTH_SLV,
    dataStorageProvider: dataStorageProvider,
    coinsServiceConfig: coinsServiceConfig,
    performanceMonitor: performanceMonitor,
    onError: err => {
      if (err.errors?.timestamp) {
        return;
      }
      SimpleToast.showWithGravity(JSON.stringify(err), SimpleToast.LONG, SimpleToast.TOP);
    },
    devMode: devMode,
    appVersion: appVersion || '',
    serviceLocator: serviceLocator,
    walletConnectClientMeta: walletConnectClientMeta,
    NotificationClientInterface: firebaseService,
  });
  return {
    loadInitial: () => coreBootstrap.loadInitial(translations),
    loadWalletServices: async () => {
      await firebaseService.init();
      return coreBootstrap.loadWalletServices();
    },
  };
};
const bootstrap = async (
  store: Store,
  dataStorageProvider: DataStoreProviderInterface,
  performanceMonitor: PerformanceMonitorInterface,
  serviceLocator: ServiceLocatorCoreInterface,
  navigation: NavigationFunction,
  devMode?: boolean,
  appVersion?: string,
): Promise<void> => {
  const coreBootstrap = createCoreBootstrap(
    store,
    dataStorageProvider,
    performanceMonitor,
    serviceLocator,
    navigation,
    devMode,
    appVersion,
  );

  return coreBootstrap.loadInitial();
};

export default bootstrap;
