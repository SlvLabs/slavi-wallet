import theme from '../../theme';
import {Icon} from 'react-native-elements';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function NetworkShownCheckbox({shown, onPress}: {shown: boolean; onPress(): void}) {
  return shown ? (
    <Icon
      type="material-community"
      name="checkbox-marked"
      color={theme.colors.green}
      style={styles.checkbox}
      onPress={onPress}
    />
  ) : (
    <Icon
      onPress={onPress}
      type="material-community"
      name="checkbox-blank-outline"
      color={theme.colors.lightTransparent}
      style={styles.checkbox}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
  },
});
