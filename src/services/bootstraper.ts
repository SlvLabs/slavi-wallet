import Config from 'react-native-config';
import CoreBootstrap from '@slavi/wallet-core/src/utils/bootstrap';
import {Store} from 'redux';
import {networks} from '@slavi/crypto-core';
import {DataStoreProviderInterface, ServiceLocatorCoreInterface} from '@slavi/wallet-core/src/types';
import {CoinsServiceConf} from '@slavi/wallet-core/src/services/coins-service';
import SimpleToast from 'react-native-simple-toast';
import PerformanceMonitorInterface from '@slavi/wallet-core/src/utils/performance-monitor-interface';
import translations from '../assets/translations/fallback';
import {FirebaseService} from './notification/firebase-service';
import {NotificationUnsupported} from '@slavi/wallet-core/src/services/errors/notification-unsupported';

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
  walletConnectProjectId: string,
  devMode?: boolean,
  appVersion?: string,
) => {
  const firebaseService = new FirebaseService();

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
    walletConnectProjectId: walletConnectProjectId,
  });
  return {
    loadInitial: async () => {
      await coreBootstrap.loadInitial(translations);
      try {
        await firebaseService.init();
      } catch (e) {
        throw new NotificationUnsupported(e as Error);
      }
    },
    loadWalletServices: async () => coreBootstrap.loadWalletServices(),
  };
};
const bootstrap = async (
  store: Store,
  dataStorageProvider: DataStoreProviderInterface,
  performanceMonitor: PerformanceMonitorInterface,
  serviceLocator: ServiceLocatorCoreInterface,
  walletConnectProjectId: string,
  devMode?: boolean,
  appVersion?: string,
): Promise<void> => {
  const coreBootstrap = createCoreBootstrap(
    store,
    dataStorageProvider,
    performanceMonitor,
    serviceLocator,
    walletConnectProjectId,
    devMode,
    appVersion,
  );

  return coreBootstrap.loadInitial();
};

export default bootstrap;
