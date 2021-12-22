import React, {useCallback, useMemo} from 'react';
import BaseModal, {ModalProps} from './base-modal';
import SolidButton from '../buttons/solid-button';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text} from 'react-native';
import OutlineButton from '../buttons/outline-button';
import theme from '../../theme';

export interface ConfirmationModalProps extends ModalProps {
  onPositive: () => void;
  title: string;
  description?: string;
  positiveText?: string;
  negativeText?: string;
}

const defaultPositiveText = 'Yes';
const defaultNegativeText = 'No';

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const {
    title,
    description,
    visible,
    onCancel,
    modalStyle,
    contentStyle,
    onPositive,
    positiveText,
    negativeText
  } = props;

  const {t} = useTranslation();

  const _positiveText = useMemo(() => positiveText || defaultPositiveText, [positiveText]);
  const _negativeText = useMemo(() => negativeText || defaultNegativeText, [negativeText]);

  const _onPositive = useCallback(() => {
    onPositive();
    onCancel?.();
  }, [onPositive])

  return (
    <BaseModal
      visible={visible}
      onCancel={onCancel}
      modalStyle={modalStyle}
      contentStyle={contentStyle}
      showCloseIcon={true}>
      <Text style={styles.header}>{title}</Text>
      {!!description && (
        <Text style={styles.description}>{description}</Text>
      )}
      <SolidButton
        onPress={_onPositive}
        title={t(_positiveText)}
        containerStyle={styles.button}
      />
      <OutlineButton
        onPress={onCancel}
        title={t(_negativeText)}
        containerStyle={styles.button}
      />
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
    marginBottom: 16,
  },
  description: {
    alignSelf: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  }
});