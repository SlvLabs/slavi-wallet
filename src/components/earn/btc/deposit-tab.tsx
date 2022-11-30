import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BalanceHeader} from './balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {useCurrencyRate, useFiatSymbolSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import {ApyElement} from './apy-element';
import SimpleRadio from '../../controls/simple-radio';
import useTranslation from '../../../utils/use-translation';
import {StakeInput} from './stake-input';
import theme from '../../../theme';
import SolidButton from '../../buttons/solid-button';
import {IncomesBlock} from './incomes-block';
import {ConfirmStakeModal} from './confirm-stake-modal';

export interface DepositTabProps {
  coin: string;
}

export function DepositTab({coin}: DepositTabProps) {
  const [period, setPeriod] = useState<string>('3');
  const [amount, setAmount] = useState<string>('0.00');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);

  const coinInfo = useCoinDetails(coin);
  const fiatSymbol = useFiatSymbolSelector();
  const rate = useCurrencyRate(coin, coinInfo!.fiat);

  const {t} = useTranslation();

  if (!coinInfo) {
    return <></>;
  }

  const periods = useMemo(() => ([
    {value: '3', label: '3 Month'},
    {value: '6', label: '6 Month'},
    {value: '12', label: '12 Month'},
  ]), []);

  const showConf = useCallback(() => setConfIsShown(true), []);
  const hideConf = useCallback(() => setConfIsShown(false), []);

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
          staked={'123123.123'}
          payout={'123.123123'}
        />
        <ApyElement ticker={coinInfo.ticker} logo={coinInfo.logo} value={'10'} containerStyle={styles.apy}/>
        <StakeInput
          amount={amount}
          ticker={coinInfo.ticker}
          balance={coinInfo.balance}
          onAmountChange={setAmount}
          containerStyle={styles.stakeInput}
          minStake={'1.642'}
        />
        <View style={styles.periodView}>
          <Text style={styles.periodLabel}>{t('stakingPeriod')}</Text>
          <SimpleRadio options={periods} selected={period} onChange={setPeriod} />
        </View>
      <IncomesBlock monthly={'0.05'} total={'0.1'} ticker={coinInfo.ticker} containerStyle={styles.incomes} />
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
        period={'1 Year'}
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
