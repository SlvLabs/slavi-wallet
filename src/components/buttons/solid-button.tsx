import React from 'react';
import Button, {ButtonProps} from './button';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export interface SolidButtonProps extends ButtonProps {
  gradient?: Object;
}

const SolidButton = (props: SolidButtonProps) => {
  const {disabled, gradient} = props;
  if (disabled) {
    return <Button {...props} />;
  }

  return (
    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={gradient || theme.gradients.button}
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
