import React, {useCallback, useEffect, useState} from 'react';
import BaseModal from '../modal/base-modal';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  useSelectCoinsForWalletConnect,
  useSelectWalletConnectSessionRequest,
} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import useTranslation from '../../utils/use-translation';
import SolidButton from '../buttons/solid-button';
import theme from '../../theme';
import OutlineButton from '../buttons/outline-button';
import getImageSource from '../../utils/get-image-source';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import AddressSelector from '../buttons/address-selector';
import useWalletConnectServiceV2 from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service-v2';

export default function WalletConnectSessionRequestModalV2() {
  const [error, setError] = useState<string>();
  const [account, setAccount] = useState<string>();
  const [accountIndex, setAccountIndex] = useState<number>(0);

  const {t} = useTranslation();
  const sessionRequest = useSelectWalletConnectSessionRequest();
  const coins = useSelectCoinsForWalletConnect(sessionRequest?.requiredNamespaces);
  const walletConnectService = useWalletConnectServiceV2();
  const {isLoading, balances} = useAddressesBalance('ETH');

  const onApprove = useCallback(() => {
    if (!sessionRequest.active || isLoading || !sessionRequest.requiredNamespaces) {
      return;
    }

    console.log(account);
    if (!account) {
      setError(t('walletAccountNotSet'));
      return;
    }

    const namespaces: any = {};
    Object.keys(sessionRequest.requiredNamespaces).forEach(key => {
      if (!sessionRequest.requiredNamespaces?.[key]) {
        return;
      }

      const accounts: string[] = [];
      sessionRequest?.requiredNamespaces?.[key].chains.map(chain => {
        accounts.push(`${chain}:${account}`);
      });

      namespaces[key] = {
        accounts: accounts,
        methods: sessionRequest.requiredNamespaces[key].methods,
        events: sessionRequest.requiredNamespaces[key].events,
      };
    });

    // TODO: Catch exception and set error
    walletConnectService.approveSession(sessionRequest.active, namespaces);
  }, [sessionRequest.active, sessionRequest.requiredNamespaces, isLoading, account, walletConnectService, t]);

  const onReject = useCallback(() => {
    if (!sessionRequest.active) {
      return;
    }
    // TODO: Catch exception and set error
    walletConnectService.rejectSession(sessionRequest.active);
  }, [walletConnectService, sessionRequest]);

  useEffect(() => {
    setError(undefined);
  }, [account, sessionRequest.active]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (balances?.[accountIndex]?.address) {
      setAccount(balances?.[accountIndex]?.address);
    }
  }, [accountIndex, balances, isLoading]);

  return (
    <BaseModal
      contentStyle={styles.container}
      visible={!!sessionRequest.active && sessionRequest.version === 2}
      onCancel={onReject}>
      <Text style={styles.header}>{t('walletConnectSessionHeader')}</Text>
      <Image source={{uri: sessionRequest.icon}} style={styles.logo} />
      <Text style={styles.name}>{sessionRequest.peerName}</Text>
      <Text style={styles.uri}>{sessionRequest.peerUrl}</Text>
      <Text style={styles.requiredBlockchains}>{t('walletConnectRequiredBlockchains')}</Text>
      {!!coins && (
        <ScrollView style={styles.networks}>
          {coins.map(coin => (
            <View style={styles.fixedNetworkContainer} key={coin.id}>
              <Image source={getImageSource(coin?.logo)} style={styles.coinLogo} />
              <View>
                <Text style={styles.networkLabel}>{t('walletNetwork')}</Text>
                <Text style={styles.networkName}>{coin?.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Text style={styles.addressLabel}>{t('walletConnectAddress')}</Text>
      <AddressSelector
        label={t('walletAccount')}
        containerStyle={styles.addressSelector}
        addresses={balances}
        onSelect={setAccountIndex}
        selectedAddress={accountIndex}
        ticker={''}
        hideBalances={true}
      />
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <SolidButton
          title={t('walletConnectApprove')}
          onPress={onApprove}
          containerStyle={styles.topButton}
          disabled={!!error}
          loading={isLoading}
        />
        <OutlineButton title={t('walletConnectReject')} onPress={onReject} />
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 40,
  },
  header: {
    alignSelf: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    color: theme.colors.white,
    marginBottom: 16,
  },
  name: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
  },
  uri: {
    alignSelf: 'center',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
    color: theme.colors.textLightGray1,
    marginBottom: 16,
  },
  buttonsRow: {},
  topButton: {
    marginBottom: 8,
  },
  addressSelector: {
    marginBottom: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    paddingTop: 16,
    paddingBottom: 16,
  },
  fixedNetworkContainer: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  networkLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.02,
    color: theme.colors.textLightGray1,
  },
  networkName: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.02,
    color: theme.colors.lighter,
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
  select: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
  },
  coinLogo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  requiredBlockchains: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
    marginBottom: 8,
  },
  addressLabel: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
    marginBottom: 8,
  },
  networks: {
    maxHeight: 260,
  },
});
