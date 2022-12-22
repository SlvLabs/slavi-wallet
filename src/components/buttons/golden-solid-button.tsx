import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import Button from './button';
import {SolidButtonProps} from './solid-button';

export function GoldenSolidButton(props: SolidButtonProps) {
  return (
    <Button
      ViewComponent={LinearGradient}
      linearGradientProps={props.disabled ? theme.gradients.goldenDisabledButton : theme.gradients.goldenButton}
      titleStyle={styles.title}
      containerStyle={{...styles.buttonContainer, ...(props.disabled ? styles.disabledButtonContainer : {})}}
      disabledTitleStyle={styles.disabledTitle}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  disabled: {},
  buttonContainer: {
    borderRadius: 44,
  },
  disabledButtonContainer: {
    backgroundColor: theme.colors.black,
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    color: theme.colors.cardBackground2,
  },
  disabledTitle: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    color: theme.colors.disabledTitle,
  },
});
