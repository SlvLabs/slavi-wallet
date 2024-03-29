import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BalanceHeader} from './balance-header';
import {CoinDetails} from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {useCurrencyRate, useFiatSymbolSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import {ApyElement} from './apy-element';
import SimpleRadio, {SimpleRadioOption} from '../../controls/simple-radio';
import useTranslation, {TranslationsKey} from '../../../utils/use-translation';
import {StakeInput} from './stake-input';
import theme from '../../../theme';
import SolidButton from '../../buttons/solid-button';
import {IncomesBlock} from './incomes-block';
import {ConfirmStakeModal} from './confirm-stake-modal';
import {useGetTariffs} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-get-tariffs';
import {useGetCurrentStakedForCoin} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-get-current-staked-for-coin';
import {useCalculateRewards} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-calculate-rewards';
import Spinner from '../../spinner';
import {useHandleStakingCreation} from '@slavi/wallet-core/src/providers/ws/hooks/earning/wallet-staking/use-handle-staking-creation';
import TxCreatingResult from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IWalletStakingTariff} from '@slavi/wallet-core/src/providers/ws/messages/wallet-staking';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import AlertRow from '../../error/alert-row';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import {EarnErrorPlaceholder} from './earn-error-placeholder';
import useSpendableBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-spendable-balance';
import AddressSelector from '../../buttons/address-selector';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import {useCoinAmountValidator} from '@slavi/wallet-core/src/validation/hooks/use-coin-amount-validator';
import {Vout} from '@slavi/wallet-core/src/services/coin-pattern/coin-pattern-interface';

const cryptoPrecision = 4;

export interface DepositTabProps {
  coinDetails: CoinDetails;
  onSuccess: () => void;
  showAddresses: boolean;
  disabled?: boolean;
}

