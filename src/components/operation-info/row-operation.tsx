import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle, Text, TextStyle} from 'react-native';
import theme from '../../theme';

export interface RowOperationProps {
  label: string;
  content: ReactNode;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  isLast?: boolean;
}

export function RowOperation({label, containerStyle, content, labelStyle, isLast}: RowOperationProps) {
  return (
    <View style={{...styles.container, ...containerStyle, ...(isLast ? {} : styles.borderStyle)}}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.lightGray,
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colors.maxTransparent,
  },
});
