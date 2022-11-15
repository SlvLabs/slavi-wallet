import {ServiceLocatorCoreInterface} from '@slavi/wallet-core/src/types';
import store, {State as CoreState} from '@slavi/wallet-core/src/store';
import {ReducersMapObject} from 'redux';
import {EnhancedStore} from '@reduxjs/toolkit';

export interface AppState {}

export type State = CoreState & AppState;

const reducers: ReducersMapObject = {};

const initStore = (services: ServiceLocatorCoreInterface): EnhancedStore<State> => {
  return store.createStore(services, reducers);
};

export {initStore};
