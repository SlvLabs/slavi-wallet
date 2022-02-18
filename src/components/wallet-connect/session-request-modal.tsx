import React, {useCallback, useEffect, useMemo, useState} from 'react';
import BaseModal from '../modal/base-modal';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  useSelectCoinsForWalletConnect,
  useSelectWalletConnectSessionRequest
} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import useTranslation from '../../utils/use-translation';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import SolidButton from '../buttons/solid-button';
import theme from '../../theme';
import OutlineButton from '../buttons/outline-button';
import AddressSelector from '../buttons/address-selector';
import SimpleSelect from '../controls/simple-select';
import {CoinForWalletConnect} from '@slavi/wallet-core/src/store/modules/wallet-connect/index';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';

export default function WalletConnectSessionRequestModal() {
  const [coin, setCoin] = useState<CoinForWalletConnect>();
  const [account, setAccount] = useState<string>()
  const [accountIndex, setAccountIndex] = useState<number>(0);
  const [error, setError] = useState<string>();

  const {t} = useTranslation();
  const sessionRequest = useSelectWalletConnectSessionRequest();
  const coins = useSelectCoinsForWalletConnect();
  const walletConnectService = useWalletConnectService();
  const balancesState = useAddressesBalance(coin?.id || 'stub');

  const onApprove = useCallback(() => {
    if(sessionRequest.peerId && coin && account) {
      // TODO: Catch exception and set error
      walletConnectService.approveSession(
        sessionRequest.peerId,
        coin.chainId,
        account,
      );
    } else {
      setError(t('walletAccountNotSet'));
    }
  }, [walletConnectService, sessionRequest, coin, account]);

  const onReject = useCallback(() => {
    if(sessionRequest.peerId) {
      // TODO: Catch exception and set error
      walletConnectService.rejectSession(sessionRequest.peerId);
    }
  }, [walletConnectService, sessionRequest]);

  const chainSelectOptions = useMemo(() => coins.reduce<Record<string, string>>((acc, coin) => {
    acc[coin.id] = coin.name;
    return acc;
  }, {}), [coins]);

  useEffect(() => {
    if(sessionRequest.chainId) {
      const _coin = coins.find(element => element.chainId === sessionRequest.chainId);
      if(_coin) {
        setCoin(_coin);
      } else {
        setError(t('unsupportedChainId'));
      }
    }
  }, [sessionRequest.chainId, coins]);

  useEffect(() => {
    if(!sessionRequest.active) {
      setAccount(undefined);
      setError(undefined);
    }
  }, [sessionRequest.active]);

  useEffect(() => {
    if(!balancesState.isLoading && balancesState?.balances?.[accountIndex]?.address) {
      setAccount(balancesState?.balances?.[accountIndex]?.address);
    }
  },  [accountIndex, balancesState]);

  return (
    <BaseModal contentStyle={styles.container} visible={sessionRequest.active} onCancel={onReject}>
      <Text style={styles.header}>{t('walletConnectSessionHeader')}</Text>
      <Image source={{uri: sessionRequest.icon}} style={styles.logo}/>
      <Text style={styles.name}>{sessionRequest.peerName}</Text>
      <Text style={styles.uri}>{sessionRequest.peerUrl}</Text>
      {!sessionRequest.chainId ? (
        <SimpleSelect
          onSelect={(id: string) => setCoin(coins.find(coin => coin.id === id))}
          options={chainSelectOptions}
          value={coin?.id}
          label={t('walletNetwork')}
        />
      ) : (
        !!coin && (
          <View style={styles.fixedNetworkContainer}>
            <Text style={styles.networkLabel}>{t('walletNetwork')}</Text>
            <Text style={styles.networkName}>{coin?.name}</Text>
          </View>
        )
      )}
      <AddressSelector
        disabled={!coin}
        label={t('walletAccount')}
        containerStyle={styles.addressSelector}
        addresses={balancesState.balances}
        onSelect={setAccountIndex}
        selectedAddress={accountIndex}
        ticker={coin?.ticker || ''}
      />
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <SolidButton
          title={t('walletConnectApprove')}
          onPress={onApprove}
          containerStyle={styles.topButton}
          disabled={!!error || !account}
        />
        <OutlineButton
          title={t('walletConnectReject')}
          onPress={onReject}
        />
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
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
  },
  fixedNetworkContainer: {
    paddingLeft: 16,
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
    fontSize: 18,
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
  }
});
