import React, {useMemo} from 'react';
import {QrData, formatDataForQr} from '@slavi/wallet-core/src/utils/qr';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import QRCode, {QRCodeProps} from 'react-native-qrcode-svg';
import AddressView from './address-view';

export interface AddressQrData extends QrData {
  name?: string;
}

export interface QrViewProps extends QRCodeProps {
  data: AddressQrData;
  size: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onDataChange?: (data: string | null) => void;
  onEdit: (name?: string) => void;
}

const QrView = (props: QrViewProps) => {
  const {data, size, containerStyle, ...otherProps} = props;
  const value = useMemo<string>(() => formatDataForQr(data), [data]);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.centredElement}>
        <View style={styles.qrContainer}>
          <QRCode
            value={value}
            size={size}
            getRef={props.getRef}
            {...otherProps}
          />
        </View>
      </View>
      <AddressView address={data.address} name={data.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  centredElement: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qrContainer: {},
});

export default QrView;
