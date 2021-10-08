import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface OperationStatusProps {
  status: string;
  statusStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const statusStyles: Record<string, any> = {
  created: {
    color: '#59F5FF',
    backgroundColor: 'rgba(89, 245, 255, 0.1)',
  },
  processing: {
    color: '#FFED48',
    backgroundColor: 'rgba(255, 226, 72, 0.1)',
  },
  confirmed: {
    color: '#12D489',
    backgroundColor: 'rgba(18, 212, 137, 0.1)',
  },
  hold: {
    color: '#FF9345',
    backgroundColor: 'rgba(255, 143, 39, 0.1)',
  },
  rejected: {
    color: '#FF6984',
    backgroundColor: 'rgba(255, 105, 132, 0.1)',
  },
}

const OperationStatus = (props: OperationStatusProps) => {
  const color = statusStyles[props.status]?.color || theme.colors.white;
  const backgroundColor = statusStyles[props.status]?.backgroundColor || theme.colors.white;

  return (
    <View style={{...styles.container, ...props.containerStyle, backgroundColor}}>
      <Text style={{...styles.status, ...props.statusStyle, color}}>
        {props.status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  status: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0.4,
    fontSize: 12,
    lineHeight: 16,
  },
});

export default OperationStatus;
