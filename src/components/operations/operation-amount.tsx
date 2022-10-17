import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import theme from '../../theme';
import CryptoAmountText from '../text/crypto-amount-text';

export enum Type {
  positive,
  negative,
}

export interface OperationAmountProps {
  amount: string;
  type: Type;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  tickerStyle?: TextStyle;
  ticker?: string;
}

const OperationAmount = (props: OperationAmountProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <CryptoAmountText
        ticker={props.ticker || ''}
        value={props.amount}
        style={{...styles.amount, ...props.textStyle}}
        tickerStyle={{...styles.amount, ...props.tickerStyle}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
    paddingLeft: 4,
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
});

export default OperationAmount;
