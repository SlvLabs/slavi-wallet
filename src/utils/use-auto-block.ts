import {useEffect, useRef} from 'react';
import {AppState} from "react-native";
import {AuthServiceInterface} from '@slavi/wallet-core/src/types';

export default function useAutoBlock(authService?: AuthServiceInterface) {
  const appState = useRef(AppState.currentState);
  const blockTime = useRef<number|null>(null);

  useEffect(() => {
    AppState.addEventListener("change", nextAppState => {
      if(!authService) {
        return;
      }

      if(appState.current.match(/inactive|background/) && nextAppState === "active") {
        const now = (new Date()).getTime();
        if(blockTime.current && blockTime.current < ( now - authService.getAutoBlockTimeout())) {
          authService.forbid();
        }
        blockTime.current = null;
      } else if(appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        blockTime.current = (new Date()).getTime();
      }
      appState.current = nextAppState;
    });
  }, [authService]);
}
