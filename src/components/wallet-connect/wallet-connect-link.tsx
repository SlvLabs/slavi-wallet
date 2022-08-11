import React from 'react';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useCallback, useEffect} from 'react';
import {EventType} from 'expo-linking/src/Linking.types';
import * as Linking from 'expo-linking';
import parse, { QueryParser } from 'url-parse';

export default function WalletConnectLink() {
  const walletConnectService = useWalletConnectService();

  const handleOpenURL = useCallback((ev: EventType) => {
    let url;
    if(ev.url && walletConnectService) {
      const parsedUrl = parse(ev.url, true);
      console.log(parsedUrl);
      switch (parsedUrl.protocol) {
        case 'https:':
          url = parsedUrl.query?.uri;
          break;
        case 'wc:':
          url = ev.url;
          break;
        default:
          throw new Error('Invalid url protocol');
      }

      if(url) {
        console.log(url);
        walletConnectService.connect(url);
      } else {
        throw new Error('Invalid url format');
      }
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