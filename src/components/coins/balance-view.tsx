import {StyleSheet, TextStyle, View} from 'react-native';
import {Text} from 'react-native-elements';
import React from 'react';
import theme from '../../theme';

export interface BalanceViewProps {
  balance: string;
  ticker: string;
  cryptoBalance?: string;
  cryptoTicker: string;
  fiatBalance?: string;
  fiatTicker: string;
  balanceStyle?: TextStyle;
  convertedBalanceStyle?: TextStyle;
}

const renderConvartedBalance = (
  fiat: string,
  crypto: string,
  fiatBalance: string | undefined,
  cryptoBalance: string | undefined,
) => {
  if (
    typeof fiatBalance !== 'undefined' &&
    typeof cryptoBalance !== 'undefined'
  ) {
    return `${cryptoBalance} ${crypto} / ${fiatBalance} ${fiat}`;
  } else if (typeof cryptoBalance !== 'undefined') {
    return `${cryptoBalance} ${crypto}`;
  } else if (typeof fiatBalance !== 'undefined') {
    return `${fiatBalance} ${fiat}`;
  } else {
    return '';
  }
};

const BalanceView = (props: BalanceViewProps) => {
  return (
    <View>
      <Text style={{...styles.balance, ...props.balanceStyle}}>
        {props.balance} {props.ticker}
      </Text>
      {((props.fiatTicker && typeof props.fiatBalance !== 'undefined') ||
        (props.cryptoTicker && typeof props.cryptoBalance !== 'undefined')) && (
        <Text
          style={{...styles.convertedBalance, ...props.convertedBalanceStyle}}>
          {renderConvartedBalance(
            props.fiatTicker,
            props.cryptoTicker,
            props.fiatBalance,
            props.cryptoBalance,
          )}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  balance: {
    fontSize: 24,
    textAlign: 'center',
    color: theme.colorsOld.text.primary,
  },
  convertedBalance: {
    fontSize: 20,
    textAlign: 'center',
    color: theme.colorsOld.text.secondary,
  },
});

export default BalanceView;
