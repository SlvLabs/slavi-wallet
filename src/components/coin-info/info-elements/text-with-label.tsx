import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Card from '../../view/card';
import theme from '../../../theme';

export interface TextWithLabelProps {
  label: string;
  text: string;
}

const TextWithLabel = (props: TextWithLabelProps) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={styles.value}>{props.text}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginRight: 0,
    marginLeft: 0,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: theme.colorsOld.lightGray,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
  },
});

export default TextWithLabel;
