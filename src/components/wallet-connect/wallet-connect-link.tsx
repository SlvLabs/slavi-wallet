import React from 'react';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useCallback, useEffect} from 'react';
import {EventType} from 'expo-linking/src/Linking.types';
import * as Linking from 'expo-linking';

export default function WalletConnectLink() {
  const walletConnectService = useWalletConnectService();

  const handleOpenURL = useCallback((ev: EventType) => {
    if(ev.url && walletConnectService) {
      walletConnectService.connect(ev.url);
    }
  }, [walletConnectService]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({url: url});
      }
    }).catch(err => {
      console.warn('An error occurred', err);
    });
    Linking.addEventListener('url', handleOpenURL);

    return () => Linking.removeEventListener('url', handleOpenURL);
  }, [handleOpenURL]);

  return <></>;
}
