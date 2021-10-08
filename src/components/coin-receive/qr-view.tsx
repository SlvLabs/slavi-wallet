import React, {useMemo} from 'react';
import {QrData, formatDataForQr} from '@slavi/wallet-core/src/utils/qr';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import QRCode, {QRCodeProps} from 'react-native-qrcode-svg';
import AddressView from './address-view';
import theme from '../../theme';

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
          <View style={styles.qrContainerHorizontalOverlapping}>
            <View style={styles.qrContainerVerticalOverlapping}>
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
      <View style={styles.address}>
        <AddressView address={data.address} name={data.name} />
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
    backgroundColor: theme.colors.cardBackground3,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.colors.white,
  },
  qrContainerHorizontalOverlapping: {
    backgroundColor: theme.colors.white,
    marginTop: 23,
    marginBottom: 23,
    paddingLeft: 23,
    paddingRight: 23,
    marginRight: -4,
    marginLeft: -4,
  },
  qrContainerVerticalOverlapping: {
    backgroundColor: theme.colors.white,
    marginTop: -27,
    paddingTop: 23,
    marginBottom: -27,
    paddingBottom: 23,
  },
  address: {
    marginTop: 16,
  }
});

export default QrView;
