import React, {useRef} from 'react';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useCallback, useEffect} from 'react';
import {EventType} from 'expo-linking/src/Linking.types';
import * as Linking from 'expo-linking';
import parse from 'url-parse';

export default function WalletConnectLink({loading}: {loading: boolean}) {
  const walletConnectService = useWalletConnectService();

  const lastEvent = useRef<EventType|null>(null);

  const eventHandler = useCallback((ev: EventType) => {
    lastEvent.current = ev;
  }, []);

  const handleOpenURL = useCallback((ev: EventType|null) => {
    let url;
    if(loading || !ev) {
      return;
    }
    if(ev.url && walletConnectService) {
      const parsedUrl = parse(ev.url, true);
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
        walletConnectService.connect(url);
      } else {
        throw new Error('Invalid url format');
      }
    }
  }, [walletConnectService, loading]);

  useEffect(() => {
    Linking.addEventListener('url', eventHandler);

    return () => Linking.removeEventListener('url', eventHandler);
  }, [eventHandler]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({url: url});
      }
    }).catch(err => {
      console.warn('An error occurred', err);
    });
  }, [loading, handleOpenURL]);

  useEffect(() => {
    handleOpenURL(lastEvent.current)
  }, [lastEvent.current, handleOpenURL])

  return <></>;
}
