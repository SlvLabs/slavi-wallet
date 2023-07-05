import React, {useState} from 'react';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useCallback, useEffect} from 'react';
import {EventType} from 'expo-linking/src/Linking.types';
import * as Linking from 'expo-linking';
import parse from 'url-parse';
import {detectWalletConnectVersion} from '@slavi/wallet-core/src/utils/detect-wallet-connect-version';
import useWalletConnectServiceV2 from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service-v2';

export default function WalletConnectLink({loading}: {loading: boolean}) {
  const walletConnectService = useWalletConnectService();
  const walletConnectServiceV2 = useWalletConnectServiceV2();

  const [lastEvent, setLastEvent] = useState<EventType | null>(null);

  const eventHandler = useCallback((ev: EventType) => {
    setLastEvent(ev);
  }, []);

  const handleOpenURL = useCallback(
    (ev: EventType | null) => {
      let url;
      if (loading || !ev) {
        return;
      }
      if (ev.url && walletConnectService) {
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

        setLastEvent(null);
        if (url) {
          if (detectWalletConnectVersion(url) === 2) {
            walletConnectServiceV2.connect(url);
          } else {
            walletConnectService.connect(url);
          }
        }
      }
    },
    [walletConnectService, loading],
  );

  useEffect(() => {
    Linking.addEventListener('url', eventHandler);

    return () => Linking.removeEventListener('url', eventHandler);
  }, [eventHandler]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          handleOpenURL({url: url});
        }
      })
      .catch(err => {
        console.warn('An error occurred', err);
      });
  }, [loading, handleOpenURL]);

  useEffect(() => {
    handleOpenURL(lastEvent);
  }, [lastEvent, handleOpenURL]);

  return <></>;
}
