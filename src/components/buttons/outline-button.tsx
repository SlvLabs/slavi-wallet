import Button, {ButtonProps} from './button';
import {StyleSheet, ViewStyle} from 'react-native';
import theme from '../../theme';
import React from 'react';

export interface OutlineButtonProps extends ButtonProps {}

const OutlineButton = (props: OutlineButtonProps) => {
  const {buttonStyle, ...other} = props;
  return (
    <Button
      type={'outline'}
      buttonStyle={{
        ...styles.defaultButtonStyle,
        ...(buttonStyle as ViewStyle),
      }}
      {...other}
    />
  );
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
    padding: 12,
    backgroundColor: 'transparent',
    borderColor: theme.colors.textLightGray,
    borderRadius: 38,
    borderWidth: 1,
  },
});

export default OutlineButton;
