import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {
  Button as ButtonElement,
  ButtonProps as ButtonElementProps,
} from 'react-native-elements';
import theme from '../../theme';

export interface ButtonProps extends ButtonElementProps {
  containerStyle?: ViewStyle;
}

const Button = (props: ButtonProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <ButtonElement
        {...props}
        disabledTitleStyle={{
          ...styles.disabledTitleStyle,
          ...(props.disabledTitleStyle as ViewStyle),
        }}
        buttonStyle={{
          ...styles.defaultStyle,
          ...(props.buttonStyle as ViewStyle),
        }}
        titleStyle={{
          ...styles.defaultTitle,
          ...(props.titleStyle as ViewStyle),
        }}
        disabledStyle={{
          ...styles.defaultDisabledStyle,
          ...(props.disabledStyle as ViewStyle)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  disabledTitleStyle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 13,
    color: theme.colors.textDarkGray,
  },
  defaultStyle: {
    borderRadius: 38,
    padding: 12,
  },
  defaultTitle: {
    color: theme.colors.white,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
  defaultDisabledStyle: {
    backgroundColor: theme.colors.grayDark,
  }
});

export default Button;
