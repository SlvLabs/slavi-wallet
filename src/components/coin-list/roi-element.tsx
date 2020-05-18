import {Text} from 'react-native-elements';
import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface RoiElementProps {
  value: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const RoiElement = (props: RoiElementProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.text, ...props.textStyle}}>{props.value}%</Text>
      <Text style={{...styles.label, ...props.labelStyle}}>ROI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    fontWeight: '500',
    color: theme.colorsOld.darkGray,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontSize: 10,
    letterSpacing: 0.4,
    fontWeight: '500',
    color: theme.colorsOld.darkGray,
    marginLeft: 5,
  },
});

export default RoiElement;
