import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import theme from '../../../theme';
import getImageSource from '../../../utils/get-image-source';
import useTranslation from '../../../utils/use-translation';
import CryptoAmountText from '../../text/crypto-amount-text';
import Layout from '../../../utils/layout';
import makeRoundedBalance from '../../../utils/make-rounded-balance';

export interface BalanceHeaderProps {
  ticker: string;
  balance: string;
  fiatBalance: string;
  fiatSymbol?: string;
  fiatTicker: string;
  fiatRate?: number;
  logo?: string;
  staked?: string;
  payout?: string;
  containerStyle?: ViewStyle;
}

const fiatPrecision = 2;
const cryptoPrecision = 4;

export function BalanceHeader({
  containerStyle,
  logo,
  ticker,
  balance,
  fiatBalance,
  fiatSymbol,
  fiatTicker,
  fiatRate,
  staked,
  payout,
}: BalanceHeaderProps) {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.mainRow}>
        <Image source={getImageSource(logo)} style={styles.logo}/>
        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <Text style={styles.name}>{`${t('stakingAvailableHeader')} ${ticker}`}</Text>
            {fiatRate && (
              <View style={styles.row}>
                <Text style={styles.rate}>{`1 ${ticker} = ${fiatSymbol}`}</Text>
                <CryptoAmountText
                  ticker={fiatTicker}
                  value={makeRoundedBalance(fiatPrecision, fiatRate)}
                  style={styles.rate}
                  tickerStyle={styles.rate}
                />
              </View>
            )}
          </View>
          <View style={styles.rightColumn}>
            <CryptoAmountText
              ticker={ticker}
              value={makeRoundedBalance(cryptoPrecision, balance)}
              style={styles.balance}
              tickerStyle={styles.balance}
            />
            <View style={styles.row}>
              <Text style={styles.fiatBalance}>≈</Text>
              <CryptoAmountText
                ticker={fiatTicker}
                value={makeRoundedBalance(fiatPrecision, fiatBalance)}
                style={styles.fiatBalance}
                tickerStyle={styles.fiatBalance}
              />
            </View>
          </View>
        </View>
      </View>
      {(!!staked || !!payout) && (
        <View style={styles.extraRow}>
          {!!staked && (
            <View style={styles.stakedRow}>
              <Text style={styles.stakedLabel}>{t('stakingStaked')}</Text>
              <CryptoAmountText
                ticker={ticker}
                value={makeRoundedBalance(cryptoPrecision, staked)}
                style={styles.stakedText}
                tickerStyle={styles.stakedText}
              />
            </View>
          )}
          {!!payout && (
            <View style={styles.stakedRow}>
              <Text style={styles.stakedLabel}>{t('stakingNextPayout')}</Text>
              <CryptoAmountText
                ticker={ticker}
                value={makeRoundedBalance(cryptoPrecision, payout)}
                style={styles.stakedText}
                tickerStyle={styles.stakedText}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground2,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
  },
  mainRow: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  rate: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray,
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 14 : 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  fiatBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  extraRow: {
    flexDirection: 'column',
    marginLeft: 50,
    borderTopWidth: 1,
    borderTopColor: theme.colors.maxTransparent,
    borderStyle: 'solid',
    paddingTop: 15,
  },
  stakedText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray2,
  },
  stakedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakedLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray,
  },
});
