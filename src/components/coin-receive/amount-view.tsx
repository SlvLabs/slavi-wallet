import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import DecimalInput, {DecimalType} from '../controls/decimal-input';

export interface AmountViewProps {
  onChange(amount: any): void;
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

const AmountView = (props: AmountViewProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <DecimalInput
        onChangeText={props.onChange}
        label={props.label}
        style={{...styles.input, ...props.inputStyle}}
        inputType={DecimalType.Real}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  input: {},
});

export default AmountView;
