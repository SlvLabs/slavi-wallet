import Button, {ButtonProps} from './button';
import {StyleSheet, ViewStyle} from 'react-native';
import theme from '../../theme';
import React from 'react';

export interface OutlineButtonProps extends ButtonProps {}

const OutlineButton = (props: OutlineButtonProps) => {
  const {buttonStyle, ...other} = props;
  const {disabled} = props;

  return (
    <Button
      type={'outline'}
      buttonStyle={{
        ...(disabled ? styles.disabledButtonStyle : styles.defaultButtonStyle),
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
  disabledButtonStyle: {
    padding: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default OutlineButton;
