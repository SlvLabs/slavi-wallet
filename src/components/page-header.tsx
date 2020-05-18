import React from 'react';
import {StyleSheet, Text, ViewStyle} from 'react-native';

export interface PageHeaderProps {
  text: string;
  style?: ViewStyle;
}

const PageHeader = (props: PageHeaderProps) => {
  const {text, style} = props;
  return <Text style={[styles.container, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 15,
  },
});

export default PageHeader;
