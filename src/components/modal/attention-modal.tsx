import BaseAuthedModal from './base-authorized-modal';
import useTranslation from '../../utils/use-translation';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {attention} from '../../assets/images';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';
import Layout from '../../utils/layout';
import {ModalProps} from "./base-modal";

export interface AttentionModalProps extends ModalProps {
  text: string;
  onAccept: () => void;
}
export function AttentionModal({text, onAccept, ...baseModalProps}: AttentionModalProps) {
  const {t} = useTranslation();

  return (
    <BaseAuthedModal contentStyle={styles.container} {...baseModalProps}>
      <Image source={attention} style={styles.image} />
      <Text style={styles.title}>{t('attention')}</Text>
      <Text style={styles.text}>{text}</Text>
      <SolidButton onPress={onAccept} title={t('attentionContinue')} containerStyle={styles.acceptButton}/>
      <OutlineButton onPress={baseModalProps.onCancel} title={t('attentionCancel')} containerStyle={styles.declineButton} />
    </BaseAuthedModal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: Layout.isSmallDevice ? 18: 20,
    lineHeight: Layout.isSmallDevice ? 24 : 28,
    color: theme.colors.white,
    marginTop: 24,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: Layout.isSmallDevice ? 13 : 14,
    lineHeight: Layout.isSmallDevice ? 18 : 20,
    color: theme.colors.textLightGray,
    marginTop: 12,
    marginBottom: 32,
  },
  acceptButton: {
    width: Layout.isSmallDevice ? 225: 263,
    marginBottom: 8,
  },
  declineButton: {
    width: Layout.isSmallDevice ? 225: 263,
  },
  image: {
    width: 80,
    height: 80,
  },
});
