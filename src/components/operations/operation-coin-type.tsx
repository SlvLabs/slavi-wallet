import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface OperationCoinTypeProps {
  type: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const OperationCoinType = (props: OperationCoinTypeProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.text, ...props.textStyle}}>{props.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 16,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
});

export default OperationCoinType;
