import React, {useCallback, useMemo, useState} from 'react';
import {AttentionModal} from '../components/modal/attention-modal';
import useTranslation from '../utils/use-translation';
import {useResetAccount} from '@slavi/wallet-core/src/providers/ws/hooks/use-reset-account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';

export function useDeleteAccount() {
  const [confIsShown, setConfIsShown] = useState<boolean>(false);

  const {t} = useTranslation();
  const authService = useAuthService();

  const show = useCallback(() => {
    authService.forbid();
    setConfIsShown(true);
  }, []);
  const hide = useCallback(() => setConfIsShown(false), []);

  const reload = useCallback(async () => {
    AsyncStorage.clear().then(() => RNRestart.Restart());
  }, []);

  const {request} = useResetAccount(reload);

  const modal = useMemo(() => {
    return (
      <AttentionModal
        visible={confIsShown}
        text={t('deleteAccountDescription')}
        onAccept={request}
        onCancel={hide}
        showCloseIcon={true}
      />
    )
  }, [request, hide, show, confIsShown]);

  return {
    modal,
    show,
    hide,
  }
}
