import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import QrReaderModal from '../components/coin-send/qr-reader-modal';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import SimpleToast from 'react-native-simple-toast';
import useTranslation from './use-translation';
import {useCoinSpecsService} from '@slavi/wallet-core';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';

export interface useQrReaderResult {
  modal: ReactNode;
  showModal: () => void;
}

export interface useQrReaderParams {
  onRead: (value: QrData) => void;
  coin: string;
}

export default function useQrReader(params: useQrReaderParams): useQrReaderResult {
  const {coin, onRead} = params;

  const [activeQR, setActiveQR] = useState<boolean>(false);

  const {t} = useTranslation();
  const coinSpecService = useCoinSpecsService();
  const coinDetails = useCoinDetails(coin);

   const coinSpec = useMemo(() => coinSpecService.getSpec(coin), [coinSpecService, coin]);

  const showModal = useCallback(() => setActiveQR(true), []);

  const onQrReadFailed = useCallback(
    () => SimpleToast.show(t('Can not read qr')),
    [t],
  );

  const onQRRead = useCallback((data: any) => {
      if(!coinSpec || !coinDetails) {
        onQrReadFailed();
        return;
      }

      let parsed: QrData | undefined;
      let bip21Name = coinSpec.bip21Name;
      if (coinDetails.parent) {
        const coinParentSpec = coinSpecService.getSpec(coinDetails.parent);
        if (coinParentSpec) {
          bip21Name = coinParentSpec?.bip21Name;
        }
      }

      try {
        parsed = parseDataFromQr(data, bip21Name);
      } catch (e) {
        onQrReadFailed();
        return;
      }

      if (!parsed) {
        onQrReadFailed();
        return;
      }

      setActiveQR(false);
      onRead(parsed);
  }, [coinSpec, coinDetails, coinSpecService, onRead, onQrReadFailed]);

  return {
    modal: <QrReaderModal
      visible={activeQR}
      onQRRead={onQRRead}
      onClose={() => setActiveQR(false)}
    />,
    showModal: showModal,
  };
}
