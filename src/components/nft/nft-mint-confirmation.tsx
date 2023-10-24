import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import BaseAuthedModal from '../modal/base-authorized-modal';
import useTranslation from '../../utils/use-translation';
import NftInfoElement from '../../containers/nft/nft-info-element';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';
import Layout from '../../utils/layout';
import shrinkAddress from '../../utils/shrink-address';
import {Decimal80} from '@slavi/wallet-core/src/utils/prepared-decimal';
import {ModalProps} from "../modal/base-modal";

export interface NftConfirmationProps extends ModalProps {
  onAccept: () => void;
  name: string;
  address: string;
  fee: string;
  baseAmount: string;
  loading: boolean;
  error: string;
}

export default function NftMintConfirmation(props: NftConfirmationProps) {
  const {visible, onCancel, name, address, fee, onAccept, baseAmount, loading, error} = props;

  const {t} = useTranslation();

  const totalFee = useMemo(() => new Decimal80(fee).add(baseAmount).toString(), [fee, baseAmount]);

  return (
    <BaseAuthedModal visible={visible} onCancel={onCancel} showCloseIcon={true} modalStyle={styles.modal}>
      <Text style={styles.title}>{t('nftMintConfTitle')}</Text>
      <Text style={styles.name}>{name}</Text>
      <NftInfoElement label={t('nftAddress')} value={shrinkAddress(address || '')} />
      <NftInfoElement label={t('nftMintFee')} value={totalFee} isLast={true} />
      <Text style={styles.error}>{error}</Text>
      <SolidButton title={t('Ok')} onPress={onAccept} style={styles.button} containerStyle={styles.button} loading={loading} />
      <OutlineButton title={t('Cancel')} onPress={onCancel} style={styles.button} disabled={loading} />
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21 : 28,
    color: theme.colors.white,
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: Layout.isSmallDevice ? 120 : 180,
    height: Layout.isSmallDevice ? 120 : 180,
    borderRadius: 12,
    alignSelf: 'center',
  },
  name: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21 : 28,
    color: theme.colors.white,
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  amount: {
    color: theme.colors.green,
  },
  error: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.red,
    marginTop: 16,
    textAlign: 'center',
  },
});
