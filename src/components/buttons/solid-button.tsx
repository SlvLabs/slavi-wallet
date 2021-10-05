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
      linearGradientProps={theme.gradients.button}
      containerStyle={styles.buttonContainer}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 38,
  },
});

export default SolidButton;
