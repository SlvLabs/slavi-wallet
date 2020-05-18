import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface OperationStatusProps {
  status: string;
  statusStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const OperationStatus = (props: OperationStatusProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.status, ...props.statusStyle}}>
        {props.status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
  },
});

export default OperationStatus;
