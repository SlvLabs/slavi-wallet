import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';

export function usePinProtection() {
  const authService = useAuthService();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      authService.forbid();
    }
  }, [isFocused, authService]);
}
