import theme from '../../theme';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Icon, IconProps, Text} from 'react-native-elements';
import React, {useMemo} from 'react';

export enum ChevronType {
  positive,
  zero,
  negative,
}

export interface PriceWithChevronProps {
  value: string;
  label: string;
  type: ChevronType;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
  changeStyle?: TextStyle;
  containerStyle?: ViewStyle;
  chevronColor?: string,
  chevronSize?: number
}

const textColors: Record<string, string> = {
  [ChevronType.zero]: theme.colorsOld.gray,
  [ChevronType.positive]: theme.colorsOld.green,
  [ChevronType.negative]: theme.colorsOld.red,
};

const ElementWithChevron = (props: PriceWithChevronProps) => {
  const chevronList: Record<ChevronType, IconProps | null> = useMemo(() => ({
    [ChevronType.zero]: null,
    [ChevronType.positive]: {
      name: 'chevron-up',
      color: props.chevronColor || theme.colors.green,
      type: 'entypo',
      size: props.chevronSize || 12,
    },
    [ChevronType.negative]: {
      name: 'chevron-down',
      color: props.chevronColor || theme.colors.red,
      type: 'entypo',
      size: props.chevronSize || 12,
    },
  }), []);

  const chevron: IconProps | null = chevronList[props.type];
  const color: string = textColors[props.type];

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      {!!chevron && (
        <View style={styles.chevronContainer}>
          <Icon {...chevron} />
        </View>
      )}
      <View style={{...styles.valueContainer}}>
        <Text style={{...styles.value, color: color, ...props.valueStyle}}>
          {props.value}
        </Text>
        <Text style={{...styles.label, color: color, ...props.labelStyle}}>
          {props.label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 5,
    justifyContent: 'flex-end',
  },
  value: {
    color: theme.colorsOld.text.gray,
    marginRight: 3,
    fontFamily: theme.fonts.default,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    flexDirection: 'row',
  },
  label: {
    color: theme.colorsOld.gray,
    fontFamily: theme.fonts.default,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginRight: 5,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 3,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default ElementWithChevron;
