import {AbstractRuleDisplayInfo} from '@slavi/wallet-core/src/providers/ws/messages/refferal';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../utils/use-translation';
import AddressSelector from '../buttons/address-selector';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core/src/index';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import InvalidGasPrice from '@slavi/wallet-core/src/services/errors/invalid-gas-price';
import {_TxCreatingResult} from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import SolidButton from '../buttons/solid-button';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import NftMintConfirmation from '../nft/nft-mint-confirmation';
import theme from '../../theme';
import makeRoundedBalance, {makeCeilBalance} from '../../utils/make-rounded-balance';
import Layout from '../../utils/layout';

export interface RuleProps {
  attributes: NonNullable<AbstractRuleDisplayInfo['attributes']>;
}

export function NftMintRule({attributes}: RuleProps) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const balancesState = useAddressesBalance(attributes.coin);
  const coinDetails = useCoinDetails(attributes.coin);
  if (!coinDetails) {
    throw new Error('Coin is unknown');
  }
  if (!attributes) {
    throw new Error('expected attributes for nft_mint rule');
  }
  const [senderIndex, setSenderIndex] = useState(0);

  const addressService = useAddressesService();
  const patternService = useCoinPatternService();

  const pattern = useMemo(
    () => patternService.createEthPattern(attributes.coin, addressService.getGetterDelegate(attributes.coin)),
    [addressService, patternService, attributes],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [sendTxLoading, setSendTxLoading] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string>('');
  const [tx, setTx] = useState<_TxCreatingResult>();
  const [confModalIsVisible, setConfModalIsVisible] = useState<boolean>(true);
  const [generalError, setGeneralError] = useState<string>();

  const fromAddress = balancesState.balances[senderIndex]?.address;
  const selectedBalance = balancesState.balances[senderIndex]?.balance;

  const calculateMintTransaction = useCallback(() => {
    const f = async () => {
      if (loading || !fromAddress) {
        return;
      }

      setLoading(true);
      setGeneralError(undefined);
      try {
        const result = await pattern.mintRef(attributes, fromAddress, {
          transactionPriority: TransactionPriority.average,
        });

        setTx(result);
        setConfModalIsVisible(true);
      } catch (e) {
        if (e instanceof InsufficientFunds) {
          setGeneralError(t('nftNotEnoughNetwork'));
        } else {
          if (e instanceof InvalidGasPrice) {
            setGeneralError(t('invalidGas'));
          } else {
            console.log({e});
            setGeneralError(t('internal error'));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    f().catch(() => setGeneralError(t('internal error')));
  }, [attributes, fromAddress, loading, pattern, t]);

  const hideConfModal = useCallback(() => setConfModalIsVisible(false), []);

  const onTxIsSent = useCallback(() => {
    navigation.navigate(ROUTES.TABS.OPERATIONS);
  }, [navigation]);

  const sendTx = useCallback(async () => {
    if (!tx || sendTxLoading) {
      return;
    }
    setSendTxLoading(true);
    try {
      await pattern.sendNFTMintTransactions(tx.transactions, {
        contract: attributes.contract,
        coin: attributes.coin,
        baseAmount: attributes.baseAmount,
      });

      hideConfModal();
      onTxIsSent();
    } catch (e) {
      setSendError(t('internal error'));
    } finally {
      setSendTxLoading(false);
    }
  }, [tx, pattern, attributes, hideConfModal, onTxIsSent, t, sendTxLoading]);
  return (
    <View style={styles.container}>
      <AddressSelector
        label={t('From account')}
        containerStyle={styles.addressSelector}
        addresses={balancesState.balances}
        onSelect={setSenderIndex}
        selectedAddress={senderIndex}
        ticker={coinDetails.ticker}
        baseTicker={coinDetails.parentTicker}>
        <Text style={styles.balanceLabel}>
          {`${t('balance')}: ${makeRoundedBalance(6, selectedBalance)} ${coinDetails.ticker}`}
        </Text>
      </AddressSelector>
      <SolidButton
        title={t('referralBtnMint')}
        onPress={calculateMintTransaction}
        loading={loading}
        style={styles.button}
      />
      <Text style={styles.feeText}>
        {t('referralClaimFee', {amount: makeCeilBalance(3, attributes.networkFee), ticker: coinDetails.ticker})}
      </Text>
      <Text style={styles.error}>{generalError}</Text>
      {!!tx && (
        <NftMintConfirmation
          visible={confModalIsVisible}
          onCancel={hideConfModal}
          onAccept={sendTx}
          name={attributes.name}
          fee={tx.fee}
          baseAmount={attributes.baseAmount}
          address={fromAddress}
          loading={sendTxLoading}
          error={sendError}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.isSmallDevice ? 16 : 12,
  },
  addressSelector: {
    marginBottom: Layout.isSmallDevice ? 16 : 12,
    borderColor: theme.colors.borderGray,
    borderWidth: 1,
  },
  button: {
    // marginTop: 24,
    width: '100%',
  },
  balanceLabel: {
    marginTop: 10,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
  },
  error: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.red,
    marginTop: 16,
    textAlign: 'center',
  },
  feeText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.lightGray,
    marginTop: 12,
    alignSelf: 'center',
  },
});
