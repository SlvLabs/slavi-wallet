import {useWebSocket} from '@slavi/wallet-core';
import HaltModal from './halt-modal';
import React, {useCallback} from 'react';
import useTranslation from '../../utils/use-translation';

export function TimeFixRequiredModal({onCancel}: {onCancel: () => void}) {
  const ws = useWebSocket();
  const onAccept = useCallback(() => {
    ws.open();
    onCancel();
  }, [ws, onCancel]);
  const {t} = useTranslation();

  return (
    <HaltModal
      visible={true}
      onAccept={onAccept}
      textHeader={t('Please set right time')}
      textDescription={t(
        'The time on your device is not set correct. Change the time to the current one and refresh the application',
      )}
      textButton={t('Refresh wallet')}
    />
  );
}
