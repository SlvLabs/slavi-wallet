import React, {useCallback, useEffect, useState} from 'react';
import {useSelectWalletConnectTxRequest} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import {StyleSheet, Text, View} from 'react-native';
import BaseAuthedModal from '../modal/base-authorized-modal';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import useTranslation from '../../utils/use-translation';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import theme from '../../theme';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import NumberText from '../text/number-text';
import {EIP155SigningMethod} from '@slavi/wallet-core/src/utils/eip155';
import useWalletConnectServiceV2 from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service-v2';

export default function WalletConnectTxRequestModal() {
  const [error, setError] = useState<string>();

  const request = useSelectWalletConnectTxRequest();
  const walletConnectServiceV2 = useWalletConnectServiceV2();
  const walletConnectService = useWalletConnectService();
  const {t} = useTranslation();

  const onApprove = useCallback(async () => {
    if (request.version === 2) {
      if (request.active && request.topic && request.method && request.coin && request.address && request.payload) {
        try {
          await walletConnectServiceV2.approveRequest(
            request.active,
            request.method as unknown as EIP155SigningMethod,
            request.coin,
            request.address,
            request.topic,
            request.payload,
          );
        } catch (err) {
          if (err instanceof CreateTransactionError) {
            setError(t('Can not create transaction. Try latter or contact support.'));
          } else {
            setError((err as Error).toString());
          }
        }
      }
    } else {
      if (request.peerId && request.method && request.coin && request.address && request.payload) {
        try {
          await walletConnectService.approveRequest(
            request.peerId,
            request.method,
            request.coin,
            request.address,
            request.payload,
          );
        } catch (err) {
          if (err instanceof CreateTransactionError) {
            setError(t('Can not create transaction. Try latter or contact support.'));
          } else {
            setError((err as Error).toString());
          }
        }
      }
    }
  }, [
    request.version,
    request.active,
    request.topic,
    request.method,
    request.coin,
    request.address,
    request.payload,
    request.peerId,
    walletConnectServiceV2,
    t,
    walletConnectService,
  ]);

  const onReject = useCallback(async () => {
    if (request.version === 2) {
      if (request.topic && request.active) {
        try {
          await walletConnectServiceV2.rejectRequest(request.active, request.topic);
        } catch (err) {
          setError((err as Error).toString());
        }
      }
    } else {
      if (request.peerId && request.active) {
        try {
          await walletConnectService.rejectAction(request.peerId, request.active);
        } catch (err) {
          setError((err as Error).toString());
        }
      }
    }
  }, [
    request.version,
    request.topic,
    request.active,
    request.peerId,
    request.id,
    walletConnectServiceV2,
    walletConnectService,
  ]);

  useEffect(() => {
    if (!request.active) {
      setError(undefined);
    }
  }, [request.active]);

  return (
    <BaseAuthedModal contentStyle={styles.container} visible={!!request.active} onCancel={onReject}>
      <Text style={styles.header}>{t('walletConnectRequestTxHeader')}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>{t('walletFrom')}</Text>
        <Text style={styles.address}>{request.address}</Text>
      </View>
      {!!request.name && (
        <View style={styles.dappContainer}>
          <Text style={styles.label}>{t('dappName')}</Text>
          <Text style={styles.dapp}>{request.name}</Text>
        </View>
      )}
      <View style={styles.dappContainer}>
        <Text style={styles.label}>{t('dapp')}</Text>
        <Text style={styles.dapp}>{request.dapp}</Text>
      </View>
      <View style={styles.feeContainer}>
        <Text style={styles.label}>{t('fee')}</Text>
        <NumberText value={request.fee || ''} style={styles.fee} />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <SolidButton title={t('walletConnectApprove')} onPress={onApprove} containerStyle={styles.topButton} />
        <OutlineButton title={t('walletConnectReject')} onPress={onReject} />
      </View>
    </BaseAuthedModal>
  );
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
    fontSize: 11,
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
  fee: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
  },
  feeContainer: {
    marginBottom: 12,
  },
});
