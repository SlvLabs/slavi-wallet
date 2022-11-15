import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React from 'react';
import theme from '../../theme';

export interface OperationHeaderProps {
  date: Date;
  dateFormat?: string;
  containerStyle?: ViewStyle;
  headerStyle?: TextStyle;
}

const formatDate = (date: Date): string => {
  const now = new Date();
  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    return 'Today';
  }
  now.setDate(now.getDate() - 1);
  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    return 'Yesterday';
  }

  return date.toLocaleDateString();
};

const OperationHeader = (props: OperationHeaderProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.header, ...props.headerStyle}}>{formatDate(props.date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingTop: 17,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
});

export default OperationHeader;
