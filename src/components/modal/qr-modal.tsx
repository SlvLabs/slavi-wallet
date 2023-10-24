import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import BaseAuthedModal from './base-authorized-modal';
import QRCode from 'react-native-qrcode-svg';
import theme from '../../theme';
import Layout from '../../utils/layout';
import {ModalProps} from "./base-modal";

export interface QrModalProps extends ModalProps {
  title: string;
  data: string;
  description?: string;
}

export default function QrModal(props: QrModalProps) {
  const {title, data, description, ...other} = props;

  return (
    <BaseAuthedModal {...other} contentStyle={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.qrContainer}>
        <View style={{...styles.qrCorner, ...styles.qrCorner1}} />
        <View style={{...styles.qrCorner, ...styles.qrCorner2}} />
        <View style={{...styles.qrCorner, ...styles.qrCorner3}} />
        <View style={{...styles.qrCorner, ...styles.qrCorner4}} />
        <View style={styles.qrBackground}>
          <QRCode value={data} size={256} />
        </View>
      </View>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 25,
    color: theme.colors.white,
    marginBottom: 24,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    alignSelf: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 24,
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
  },
});
