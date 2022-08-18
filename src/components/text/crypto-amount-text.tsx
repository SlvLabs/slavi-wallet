import NumberText, {NumberTextProps} from './number-text';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export interface CryptoAmountTextProps extends NumberTextProps {
  ticker: string;
}

export default function CryptoAmountText(props: CryptoAmountTextProps) {
  const {ticker, ...other} = props;
  const {style} = props;

  return (
    <View style={styles.container}>
      <NumberText {...other} />
      <Text style={style}>{` ${ticker}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});
