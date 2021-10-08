import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../../theme';

export interface TextWithLabelProps {
  label: string;
  text: string;
}

const TextWithLabel = (props: TextWithLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.value}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textLightGray,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
});

export default TextWithLabel;
