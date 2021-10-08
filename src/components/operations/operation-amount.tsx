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
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.amount, ...props.textStyle}}>
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
