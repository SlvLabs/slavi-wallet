import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import theme from '../../theme';

export interface RateOperationProps {
  srcTicker: string;
  dstTicker: string;
  rate: string;
  style?: TextStyle;
}

const cryptoPrecision = 8;
const cryptoLimit = 0.00000001

export function RateOperation({srcTicker, dstTicker, rate, style}: RateOperationProps) {
  return (
    <Text style={{...styles.text, ...style}}>
      {`1 ${srcTicker} = ${makeRoundedBalance(cryptoPrecision, rate, cryptoLimit)} ${dstTicker}`}
    </Text>
  );
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
