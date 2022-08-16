import React, {useMemo} from 'react';
import {QrData, formatDataForQr} from '@slavi/wallet-core/src/utils/qr';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import QRCode, {QRCodeProps} from 'react-native-qrcode-svg';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface AddressQrData extends QrData {
  name?: string;
}

export interface QrViewProps extends QRCodeProps {
  data: AddressQrData;
  size: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onEdit: (name?: string) => void;
}

const QrView = (props: QrViewProps) => {
  const {data, size, containerStyle, ...otherProps} = props;
  const value = useMemo<string>(() => formatDataForQr(data), [data]);
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.centredElement}>
        <View style={styles.qrContainer}>
          <View style={{...styles.qrCorner, ...styles.qrCorner1}} />
          <View style={{...styles.qrCorner, ...styles.qrCorner2}} />
          <View style={{...styles.qrCorner, ...styles.qrCorner3}} />
          <View style={{...styles.qrCorner, ...styles.qrCorner4}} />
          <View style={styles.qrBackground}>
            <QRCode
              value={value}
              size={size}
              getRef={props.getRef}
              {...otherProps}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },
  centredElement: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qrContainer: {
    padding: 7,
  },
  qrCorner: {
    width: Layout.isSmallDevice ? 10 : 12,
    height: Layout.isSmallDevice ? 10 : 12,
    position: 'absolute',
  },
  qrCorner1: {
    top: 0,
    left: 0,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.white,
    borderRadius: 1,
    borderTopWidth: 2,
    borderTopColor: theme.colors.white,
    opacity: 0.2,
  },
  qrCorner2: {
    top: 0,
    right: 0,
    borderRightWidth: 2,
    borderRightColor: theme.colors.white,
    borderRadius: 1,
    borderTopWidth: 2,
    borderTopColor: theme.colors.white,
    opacity: 0.2,
  },
  qrCorner3: {
    bottom: 0,
    right: 0,
    borderRightWidth: 2,
    borderRightColor: theme.colors.white,
    borderRadius: 1,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.white,
    opacity: 0.2,
  },
  qrCorner4: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.white,
    borderRadius: 1,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.white,
    opacity: 0.2,
  },
  qrBackground: {
    backgroundColor: theme.colors.white,
    padding: Layout.isSmallDevice ? 8 : 10,
  }
});

export default QrView;
