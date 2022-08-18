import React from 'react';
import {StyleSheet, View, ViewStyle, Text, TextStyle} from 'react-native';
import theme from '../../theme';
import NumberText from '../text/number-text';
import CryptoAmountText from '../text/crypto-amount-text';

export interface OperationConvertedBalancesProps {
  cryptoBalance: string;
  fiatBalance: string;
  cryptoTicker: string;
  fiatTicker: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const OperationConvertedBalances = (props: OperationConvertedBalancesProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <CryptoAmountText ticker={props.cryptoTicker} value={props.cryptoBalance} style={{...styles.cryptoBalance, ...props.textStyle}} />
      <View style={styles.delimiter}>
        <Text style={{...styles.fiatBalance, ...props.textStyle}}>
          |
        </Text>
      </View>
      <CryptoAmountText ticker={props.fiatTicker} value={props.fiatBalance} style={{...styles.fiatBalance, ...props.textStyle}} />
      <NumberText value={props.fiatBalance} style={{...styles.fiatBalance, ...props.textStyle}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cryptoBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
  fiatBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
  delimiter: {
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
  },
});

export default OperationConvertedBalances;
