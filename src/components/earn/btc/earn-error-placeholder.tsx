import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import theme from '../../../theme';
import AlertRow from '../../error/alert-row';

export interface EarnErrorPlaceholderProps {
  error: string;
}

export function EarnErrorPlaceholder({error}: EarnErrorPlaceholderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon type={'feather'} name={'grid'} size={64} color={theme.colors.textLightGray1} />
      </View>
      <AlertRow text={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: theme.colors.mediumBackground,
    padding: 30,
    alignSelf: 'center',
    borderRadius: 16,
  },
});
