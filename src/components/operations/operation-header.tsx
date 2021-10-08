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
  const now = new Date().getDate();
  if (date.getDate() === now) {
    return 'Today';
  } else if (date.getDate() === now - 1) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

const OperationHeader = (props: OperationHeaderProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.header, ...props.headerStyle}}>
        {formatDate(props.date)}
      </Text>
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
    lineHeight: 10,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
  },
});

export default OperationHeader;
