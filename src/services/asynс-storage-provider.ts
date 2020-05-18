import AsyncStorage from '@react-native-community/async-storage';
import {DataStoreProviderInterface} from '@slavi/wallet-core/types/types';

// TODO: exception handling
class AsyncStorageProvider implements DataStoreProviderInterface {
  read(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  save(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }
}

export default new AsyncStorageProvider();
