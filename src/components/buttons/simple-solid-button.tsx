import React from 'react';
import SimpleButton, {SimpleButtonProps} from './simple-button';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import {StyleSheet} from 'react-native';

export default function SimpleSolidButton(props: SimpleButtonProps) {
  const {containerStyle} = props;
  return (
    <LinearGradient {...theme.gradients.button} style={{...styles.container, ...containerStyle}}>
      <SimpleButton {...props} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 38,
    alignItems: 'center',
  }
});
