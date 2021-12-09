import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import theme from '../../theme';

export interface SimpleButtonProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function SimpleButton(props: SimpleButtonProps) {
  const {title, leftIcon, rightIcon, onPress, containerStyle} = props;
  return (
    <TouchableOpacity style={{...styles.container, ...containerStyle}} onPress={onPress}>
      {leftIcon}
      <Text style={styles.title}>{title}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 38,
    padding: 12,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.white,
  },
});
