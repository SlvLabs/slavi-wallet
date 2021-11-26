import React from 'react';
import {Text, StyleSheet} from 'react-native';
import BaseModal, {ModalProps} from './base-modal';
import QRCode from 'react-native-qrcode-svg';
import theme from '../../theme';

export interface QrModalProps extends ModalProps {
  title: string;
  data: string;
  description?: string;
}

export default function QrModal(props: QrModalProps) {
  const {title, data, description, ...other} = props;

  return (
    <BaseModal {...other} contentStyle={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <QRCode value={data} size={256} />
        {!!description && <Text style={styles.description}>{description}</Text>}
    </BaseModal>
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
  }
});
