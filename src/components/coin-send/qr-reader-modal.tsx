import React from 'react';
import {Modal, StyleSheet, Text, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';

export interface QrInSendModalProps {
  visible: boolean;
  onQRRead(data: string): void;
  onClose(): void;
  negativeBtnStyle?: ViewStyle;
}

const QrReaderModal = (props: QrInSendModalProps) => {
  const {t} = useTranslation();
  return (
    <Modal animationType="fade" transparent={false} visible={props.visible}>
      <View style={styles.background}>
        <QRCodeScanner
          onRead={e => props.onQRRead(e.data)}
          containerStyle={styles.centeredView}
          bottomViewStyle={styles.bottomContainer}
          markerStyle={{borderColor: theme.colors.white}}
          showMarker={true}
          cameraProps={{flashMode: 'auto'}}
          bottomContent={
            <View style={styles.bottomContent}>
              <Text style={styles.bottomText}>{t('Scan the QR code found on your profile, on the website')}</Text>
              <OutlineButton
                onPress={props.onClose}
                title={t('Close')}
                buttonStyle={{...styles.negativeBtn, ...props.negativeBtnStyle}}
              />
            </View>
          }
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 10,
  },
  negativeBtn: {
    width: 160,
  },
  background: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  bottomContainer: {
    flex: 10,
  },
  bottomText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.lightGray,
    width: 246,
    textAlign: 'center',
    marginBottom: 40,
  },
  bottomContent: {
    alignItems: 'center',
  },
});

export default QrReaderModal;
