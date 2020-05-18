import React from 'react';
import {StyleSheet, View, ViewStyle, Text, TextStyle} from 'react-native';
import theme from '../../theme';

export enum Type {
  positive,
  negative,
}

export interface OperationAmountProps {
  amount: string;
  type: Type;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  ticker?: string;
}

const OperationAmount = (props: OperationAmountProps) => {
  const extraTextStyle =
    props.type === Type.negative ? styles.negativeText : styles.positiveText;
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.sing, ...extraTextStyle, ...props.textStyle}}>
        {props.type === Type.positive && '+'}
      </Text>
      <Text style={{...styles.amount, ...extraTextStyle, ...props.textStyle}}>
        {props.amount} {props.ticker}
      </Text>
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
  sing: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 12,
    color: theme.colorsOld.green,
    textTransform: 'uppercase',
  },
  amount: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 12,
    textTransform: 'uppercase',
  },
  positiveText: {
    color: theme.colorsOld.green,
  },
  negativeText: {
    color: theme.colorsOld.gray,
  },
});

export default OperationAmount;
