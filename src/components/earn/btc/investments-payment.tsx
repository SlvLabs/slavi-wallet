import React, {useMemo} from 'react';
import {WalletStakingRewardStatus} from '@slavi/wallet-core/src/providers/ws/messages/wallet-staking';
import {View, Text, StyleSheet} from 'react-native';
import {formatPeriod} from '../../../utils/format-timestamp-period';
import theme from '../../../theme';
import CryptoAmountText from '../../text/crypto-amount-text';
import {makeFloorBalance} from '../../../utils/make-rounded-balance';
import useTranslation from '../../../utils/use-translation';

export interface InvestmentsPaymentProps {
  start: number;
  end: number;
  status: WalletStakingRewardStatus;
  amount: string;
  ticker: string;
}

const statusColors = {
  [WalletStakingRewardStatus.payed]: theme.colors.green,
  [WalletStakingRewardStatus.earning]: theme.colors.gold2,
  [WalletStakingRewardStatus.waiting]: theme.colors.textLightGray,
};

const cryptoPrecision = 5;

export function InvestmentsPayment({start, end, status, amount, ticker}: InvestmentsPaymentProps) {
  const {t} = useTranslation();
  const textStyle = useMemo(() => ({...styles.text, color: statusColors[status]}), [status]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formatPeriod(start, end)}</Text>
      <View style={styles.row}>
        <CryptoAmountText
          ticker={ticker}
          value={makeFloorBalance(cryptoPrecision, amount)}
          style={textStyle}
          tickerStyle={textStyle}
        />
        <Text style={textStyle}> ({t(`stakingPaymentStatus_${status}`)})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.maxTransparent,
    borderBottomWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
  },
});
