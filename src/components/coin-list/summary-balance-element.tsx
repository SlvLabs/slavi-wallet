import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import theme from '../../theme';

export interface BalanceElementProps {
  balance: string;
  round: number;
  ticker: string;
  containerStyle?: ViewStyle;
  balanceStyle?: TextStyle;
  tickerStyle?: TextStyle;
}

const SummaryBalanceElement = (props: BalanceElementProps) => {
  const balance = makeRoundedBalance(props.round, props.balance);
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {!!props.ticker && (
        <Text style={{...styles.ticker, ...props.tickerStyle}}>
          {props.ticker}
        </Text>
      )}
      <Text style={{...styles.balance, ...props.balanceStyle}}>{balance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 34,
    color: theme.colors.whiteOpacity,
    textAlignVertical: 'bottom',
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 34,
    color: theme.colors.whiteOpacity,
    textAlignVertical: 'bottom',
  },
});

export default SummaryBalanceElement;
