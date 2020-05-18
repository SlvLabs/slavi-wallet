import RecipientInput from '../../coin-send/recipient-input';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import QrReaderModal from '../../coin-send/qr-reader-modal';
import {View} from 'react-native';

export interface FullFilterAddressInputProps {
  onChange: (address?: string) => void;
  address?: string;
}

const FullFilterAddressInput = (props: FullFilterAddressInputProps) => {
  const {onChange, address} = props;

  const {t} = useTranslation();

  const [qrModalShown, setQrModalShown] = useState<boolean>(false);

  const showQrReader = useCallback(() => setQrModalShown(true), []);
  const hideQrReader = useCallback(() => setQrModalShown(false), []);

  const onQrReadFailed = useCallback(
    () => SimpleToast.show(t('Can not read qr')),
    [t],
  );

  const onQRRead = useCallback(
    (data: any) => {
      let parsed: QrData | undefined;
      try {
        parsed = parseDataFromQr(data);
      } catch (e) {
        onQrReadFailed();
        return;
      }

      if (!parsed) {
        onQrReadFailed();
        return;
      }

      onChange(parsed.address);
      hideQrReader();
    },
    [hideQrReader, onChange, onQrReadFailed],
  );

  return (
    <View>
      <RecipientInput
        label={t('Searching address')}
        onPressQr={showQrReader}
        value={address}
        onChange={onChange}
      />
      <QrReaderModal
        visible={qrModalShown}
        onQRRead={onQRRead}
        onClose={hideQrReader}
      />
    </View>
  );
};

export default FullFilterAddressInput;
