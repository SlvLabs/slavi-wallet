import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';

export interface CoinBalanceElementProps {
  label: string;
  balance: string;
  ticker: string;
  cryptoBalance?: string;
  cryptoTicker?: string;
  fiatBalance?: string;
  fiatTicker?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  delimiterStyle?: TextStyle;
  delimiter?: string;
  balanceStyle?: TextStyle;
  tickerStyle?: TextStyle;
  cryptoBalanceStyle?: TextStyle;
  cryptoTickerStyle?: TextStyle;
  fiatBalanceStyle?: TextStyle;
  fiatTickerStyle?: TextStyle;
}

const defaultDelemiter = '/';

const CoinBalanceElement = (props: CoinBalanceElementProps) => {
  const delimiter = props.delimiter || defaultDelemiter;

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.labelContainer}>
        <Text style={{...styles.label, ...props.labelStyle}}>
          {props.label}:
        </Text>
      </View>
      <View style={styles.balances}>
        <View style={styles.balanceContainer}>
          <Text style={{...styles.balance, ...props.balanceStyle}}>
            {props.balance}
          </Text>
          <Text style={{...styles.ticker, ...props.tickerStyle}}>
            {props.ticker}
          </Text>
        </View>
        {!!props.cryptoBalance && (
          <View style={styles.cryptoBalanceContainer}>
            <Text style={{...styles.delimiter, ...props.delimiterStyle}}>
              {delimiter}
            </Text>
            <Text
              style={{...styles.cryptoBalance, ...props.cryptoBalanceStyle}}>
              {props.cryptoBalance}
            </Text>
            <Text style={{...styles.cryptoTicker, ...props.cryptoTickerStyle}}>
              {props.cryptoTicker}
            </Text>
          </View>
        )}
        {!!props.fiatBalance && (
          <View style={styles.fiatBalanceContainer}>
            <Text style={{...styles.delimiter, ...props.delimiterStyle}}>
              {delimiter}
            </Text>
            <Text style={{...styles.fiatBalance, ...props.fiatBalanceStyle}}>
              {props.fiatBalance}
            </Text>
            <Text style={{...styles.fiatTicker, ...props.fiatTickerStyle}}>
              {props.fiatTicker}
            </Text>
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
  labelContainer: {},
  label: {
    color: theme.colorsOld.lightGray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  balances: {
    flexDirection: 'row',
  },
  delimiter: {
    marginRight: 3,
    marginLeft: 3,
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  balanceContainer: {
    flexDirection: 'row',
  },
  balance: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  ticker: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginLeft: 3,
  },
  cryptoBalanceContainer: {
    flexDirection: 'row',
  },
  cryptoBalance: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  cryptoTicker: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginLeft: 3,
  },
  fiatBalanceContainer: {
    flexDirection: 'row',
  },
  fiatBalance: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  fiatTicker: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginLeft: 3,
  },
});

export default CoinBalanceElement;
