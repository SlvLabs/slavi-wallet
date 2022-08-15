import React from 'react';
import useTranslation from '../../utils/use-translation';
import HaltModal from '../modal/halt-modal';

export interface SwapSuccessModalProps {
  onAccept: () => void;
  visible?: boolean;
  onCancel?: () => void;
}

export default function SwapSuccessModal(props: SwapSuccessModalProps) {
  const {visible, onCancel, onAccept} = props;

  const {t} = useTranslation();

  return (
    <HaltModal
      visible={visible}
      onCancel={onCancel}
      onAccept={onAccept}
      textButton={t('Ok')}
      textHeader={t('swapWaitHeader')}
      textDescription={`${t('swapWaitDescription1')}\n${t('swapWaitDescription2')}`}
    />
  );
}
