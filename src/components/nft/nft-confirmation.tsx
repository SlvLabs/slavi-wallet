import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import BaseAuthedModal from '../modal/base-authorized-modal';
import useTranslation from '../../utils/use-translation';
import getImageSource from '../../utils/get-image-source';
import {nftPlaceholder1} from '../../assets/images';
import NftInfoElement from '../../containers/nft/nft-info-element';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';
import Layout from '../../utils/layout';
import shrinkAddress from '../../utils/shrink-address';
import {ModalProps} from "../modal/base-modal";

export interface NftConfirmationProps extends ModalProps {
  onAccept: () => void;
  name: string;
  image?: string;
  address: string;
  amount?: string;
  fee: string;
  ticker?: string;
}

export default function NftConfirmation(props: NftConfirmationProps) {
  const {visible, onCancel, name, image, address, amount, fee, ticker, onAccept} = props;

  const {t} = useTranslation();

  return (
    <BaseAuthedModal visible={visible} onCancel={onCancel} showCloseIcon={true} modalStyle={styles.modal}>
      <Text style={styles.title}>{t('nftConfTitle')}</Text>
      <Image source={getImageSource(image, nftPlaceholder1)} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <NftInfoElement label={t('nftAddress')} value={shrinkAddress(address || '')} />
      {amount && (
        <NftInfoElement label={t('nftAmount')} value={`${amount} ${ticker || ''}`} valueStyle={styles.amount} />
      )}
      <NftInfoElement label={t('nftFee')} value={fee} isLast={true} />
      <SolidButton title={t('Ok')} onPress={onAccept} style={styles.button} containerStyle={styles.button} />
      <OutlineButton title={t('Cancel')} onPress={onCancel} style={styles.button} />
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
});
