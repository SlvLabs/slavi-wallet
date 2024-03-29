import BaseAuthedModal from '../modal/base-authorized-modal';
import TxMetaInfo from './tx-meta-info';
import TxInfo, {TxInfoProps} from './tx-info';
import {StyleSheet, Text} from 'react-native';
import SolidButton from '../buttons/solid-button';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import OutlineButton from '../buttons/outline-button';
import Layout from '../../utils/layout';
import {ModalProps} from "../modal/base-modal";

export interface SwapConfirmationModalProps extends ModalProps, TxInfoProps {
  onAccept: () => void;
  contract: string;
  fee: string;
  loading?: boolean;
  feeTicker: string;
}

export default function SwapConfirmationModal(props: SwapConfirmationModalProps) {
  const {
    contract,
    fee,
    visible,
    onCancel,
    onAccept,
    srcCoin,
    srcAmount,
    srcLogo,
    dstCoin,
    dstAmount,
    dstLogo,
    loading,
    feeTicker,
  } = props;

  const {t} = useTranslation();

  return (
    <BaseAuthedModal
      visible={visible}
      onCancel={onCancel}
      showCloseIcon={true}
      contentStyle={styles.modal}
    >
      <Text style={styles.header}>{t('swapConf')}</Text>
      <TxInfo
        srcCoin={srcCoin}
        srcAmount={srcAmount}
        srcLogo={srcLogo}
        dstCoin={dstCoin}
        dstAmount={dstAmount}
        dstLogo={dstLogo}
      />
      <TxMetaInfo
        contract={contract}
        contractLabel={t('swapContract')}
        fee={fee}
        feeLabel={t('swapFee')}
        feeTicker={feeTicker}
      />
      <SolidButton title={t('Ok')} onPress={onAccept} containerStyle={styles.okButton} loading={loading} />
      <OutlineButton title={t('Cancel')} onPress={onCancel} />
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: undefined,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: Layout.isSmallDevice ? 20 : 32,
    paddingRight: Layout.isSmallDevice ? 20 : 32,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 25,
    color: theme.colors.white,
    paddingBottom: 20,
    alignSelf: 'center',
  },
  content: {},
  okButton: {
    marginTop: 20,
    marginBottom: 10,
  }
});
