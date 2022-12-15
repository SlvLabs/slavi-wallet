import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import theme from '../../../theme';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import CryptoAmountText from '../../text/crypto-amount-text';

export interface IncomeElementProps {
  label: string;
  amount: string;
  ticker: string;
  containerStyle?: ViewStyle;
}

const cryptoPrecision = 4;

export function IncomeElement({containerStyle, label, amount, ticker}: IncomeElementProps) {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Text style={styles.label}>{label}</Text>
      <CryptoAmountText
        ticker={ticker}
        value={makeRoundedBalance(cryptoPrecision, amount)}
        style={styles.text}
        tickerStyle={styles.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.cardBackground2,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textLightGray,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
});
