import React from 'react';
import Button, {ButtonProps} from './button';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export interface SolidButtonProps extends ButtonProps {}

const SolidButton = (props: SolidButtonProps) => {
  if (props.disabled) {
    return <Button {...props} />;
  }

  return (
    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={theme.gradientsOld.default}
      titleStyle={styles.defaultTitle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  defaultTitle: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.4,
    color: theme.colorsOld.white,
  },
});

export default SolidButton;
