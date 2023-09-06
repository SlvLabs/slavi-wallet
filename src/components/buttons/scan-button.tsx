import OutlineButton, {OutlineButtonProps} from './outline-button';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import React from 'react';
import {StyleSheet} from 'react-native';

export function ScanButton(props: OutlineButtonProps) {
  return (
    <OutlineButton
      icon={<CustomIcon color={theme.colors.white} name={'scan'} size={16} style={styles.icon} />}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
});
