import {StyleSheet, Text, View} from 'react-native';
import theme from '../theme';
import {Icon} from 'react-native-elements';
import React from 'react';

export interface PlaceholderProps {
  text: string;
}

export function Placeholder({text}: PlaceholderProps) {
  return (
    <View style={styles.placeholder}>
      <View style={styles.iconContainer}>
        <Icon type={'feather'} name={'grid'} size={64} color={theme.colors.textLightGray1} />
      </View>
      <Text style={styles.placeholderText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    marginTop: 50,
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.textLightGray1,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 24,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: theme.colors.mediumBackground,
    padding: 30,
    alignSelf: 'center',
    borderRadius: 16,
  },
});