export function DepositTab({coinDetails, onSuccess, showAddresses, disabled}: DepositTabProps) {
  const [amount, setAmount] = useState<string>('0.00');
  const [receiverPaysFee, setReceiverPaysFee] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [buttonLock, setButtonLock] = useState<boolean>(false);
  const [tx, setTx] = useState<TxCreatingResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [sendingError, setSendingError] = useState<string | undefined>();

  const balance = useSpendableBalance(coinDetails.id);
  const parentBalance = useSpendableBalance(coinDetails.parent ?? coinDetails.id);
  const fiatSymbol = useFiatSymbolSelector();
  const rate = useCurrencyRate(coinDetails.id, coinDetails.fiat || 'USD');
  const {tariffs, isLoading: isLoadingTariffs, error: errorTariffs} = useGetTariffs(coinDetails.id);
  const balancesState = useAddressesBalance(showAddresses ? coinDetails.id : undefined);
  const parentBalancesState = useAddressesBalance(showAddresses && coinDetails.parent ? coinDetails.parent : undefined);

  const [senderIndex, setSenderIndex] = useState<number>();

  const fromAddress = typeof senderIndex !== 'undefined' ? balancesState.balances[senderIndex]?.address : undefined;
  const accountBalance =
    typeof senderIndex !== 'undefined' && typeof balancesState.balances[senderIndex]?.balance !== 'undefined'
      ? balancesState.balances[senderIndex].balance
      : '0';
  const accountParentBalance =
    coinDetails.parent && fromAddress
      ? parentBalancesState.balances.find(a => a.address === fromAddress)?.balance ?? '0'
      : accountBalance;
  const {
    stakedInfo,
    isLoading: isStakedInfoLoading,
    error: errorStakedInfo,
  } = useGetCurrentStakedForCoin(coinDetails.id, fromAddress);

  const [balances, setBalances] = useState<{balance: string; balanceForCommission: string}>(
    showAddresses
      ? {
          balance: accountBalance,
          balanceForCommission: accountParentBalance,
        }
      : {balance, balanceForCommission: parentBalance},
  );

  const [transferOptions, setTransferOptions] = useState<{from?: string; receiverPaysFee: boolean}>(
    showAddresses ? {from: fromAddress, receiverPaysFee} : {receiverPaysFee},
  );
  const [vouts, setVouts] = useState<[] | [Vout]>([]);

  useEffect(() => {
    const newBalance = showAddresses
      ? {
          balance: accountBalance,
          balanceForCommission: accountParentBalance,
        }
      : {balance, balanceForCommission: parentBalance};
    setBalances(p => {
      if (p.balance !== newBalance.balance && p.balanceForCommission !== newBalance.balanceForCommission) {
        return newBalance;
      }
      return p;
    });
  }, [showAddresses, accountParentBalance, parentBalance, accountBalance, balance]);

  const {createStakingTx, sendStakingTx} = useHandleStakingCreation(coinDetails.id);

  const [tariff, setTariff] = useState<string>('');
  const [currentTariff, setCurrentTariff] = useState<IWalletStakingTariff | undefined>();
  const {monthReward, fullReward} = useCalculateRewards(amount, currentTariff);

  useEffect(() => {
    setTransferOptions({from: fromAddress, receiverPaysFee});
  }, [receiverPaysFee, fromAddress]);

  useEffect(() => {
    setVouts(p => {
      const vout = p[0];
      if (!currentTariff?.depositAddress || !amount) {
        if (!vout) {
          return p;
        }
        return [];
      }
      if (vout?.address !== currentTariff.depositAddress || vout.amount !== amount) {
        return [{amount, address: currentTariff.depositAddress}];
      }
      return p;
    });
  }, [currentTariff?.depositAddress, amount]);

  const {amountError, isLoading: isAmountChecking} = useCoinAmountValidator({
    balanceForCommission: balances.balanceForCommission,
    balance: balances.balance,
    vouts,
    options: transferOptions,
    coin: coinDetails.id,
  });

  const {t} = useTranslation();

  const periods: SimpleRadioOption<string>[] = useMemo(() => {
    const res: SimpleRadioOption<string>[] = [];
    if (tariffs) {
      for (const key of tariffs.keys()) {
        res.push({
          label: t(key as TranslationsKey),
          value: key,
        });
      }
    }

    return res;
  }, [tariffs, t]);

  const showConf = useCallback(() => setConfIsShown(true), []);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  const onMax = useCallback(() => setReceiverPaysFee(true), []);

  const submit = useCallback(() => {
    if (!currentTariff) {
      return;
    }

    setButtonLock(true);
    setTx(undefined);
    createStakingTx(amount, currentTariff, {receiverPaysFee: receiverPaysFee, from: fromAddress})
      .then(_tx => {
        setTx(_tx);
        showConf();
      })
      .finally(() => {
        setButtonLock(false);
      })
      .catch(e => {
        if (e instanceof InsufficientFunds) {
          setError(
            t('stakingLessThenMinStake', {
              amount: makeRoundedBalance(cryptoPrecision, currentTariff.minStakingAmount),
              ticker: coinDetails.ticker,
            }),
          );
        } else {
          setError(t('insufficientFunds'));
        }
      });
  }, [currentTariff, createStakingTx, amount, receiverPaysFee, showConf, t, coinDetails.ticker, fromAddress]);

  const send = useCallback(() => {
    if (!tx || !currentTariff) {
      return;
    }

    setSendLoading(true);
    setSendingError(undefined);
    sendStakingTx(tx, currentTariff.id)
      .then(() => {
        onSuccess();
        hideConf();
      })
      .catch(() => {
        setSendingError(t('internal error'));
      })
      .finally(() => setSendLoading(false));
  }, [tx, currentTariff, sendStakingTx, onSuccess, hideConf, t]);

  const onAmountChange = useCallback((_amount: string) => {
    setAmount(_amount);
    setReceiverPaysFee(false);
  }, []);

  useEffect(() => {
    setTariff(tariffs?.keys().next().value);
  }, [tariffs]);

  useEffect(() => {
    if (tariff) {
      setCurrentTariff(tariffs?.get(tariff));
    }
  }, [tariff, tariffs]);

  useEffect(() => {
    setError(undefined);
  }, [amount]);

  if (isLoadingTariffs || isStakedInfoLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  }

  if (errorTariffs || errorStakedInfo) {
    return <EarnErrorPlaceholder error={(errorTariffs || errorStakedInfo) as string} />;
  }

  if (!tariffs) {
    return <EarnErrorPlaceholder error={t('internal error')} />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {showAddresses && (
        <AddressSelector
          label={t('From account')}
          containerStyle={styles.addressSelector}
          addresses={balancesState.balances}
          onSelect={setSenderIndex}
          selectedAddress={senderIndex}
          ticker={coinDetails.ticker}
          baseTicker={coinDetails.parentTicker}
        />
      )}
      <BalanceHeader
        ticker={coinDetails?.ticker}
        fiatTicker={coinDetails.fiat}
        fiatSymbol={fiatSymbol}
        balance={showAddresses ? accountBalance : balance}
        fiatBalance={(showAddresses ? accountBalance : coinDetails.fiatBalance) || '0'}
        fiatRate={rate}
        logo={coinDetails.logo}
        staked={stakedInfo?.staked}
        payout={stakedInfo?.rewards}
      />
      <ApyElement
        ticker={coinDetails.ticker}
        logo={coinDetails.logo}
        value={currentTariff?.apy || '0'}
        containerStyle={styles.apy}
      />
      <StakeInput
        amount={amount}
        ticker={coinDetails.ticker}
        balance={showAddresses ? accountBalance : balance}
        onAmountChange={onAmountChange}
        onMax={onMax}
        containerStyle={styles.stakeInput}
        minStake={currentTariff?.minStakingAmount || '0'}
      />
      {!!amountError && <AlertRow text={t(amountError as TranslationsKey)} />}
      <View style={styles.periodView}>
        <Text style={styles.periodLabel}>{t('stakingPeriod')}</Text>
        <SimpleRadio<string> options={periods} selected={tariff} onChange={setTariff} />
      </View>
      <IncomesBlock
        monthly={monthReward}
        total={fullReward}
        ticker={coinDetails.ticker}
        containerStyle={styles.incomes}
      />
      {!!error && <AlertRow text={error} />}
      <SolidButton
        title={disabled ? t('stakingEventEnded') : t('stakingStake', {ticker: coinDetails.ticker})}
        containerStyle={styles.submitButton}
        loading={buttonLock}
        onPress={submit}
        disabled={disabled || !!error || isAmountChecking}
      />
      <ConfirmStakeModal
        visible={confIsShown}
        onCancel={hideConf}
        fee={tx?.fee}
        ticker={coinDetails.parentTicker ?? coinDetails.ticker}
        onAccept={send}
        amount={amount}
        period={t(tariff as TranslationsKey)}
        logo={coinDetails.logo}
        loading={sendLoading}
        error={sendingError}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  addressSelector: {
    marginBottom: 8,
  },
  spinnerContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  apy: {
    marginTop: 12,
  },
  periodView: {
    marginTop: 16,
  },
  periodLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray,
    marginBottom: 10,
  },
  stakeInput: {
    marginTop: 16,
  },
  submitButton: {
    marginTop: 24,
  },
  incomes: {
    marginTop: 16,
  },
});
