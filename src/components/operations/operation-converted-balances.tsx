import React from 'react';
import {StyleSheet, View, ViewStyle, Text, TextStyle} from 'react-native';
import theme from '../../theme';

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
      <Text style={{...styles.cryptoBalance, ...props.textStyle}}>
        {`${props.cryptoBalance} ${props.cryptoTicker}`}
      </Text>
      <View style={styles.delimiter}>
        <Text style={{...styles.fiatBalance, ...props.textStyle}}>
          |
        </Text>
      </View>
      <Text style={{...styles.fiatBalance, ...props.textStyle}}>
        {`${props.fiatBalance} ${props.fiatTicker}`}
      </Text>
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
