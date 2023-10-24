import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import useTranslation from '../../utils/use-translation';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';
import {BarCodeScanner} from "expo-barcode-scanner";
import Layout from "../../utils/layout";
import FullScreenModal from "../modal/full-screen-modal";

export interface QrInSendModalProps {
  visible: boolean;
  onQRRead(data: string): void;
  onClose(): void;
  negativeBtnStyle?: ViewStyle;
}

const QrReaderModal = ({onClose, onQRRead, visible, negativeBtnStyle}: QrInSendModalProps) => {
  const [hasPermission, setHasPermission] = useState<boolean|null>(null);

  const {t} = useTranslation();

  const getBarCodeScannerPermissions = useCallback(async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }, []);

  useEffect(() => {
    if(visible && hasPermission === null) {
      getBarCodeScannerPermissions();
    }
  }, [getBarCodeScannerPermissions, visible, hasPermission]);

  const content = useMemo(() => {
    if (hasPermission === null) {
      return (
          <View style={styles.noPermissionContainer}>
            <Text style={styles.text}>{t('requestingPermission')}</Text>
          </View>);
    }
    if (!hasPermission) {
      return (
          <View style={styles.noPermissionContainer}>
            <Text style={styles.text}>{t('noAccessToCamera')}</Text>
          </View>
      );
    }

    return (
        <>
          <View style={styles.cameraOverlay}>
            <View style={styles.verticalOverlay}>
              <View style={styles.horizontalOverlay}>
                <View style={styles.cameraLine2} />
              </View>
            </View>
          </View>
          <View style={styles.cameraContainer}>
            <BarCodeScanner
                onBarCodeScanned={e => onQRRead(e.data)}
                style={styles.camera}
                type={BarCodeScanner.Constants.Type.back}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            >
              <View style={styles.cameraLine}/>
            </BarCodeScanner>
          </View>
        </>
    )
  }, [onQRRead, hasPermission]);

  return (
    <FullScreenModal
        visible={visible}
        onCancel={onClose}
        hideCloseButton={true}
        title={t('qrCodeScanner')}
        rightIconName={'close'}
        rightIconOnPress={onClose}
    >
      <View style={styles.content}>
        {content}
        <Text style={styles.bottomText}>{t('Scan the QR code found on your profile, on the website')}</Text>
        <OutlineButton
          onPress={onClose}
          title={t('Close')}
          buttonStyle={{...styles.negativeBtn, ...negativeBtnStyle}}
        />
      </View>
    </FullScreenModal>
  );
};

const cameraSize = Layout.isSmallDevice ? 200 : 235;

const styles = StyleSheet.create({
  camera: {
    width: cameraSize,
    height: cameraSize + 70,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
    flexDirection: 'column',
    alignItems: 'center',
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
    marginTop: Layout.isSmallDevice ? 72 : 110,
  },
  negativeBtn: {
    width: 160,
  },
  content: {
    alignItems: 'center',
    paddingTop: Layout.isSmallDevice ? 72 : 110,
    flex: 1,
    overflow: 'hidden',
  },
  cameraLine: {
    height: 2,
    backgroundColor: theme.colors.white,
    marginTop: -70,
  },
  cameraLine2: {
    height: 2,
    backgroundColor: theme.colors.white,
    width: cameraSize + 32,
  },
  cameraOverlay: {
    borderColor: theme.colors.white,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: cameraSize + 4,
    height: cameraSize + 4,
  },
  verticalOverlay: {
    backgroundColor: theme.colors.modalBackground,
    height: cameraSize + 6,
    width: cameraSize - 32,
    marginTop: -3,
    marginBottom: -3,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalOverlay: {
    backgroundColor: theme.colors.modalBackground,
    width: cameraSize + 6,
    height: cameraSize - 32,
    marginLeft: -3,
    marginRight: -3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.white,
    width: 246,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: Layout.isSmallDevice ? 72 : 110,
  },
  noPermissionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: cameraSize,
  },
  tryButton: {
    width: 200,
  },
  cameraContainer: {
    overflow: "hidden",
    width: cameraSize,
    height: cameraSize,
    marginTop: -cameraSize - 2,
  }
});

export default QrReaderModal;
