import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import ElementWithChevron, {ChevronType} from './element-with-chevron';
import Layout from '../../utils/layout';
import NumberText from '../text/number-text';

export interface PriceWithChangeProps {
  price: number;
  currency: string;
  change?: number;
  containerStyle?: ViewStyle;
  priceStyle?: TextStyle;
  changeStyle?: TextStyle;
  changeContainerStyle?: ViewStyle;
  precision?: number;
  changePrecision?: number;
}

const PriceWithChange = (props: PriceWithChangeProps) => {
  let type;
  const castedValue = +(props.change || 0);
  if (castedValue > 0) {
    type = ChevronType.positive;
  } else if (castedValue < 0) {
    type = ChevronType.negative;
  } else {
    type = ChevronType.zero;
  }
  const precision = props.precision || 2;
  const changePrecision = props.changePrecision || 2;

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.priceBlock}>
        <Text style={{...styles.price, ...props.priceStyle}}>{props.currency}</Text>
        <NumberText value={props.price.toFixed(precision)} style={{...styles.price, ...props.priceStyle}} />
      </View>
      {!!props.change && (
        <ElementWithChevron
          value={props.change.toFixed(changePrecision)}
          label={'%'}
          type={type}
          valueStyle={{...styles.change, ...props.changeStyle}}
          labelStyle={styles.changeLabel}
          changeStyle={{...styles.change, ...props.changeStyle}}
          containerStyle={{...styles.changeContainer, ...props.changeContainerStyle}}
        />
      )}
    </View>
  );
};

export default PriceWithChange;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  price: {
    color: theme.colors.white,
    fontFamily: theme.fonts.default,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    marginRight: 2,
  },
  change: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    display: Layout.isSmallDevice ? 'none' : 'flex',
  },
  changeLabel: {
    display: Layout.isSmallDevice ? 'none' : 'flex',
  },
  changePositive: {
    color: theme.colors.green,
  },
  changeNegative: {
    color: theme.colors.red,
  },
  changeContainer: {
    marginLeft: 9,
  },
  priceBlock: {
    flexDirection: 'row',
  }
});
