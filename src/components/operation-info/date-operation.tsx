import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {dateFromTimestamp} from '../../utils/date-from-timestamp';
import theme from '../../theme';

export interface DateOperationProps {
  timestamp: string|number;
  style?: TextStyle;
}

export function DateOperation({timestamp, style}: DateOperationProps) {
  return (
    <Text style={{...styles.text, ...style}}>
      {dateFromTimestamp(timestamp)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textLightGray2,
  }
});
