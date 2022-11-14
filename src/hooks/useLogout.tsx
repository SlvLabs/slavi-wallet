import React, {useCallback, useMemo, useState} from 'react';
import {AttentionModal} from '../components/modal/attention-modal';
import useTranslation from '../utils/use-translation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';

export function useLogout() {
  const [confIsShown, setConfIsShown] = useState<boolean>(false);

  const {t} = useTranslation();
  const authService = useAuthService();

  const show = useCallback(() => {
    authService.forbid();
    setConfIsShown(true);
  }, []);
  const hide = useCallback(() => setConfIsShown(false), []);

  const onAccept = useCallback(() => {
    AsyncStorage.clear().then(() => RNRestart.Restart());
  }, []);

  const modal = useMemo(() => {
    return (
      <AttentionModal
        visible={confIsShown}
        text={t('logoutDescription')}
        onAccept={onAccept}
        onCancel={hide}
        showCloseIcon={true}
      />
    )
  }, [onAccept, hide, show, confIsShown]);

  return {
    modal,
    show,
    hide,
  }
}
