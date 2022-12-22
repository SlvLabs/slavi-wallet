import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/core';
import Deferred from '@slavi/wallet-core/src/utils/deffered';

export const isReadyRef = new Deferred<void>();

export const navigationRef = createRef<NavigationContainerRef>();

export async function navigate(name: any, params?: any) {
  await isReadyRef.promise;
  if (navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.error('Invalid navigation');
  }
}
