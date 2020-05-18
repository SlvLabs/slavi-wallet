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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  disabledTitleStyle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.4,
    color: theme.colorsOld.lightGray,
  },
  defaultStyle: {
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 8,
    padding: 11,
  },
  defaultTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
  },
});

export default Button;
