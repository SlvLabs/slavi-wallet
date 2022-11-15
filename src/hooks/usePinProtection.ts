import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';

export function usePinProtection() {
  const authService = useAuthService();

  const forbid = useCallback(() => {
    authService.forbid();
  }, [])

  useFocusEffect(forbid);
}
