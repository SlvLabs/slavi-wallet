import {ModalProps, StyleSheet, Text, View} from 'react-native';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import React, {useCallback, useMemo, useState} from 'react';
import BaseModal from '../modal/base-modal';
import useTranslation from '../../utils/use-translation';
import SimpleRadio from '../controls/simple-radio';
import theme from '../../theme';
import SlippageToleranceInput from './slippage-tolerance-input';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import OutlineSuccessButton from '../buttons/outline-success-button';

export interface SettingsModalProps extends ModalProps {
  speed: TransactionPriority;
  slippageTolerance: number;
  onAccept: (speed: TransactionPriority, value: number) => void;
  onCancel?: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
  const {speed, slippageTolerance, visible, onCancel, onAccept} = props;

  const [internalTxPriority, setInternalTxPriority] = useState<TransactionPriority>(speed);
  const [internalSlippageTolerance, setInternalSlippageTolerance] = useState<number>(slippageTolerance);
  const [error, setError] = useState<string>();

  const {t} = useTranslation();

  const speedOptions = useMemo(() => ([
    {value: TransactionPriority.slow, label: t('low')},
    {value: TransactionPriority.average, label: t('medium')},
    {value: TransactionPriority.fast, label: t('high')},
  ]), [t]);

  const submit = useCallback(() => {
    if (internalTxPriority && internalSlippageTolerance) {
      onAccept(internalTxPriority, internalSlippageTolerance);
    } else {
      setError(t('paramsRequired'));
    }
  }, [internalSlippageTolerance, onAccept, internalTxPriority, t]);

  useCallback(() => {
    if (visible) {
      setInternalSlippageTolerance(slippageTolerance);
      setInternalTxPriority(speed);
    }
    setError(undefined);
  }, [slippageTolerance, speed, visible]);

  return (
    <BaseModal visible={visible} onCancel={onCancel} showCloseIcon={true} modalStyle={styles.modal}>
      <Text style={styles.header}>{t('Settings')}</Text>
      <View style={styles.speedView}>
        <Text style={styles.label}>{t('speed')}</Text>
        <SimpleRadio options={speedOptions} selected={internalTxPriority} onChange={setInternalTxPriority} />
      </View>
      <View style={styles.slippageView}>
        <Text style={styles.label}>{t('slippageTolerance')}, %</Text>
        <SlippageToleranceInput value={internalSlippageTolerance} onChange={setInternalSlippageTolerance} />
      </View>
      <Text style={styles.error}>{error}</Text>
      <OutlineSuccessButton title={t('Ok')} onPress={submit} />
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
    textAlign: 'center',
    marginBottom: 8,
  },
  speedView: {
    marginBottom: 12,
  },
  slippageView: {
    marginBottom: 24,
  },
  label: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17,
    color: theme.colors.textLightGray1,
    marginBottom: 6,
  },
  error: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.errorRed,
  },
});
