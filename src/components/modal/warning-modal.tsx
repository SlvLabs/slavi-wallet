import React, {useCallback} from 'react';
import BaseModal, {ModalProps} from './base-modal';
import SolidButton from '../buttons/solid-button';
import useTranslation from '../../utils/use-translation';
import {StyleSheet, Text} from 'react-native';
import theme from '../../theme';

export interface ConfirmationModalProps extends ModalProps {
  title: string;
  description?: string;
}

export default function WarningModal(props: ConfirmationModalProps) {
  const {
    title,
    description,
    visible,
    onCancel,
    modalStyle,
    contentStyle,
  } = props;

  const {t} = useTranslation();

  const onPress = useCallback(() => {
    onCancel?.();
  }, [onCancel])

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
        onPress={onPress}
        title={t('OK')}
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
