import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import NumberText from '../text/number-text';

export interface ConvertedBalanceElementProps {
  balance: string;
  ticker?: string;
  fiatBalance?: string;
  fiatTicker?: string;
  cryptoBalance?: string;
  cryptoTicker?: string;
}

const ConvertedBalanceElement = (props: ConvertedBalanceElementProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <NumberText value={makeRoundedBalance(4, props.balance)} style={styles.balance} />
        {!!props.ticker && <Text style={styles.ticker}>{props.ticker}</Text>}
      </View>
      <View style={styles.convertedBalances}>
        {props.fiatBalance && (
          <View style={styles.fiatBalance}>
            <NumberText value={makeRoundedBalance(2, props.fiatBalance)} style={styles.convertedValue} />
            <Text style={styles.convertedTicker}>{props.fiatTicker}</Text>
          </View>
        )}
        {props.cryptoBalance && (
          <View style={styles.cryptoBalance}>
            <NumberText value={makeRoundedBalance(4, props.cryptoBalance)} style={styles.convertedCryptoValue} />
            <Text style={styles.convertedCryptoTicker}>{props.cryptoTicker}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  convertedBalances: {
    flexDirection: 'column',
  },
  fiatBalance: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cryptoBalance: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
  convertedValue: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
  },
  convertedTicker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 5,
  },

  convertedCryptoValue: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.hardTransparent,
  },
  convertedCryptoTicker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.hardTransparent,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
});

export default ConvertedBalanceElement;
