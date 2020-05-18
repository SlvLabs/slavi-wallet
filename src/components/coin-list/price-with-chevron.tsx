import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import theme from '../../theme';

export interface PriceWithChevronProps {
  price: number;
  currency: string;
  change: number;
  priceStyle?: TextStyle;
  containerStyle?: ViewStyle;
  precision?: number;
}

const PriceWithChevron = (props: PriceWithChevronProps) => {
  const changeChevronName =
    !!props.change && props.change >= 0 ? 'chevron-up' : 'chevron-down';
  const chevronColor =
    !!props.change && props.change >= 0 ? theme.colorsOld.green : theme.colorsOld.red;
  const precision = props.precision || 2;

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {!!props.change && (
        <View style={styles.changeContainer}>
          <Icon
            name={changeChevronName}
            type={'entypo'}
            size={8}
            color={chevronColor}
          />
        </View>
      )}
      <View>
        <Text style={{...styles.price, ...props.priceStyle}}>
          {props.price.toFixed(precision)} {props.currency}
        </Text>
      </View>
    </View>
  );
};

export default PriceWithChevron;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 5,
    justifyContent: 'flex-end',
  },
  price: {
    color: theme.colorsOld.text.gray,
    marginRight: 3,
    fontFamily: theme.fonts.default,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  change: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginRight: 5,
  },
  changePositive: {
    color: theme.colorsOld.green,
  },
  changeNegative: {
    color: theme.colorsOld.red,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
