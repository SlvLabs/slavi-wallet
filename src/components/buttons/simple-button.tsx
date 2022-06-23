import React, {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, View} from 'react-native';
import theme from '../../theme';

export interface SimpleButtonProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function SimpleButton(props: SimpleButtonProps) {
  const {title, leftIcon, rightIcon, onPress, containerStyle, textContainerStyle} = props;
  return (
    <TouchableOpacity style={{...styles.container, ...containerStyle}} onPress={onPress}>
      {leftIcon}
      <View style={{...styles.textContainer, ...textContainerStyle}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
