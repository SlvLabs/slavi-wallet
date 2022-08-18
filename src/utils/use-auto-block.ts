import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {AuthServiceInterface} from '@slavi/wallet-core/src/types';

export default function useAutoBlock(authService?: AuthServiceInterface): boolean {
  const appState = useRef(AppState.currentState);
  const blockTime = useRef<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      console.log(appState.current, nextAppState);
      if (!authService) {
        return;
      }

      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const now = new Date().getTime();
        if (blockTime.current && blockTime.current >= now - authService.getAutoBlockTimeout()) {
          authService.authorize();
        }
        setLoading(false);
        blockTime.current = null;
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        blockTime.current = new Date().getTime();
        setLoading(true);
        authService.forbid();
      }
      appState.current = nextAppState;
    });
  }, [authService]);

  return loading;
}
