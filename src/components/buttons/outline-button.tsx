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
    borderRadius: 8,
    padding: 11,
    borderColor: theme.colorsOld.lightGray,
    backgroundColor: theme.colorsOld.white,
  },
});

export default OutlineButton;
