import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import theme from '../../theme';

export interface TextOperationProps {
  text: string;
  textStyle?: TextStyle,
}

export function TextOperation({text, textStyle}: TextOperationProps) {
  return (
    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
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
