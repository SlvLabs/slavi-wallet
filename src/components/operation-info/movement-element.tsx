import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import OperationAmount, {Type} from '../operations/operation-amount';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import shrinkAddress from '../../utils/shrink-address';
import theme from '../../theme';

export interface MovementOperationProps {
  label: string;
  address: string;
  addressName?: string;
  amount: string;
  ticker: string;
  type: Type;
}

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001

export function MovementElement({label, address, amount, ticker, type, addressName}: MovementOperationProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.address}>{addressName || shrinkAddress(address, 8, 8, 20)}</Text>
      </View>
      <OperationAmount
        amount={makeRoundedBalance(cryptoPrecision, amount, cryptoLimit)}
        type={type}
        ticker={ticker}
        textStyle={styles.amountText}
        tickerStyle={styles.amountTicker}
        containerStyle={styles.rightColumn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
  },
  leftColumn: {
    alignItems: 'flex-start',
    flex: 1,
  },
  address: {
    textTransform: 'capitalize',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.textLightGray2,
  },
  amountText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.white,
    flex: 1,
    textAlign: 'right',
  },
  amountTicker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.white,
    flex: 1,
    textAlign: 'left',
  },
  rightColumn: {
    alignItems: 'flex-end',
    flex: 1,
  }
});
