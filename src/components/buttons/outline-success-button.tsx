import type {ButtonProps} from './button';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import React from 'react';
import OutlineButton from './outline-button';

export interface OutlineButtonProps extends ButtonProps {}

const OutlineSuccessButton = (props: OutlineButtonProps) => {
  return <OutlineButton {...props} buttonStyle={styles.button} titleStyle={styles.title} />;
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.borderGreen,
  },
  button: {
    borderColor: theme.colors.borderGreen,
  },
});

export default OutlineSuccessButton;
