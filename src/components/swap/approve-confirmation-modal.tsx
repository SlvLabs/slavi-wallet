import BaseModal, { ModalProps } from "../modal/base-modal";
import {StyleSheet, Text} from 'react-native';
import useTranslation from '../../utils/use-translation';
import React from "react";
import SolidButton from '../buttons/solid-button';
import TxMetaInfo from './tx-meta-info';
import theme from '../../theme';

export interface ApproveConfirmationModalProps extends ModalProps {
  contract: string;
  fee: string;
  onAccept: () => void;
  loading?: boolean;
  feeTicker: string;
}

export default function ApproveConfirmationModal(props: ApproveConfirmationModalProps) {
  const {contract, fee, visible, onCancel, onAccept, loading, feeTicker} = props;

  const {t} = useTranslation();

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      showCloseIcon={false}
      modalStyle={styles.modal}
    >
      <Text style={styles.header}>{t('approveConf')}</Text>
      <TxMetaInfo
        contract={contract}
        contractLabel={t('swapContract')}
        fee={fee}
        feeLabel={t('approveFee')}
        feeTicker={feeTicker}
      />
      <SolidButton title={t('Ok')} onPress={onAccept} containerStyle={styles.okButton} loading={loading} />
      <SolidButton title={t('Cancel')} onPress={onCancel} />
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  modal: {},
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 25,
    color: theme.colors.white,
    paddingBottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  content: {},
  okButton: {
    marginTop: 20,
    marginBottom: 10,
  },
});
