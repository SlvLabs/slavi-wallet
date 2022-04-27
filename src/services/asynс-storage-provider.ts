import { DataStoreProviderInterface } from '@slavi/wallet-core/src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: exception handling
class AsyncStorageProvider implements DataStoreProviderInterface {
  read(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  save(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

export default new AsyncStorageProvider();
