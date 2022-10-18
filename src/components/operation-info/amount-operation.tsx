import OperationAmount, {Type} from '../operations/operation-amount';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export interface AmountOperationProps {
  amount: string;
  type: Type;
  ticker?: string;
}

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001

export function AmountOperation({amount, ticker, type}: AmountOperationProps) {

  return (
    <OperationAmount
      amount={makeRoundedBalance(cryptoPrecision, amount, cryptoLimit)}
      type={type}
      ticker={ticker}
      textStyle={styles.text}
      tickerStyle={styles.text}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
    textTransform: 'uppercase',
  }
});
