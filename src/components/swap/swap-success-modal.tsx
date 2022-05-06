import React from 'react';
import BaseModal, {BaseModalProps} from '../modal/base-modal';
import {StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import Spinner from '../spinner';
import theme from '../../theme';
import SolidButton from '../buttons/solid-button';

export interface SwapSuccessModalProps extends BaseModalProps {
  onAccept: () => void;
}

export default function SwapSuccessModal(props: SwapSuccessModalProps) {
  const {visible, onCancel, onAccept} = props;

  const {t} = useTranslation();

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      showCloseIcon={false}
    >
      <View style={styles.container}>
        <Spinner />
        <Text style={styles.header}>{t('swapWaitHeader')}</Text>
        <Text style={styles.description}>{`${t('swapWaitDescription1')}\n${t('swapWaitDescription2')}`}</Text>
      </View>
      <SolidButton title={t('Ok')} onPress={onAccept} />
    </BaseModal>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 31,
    color: theme.colors.white,
    paddingBottom: 8,
    alignSelf: 'center',
  },
  description: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.textLightGray,
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 36,
  }
});

