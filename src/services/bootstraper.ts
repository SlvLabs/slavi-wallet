import Config from 'react-native-config';
import CoreBootstrap from '@slavi/wallet-core/src/utils/bootstrap';
// @ts-ignore
import i18nextReactNative from 'i18next-react-native-language-detector';
import {Store} from 'redux';
import {networks} from '@slavi/crypto-core';
import {DataStoreProviderInterface} from '@slavi/wallet-core/src/types';
import {BootstrapResult as BootstrapResultCore} from '@slavi/wallet-core/src/utils/bootstrap';
import {ContractAbiProviderConf} from '@slavi/wallet-core/types/services/contract-abi-provider';
import {CoinsServiceConf} from '@slavi/wallet-core/src/services/coins-service';
import SimpleToast from 'react-native-simple-toast';
import PerformanceMonitorInterface from "@slavi/wallet-core/src/utils/performance-monitor-interface";

export interface BootstrapResult extends BootstrapResultCore {}

const wsConfig = {
  url: Config.WS_URL,
  minReconnectTime: +Config.WS_MIN_RECONNECT_TIME || 1000,
  maxReconnectTime: +Config.WS_MAX_RECONNECT_TIME || 30000,
  ping: {
    timeout: +Config.WS_PING_TIMEOUT || 31000,
    route: Config.WS_PING_ROUTE,
  },
};

const abiProviderConfig: ContractAbiProviderConf = {
  diskCacheEnabled: !!Config.DISK_CACHE || true,
};

const coinsServiceConfig: CoinsServiceConf = {
  diskCacheEnabled: !!Config.DISK_CACHE || true,
};

const bootstrap = async (
  store: Store,
  dataStorageProvider: DataStoreProviderInterface,
  performanceMonitor: PerformanceMonitorInterface,
  devMode?: boolean,
): Promise<BootstrapResult> => {
  console.log('bootstrap')
  const coreBootstrap = new CoreBootstrap({
    wsConfig: wsConfig,
    languageDetector: i18nextReactNative,
    store: store,
    authCoinDerivedPath: Config.AUTH_DERIVED_PATH,
    authCoinNetwork: networks.AUTH_SLV,
    dataStorageProvider: dataStorageProvider,
    abiProviderConfig: abiProviderConfig,
    coinsServiceConfig: coinsServiceConfig,
    performanceMonitor: performanceMonitor,
    onError: err =>
      SimpleToast.showWithGravity(
        JSON.stringify(err),
        SimpleToast.LONG,
        SimpleToast.TOP,
      ),
    devMode: devMode,
  });
  return coreBootstrap.load();
};

export default bootstrap;
