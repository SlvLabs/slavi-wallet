import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BalanceHeader} from './balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
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

export interface DepositTabProps {
  coin: string;
}

export function DepositTab({coin}: DepositTabProps) {
  const [amount, setAmount] = useState<string>('0.00');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);

  const fiatSymbol = useFiatSymbolSelector();
  const coinInfo = useCoinDetails(coin);
  const rate = useCurrencyRate(coin, coinInfo?.fiat || 'USD');
  const {
    tariffs,
    isLoading: isLoadingTariffs,
    errors: errorsTariffs,
    error: errorTariffs,
  } = useGetTariffs(coin);
  const {
    stakedInfo,
    isLoading: isStakedInfoLoading,
    error: errorStakedInfo,
    errors: errorsStakedInfo,
  } = useGetCurrentStakedForCoin(coin);

  const [tariff, setTariff] = useState<string>('');
  const {monthReward, fullReward} = useCalculateRewards(amount, tariffs?.get(tariff));

  const {t} = useTranslation();

  const periods: SimpleRadioOption<string>[] = useMemo(() => {
    const res: SimpleRadioOption<string>[] = [];
    if(tariffs) {
      for (const key of tariffs.keys()) {
        res.push({
          label: t(key as TranslationsKey),
          value: key,
        })
      }
    }

    return res;
  }, [tariffs, t]);

  const showConf = useCallback(() => setConfIsShown(true), []);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  useEffect(() => {
    setTariff(tariffs?.keys().next().value);
  }, [tariffs]);

  if (!coinInfo) {
    return <></>;
  }

  if (isLoadingTariffs || isStakedInfoLoading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  if (!tariffs) {
    return (
      <View style={styles.container}>
        <Text>ERROR</Text>
      </View>
    );
  }

  const currentTariff = tariffs.get(tariff);
  console.log(currentTariff)
  return (
    <View style={styles.container}>
        <BalanceHeader
          ticker={coinInfo?.ticker}
          fiatTicker={coinInfo.fiat}
          fiatSymbol={fiatSymbol}
          balance={coinInfo.balance}
          fiatBalance={coinInfo.fiatBalance || '0'}
          fiatRate={rate}
          logo={coinInfo.logo}
          staked={stakedInfo?.staked}
          payout={stakedInfo?.rewards}
        />
        <ApyElement
          ticker={coinInfo.ticker}
          logo={coinInfo.logo}
          value={currentTariff?.apy || '0'}
          containerStyle={styles.apy}
        />
        <StakeInput
          amount={amount}
          ticker={coinInfo.ticker}
          balance={coinInfo.balance}
          onAmountChange={setAmount}
          containerStyle={styles.stakeInput}
          minStake={currentTariff?.minStakingAmount || '0'}
        />
        <View style={styles.periodView}>
          <Text style={styles.periodLabel}>{t('stakingPeriod')}</Text>
          <SimpleRadio<string> options={periods} selected={tariff} onChange={setTariff} />
        </View>
      <IncomesBlock monthly={monthReward} total={fullReward} ticker={coinInfo.ticker} containerStyle={styles.incomes} />
      <SolidButton
        title={t('stakingStake' ,{ticker: coinInfo.ticker})}
        containerStyle={styles.submitButton}
        onPress={showConf}
      />
      <ConfirmStakeModal
        visible={confIsShown}
        onCancel={hideConf}
        fee={'0.0015'}
        ticker={coinInfo.ticker}
        onAccept={() => {}}
        amount={amount}
        period={t(tariff as TranslationsKey)}
        logo={coinInfo.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
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
  }
});
