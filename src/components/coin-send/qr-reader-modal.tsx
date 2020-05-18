import React from 'react';
import {Modal, StyleSheet, ViewStyle} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import QRCodeScanner from 'react-native-qrcode-scanner';

export interface QrInSendModalProps {
  visible: boolean;
  onQRRead(data: any): void;
  onClose(): void;
  negativeBtnStyle?: ViewStyle;
}

const QrReaderModal = (props: QrInSendModalProps) => {
  const {t} = useTranslation();
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <QRCodeScanner
        onRead={e => props.onQRRead(e.data)}
        containerStyle={styles.centeredView}
        showMarker={true}
        cameraProps={{flashMode: 'auto'}}
        bottomContent={
          <Button
            onPress={props.onClose}
            title={t('Close')}
            style={{...styles.negativeBtn, ...props.negativeBtnStyle}}
          />
        }
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  negativeBtn: {},
});

export default QrReaderModal;
