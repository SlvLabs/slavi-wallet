import NumberText, {NumberTextProps} from './number-text';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';

export interface CryptoAmountTextProps extends NumberTextProps {
  ticker: string;
  tickerStyle?: TextStyle;
}

export default function CryptoAmountText({ticker, tickerStyle, ...other}: CryptoAmountTextProps) {
  return (
    <View style={styles.container}>
      <NumberText {...other} />
      <Text style={tickerStyle} ellipsizeMode={'tail'} numberOfLines={1}>{` ${ticker}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});
