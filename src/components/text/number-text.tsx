import React from 'react';
import NumberFormat from 'react-number-format';
import {Text, TextStyle} from 'react-native';

export interface NumberTextProps {
  value: string;
  style?: TextStyle;
}

export default function NumberText({value, style}: NumberTextProps) {
  return (
    <NumberFormat
      value={value}
      thousandSeparator={' '}
      displayType={'text'}
      renderText={(value) =>  <Text style={style}>{value}</Text>}
    />
  );
}
