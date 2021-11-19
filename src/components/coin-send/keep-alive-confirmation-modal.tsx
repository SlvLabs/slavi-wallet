import React, {useCallback, useState} from 'react';
import BaseModal, {BaseModalProps} from '../modal/base-modal';
import {StyleSheet, Text, View} from 'react-native';
import SolidButton from '../buttons/solid-button';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';

export interface KeepAliveConfirmationModalProps extends BaseModalProps {
  onConfirm: () => void;
}

const KeepAliveConfirmationModal = (props: KeepAliveConfirmationModalProps) => {
  const {onConfirm, ...other} = props;
  const {onCancel} = props;

  const [loading, setLoading] = useState<boolean>(false);

  const _onAccept = useCallback(() => {
    setLoading(true);
    onConfirm();
  }, [onConfirm])

  const {t} = useTranslation();

  return (
    <BaseModal {...other} >
      <View
        style={styles.headerContainer}>
        <Text style={styles.header}>
          {t('Sending a transaction will deactivate your address in the blockchain and burn all remaining coins on it.')}
        </Text>
      </View>
      <View
        style={styles.controlsContainer}>
        <SolidButton
          title={t('Ok')}
          onPress={_onAccept}
          buttonStyle={styles.acceptButton}
          loading={loading}
        />
        <SolidButton
          title={t('Cancel')}
          onPress={onCancel}
          buttonStyle={styles.cancelButton}
        />
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 8,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: theme.colors.white,
  },
  controlsContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    width: 88,
  },
  cancelButton: {
    width: 88,
  },
});

export default KeepAliveConfirmationModal;
