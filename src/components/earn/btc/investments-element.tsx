import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../../utils/use-translation';
import {
  IWalletStakingUserStake,
  WalletStakingRewardStatus, WalletStakingStatus,
} from '@slavi/wallet-core/src/providers/ws/messages/wallet-staking';
import theme from '../../../theme';
import CryptoAmountText from '../../text/crypto-amount-text';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import OpeningButton from '../../buttons/opening-button';
import {formatPeriod} from '../../../utils/format-timestamp-period';
import {InvestmentsPayment} from './investments-payment';
import Layout from '../../../utils/layout';

export interface InvestmentsElementProps {
  ticker: string;
  paymentInfo: IWalletStakingUserStake;
}

const cryptoPrecision = 4;
const percentPrecision = 2;

const statusColors: Record<WalletStakingStatus, string> = {
  [WalletStakingStatus.init]: theme.colors.textLightGray,
  [WalletStakingStatus.working]: theme.colors.darkGreen,
  [WalletStakingStatus.done]: theme.colors.lightGray,
  [WalletStakingStatus.waitingWithdraw]: theme.colors.gold2,
  [WalletStakingStatus.rejected]: theme.colors.errorRed,
};

export function InvestmentsElement({ticker, paymentInfo}: InvestmentsElementProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {!!paymentInfo.activateTime && (
        <View style={styles.row}>
          <Text style={styles.label}>{t('stakingPeriod')}</Text>
          <Text style={styles.text}>{formatPeriod(paymentInfo.activateTime, paymentInfo.endTime)}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>{t('stakingStaked')}</Text>
        <CryptoAmountText
          value={makeRoundedBalance(cryptoPrecision, paymentInfo.amount)}
          ticker={ticker}
          style={styles.text}
          tickerStyle={styles.text}
        />
      </View>
      <View style={styles.row}>
        <Text style={{...styles.label, ...styles.upercase}}>{t('stakingApy')}</Text>
        <Text style={styles.text}>{makeRoundedBalance(percentPrecision, paymentInfo.percent)} %</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{t('stakingStatus')}</Text>
        <Text style={{...styles.text, color: statusColors[paymentInfo.status]}}>{t(`stakingStatus_${paymentInfo.status}`)}</Text>
      </View>
      {(!!paymentInfo.rewards && paymentInfo.rewards.length) > 0 && (
        <View>
          {opened && (
            <View style={styles.paymentsView}>
              <Text style={styles.subHeader}>{t('stakingPayments')}</Text>
              {paymentInfo.rewards.map((payment, index) => {
                return (
                  <InvestmentsPayment
                    start={payment.start}
                    end={payment.end}
                    ticker={ticker}
                    status={payment.status}
                    amount={payment.amount}
                    key={`paymnet_${index}`}
                  />
                );
              })}
            </View>
          )}
          <OpeningButton
            title={opened ? t('stakingLessInfo') : t('stakingMoreInfo')}
            onPress={() => setOpened(!opened)}
            opened={opened}
            containerStyle={styles.button}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 8,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    marginBottom: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: theme.colors.maxTransparent,
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  },
  upercase: {
    textTransform: 'uppercase',
  },
  paymentsView: {
    marginTop: 24,
  },
  subHeader: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
    paddingBottom: 8,
  },
  button: {
    padding: 6,
    marginTop: 21,
  },
});
