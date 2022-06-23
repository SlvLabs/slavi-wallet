import React from 'react';
import Button from './button';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {SolidButtonProps} from './solid-button';

const GSolidButton = (props: SolidButtonProps) => {
  const {disabled, gradient} = props;

  return (
    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={gradient || (disabled ? theme.gradients.disabledButton : theme.gradients.button)}
      containerStyle={styles.buttonContainer}
      disabledTitleStyle={{color: theme.colors.textLightGray1, ...props.disabledTitleStyle}}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 38,
  },
});

export default GSolidButton;
