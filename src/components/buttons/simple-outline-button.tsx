import React from 'react';
import SimpleButton, {SimpleButtonProps} from './simple-button';
import theme from '../../theme';
import {StyleSheet, View} from 'react-native';

export default function SimpleOutlineButton(props: SimpleButtonProps) {
  const {containerStyle} = props;
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <SimpleButton {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 38,
    borderWidth: 1,
    borderColor: theme.colors.textLightGray,
    alignItems: 'center',
  }
});
