import React, {useCallback, useEffect, useState} from 'react';
import {useSelectWalletConnectSignRequest} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BaseModal from '../modal/base-modal';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import useTranslation from '../../utils/use-translation';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import theme from '../../theme';

export default function WalletConnectSignRequestModal() {
  const [error, setError] = useState<string>();

  const signRequest = useSelectWalletConnectSignRequest();
  const walletConnectService = useWalletConnectService();
  const {t} = useTranslation();

  const onApprove = useCallback(async () => {
    if(signRequest.peerId &&
      signRequest.method &&
      signRequest.coin &&
      signRequest.address &&
      signRequest.payload) {

      try {
        await walletConnectService.approveRequest(
          signRequest.peerId,
          signRequest.method,
          signRequest.coin,
          signRequest.address,
          signRequest.payload
        );
      } catch (err) {
        setError(err.toString());
      }
    }
  }, [signRequest, walletConnectService]);

  const onReject = useCallback(async () => {
    if(signRequest.peerId && signRequest.id) {
      try {
        await walletConnectService.rejectAction(
          signRequest.peerId,
          signRequest.id,
        );
      } catch (err) {
        setError(err);
      }
    }
  }, [walletConnectService, signRequest]);

  useEffect(() => {
    if(!signRequest.active) {
      setError(undefined);
    }
  }, [signRequest.active]);

  return (
    <BaseModal contentStyle={styles.container} visible={signRequest.active} onCancel={onReject}>
      <Text style={styles.header}>{t('walletConnectRequestSignHeader')}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>{t('walletFrom')}</Text>
        <Text style={styles.address}>{signRequest.address}</Text>
      </View>
      <View style={styles.dappContainer}>
        <Text style={styles.label}>{t('dapp')}</Text>
        <Text style={styles.dapp}>{signRequest.dapp}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.label}>{t('message')}</Text>
        <ScrollView style={styles.messageScroll}>
          <Text style={styles.message}>{signRequest.message}</Text>
        </ScrollView>
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <SolidButton
          title={t('walletConnectApprove')}
          onPress={onApprove}
          containerStyle={styles.topButton}
        />
        <OutlineButton
          title={t('walletConnectReject')}
          onPress={onReject}
        />
      </View>
    </BaseModal>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    alignSelf: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    color: theme.colors.white,
    marginBottom: 16,
  },
  errorContainer: {
    marginBottom: 10,
  },
  error: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.errorRed,
  },
  buttonsRow: {},
  topButton: {
    marginBottom: 8,
  },
  addressContainer: {
    marginBottom: 12,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray1,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
  },
  dappContainer: {
    marginBottom: 12,
  },
  dapp: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
  },
  message: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
  },
  messageContainer: {},
  messageScroll: {
    maxHeight: 300,
  }
});
