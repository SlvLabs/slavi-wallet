import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from '../../../theme';

export interface FullFilterSectionProps {
  title: string;
  children: React.ReactNode;
  rightHeaderElement?: React.ReactNode;
}

const FullFilterSection = (props: FullFilterSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.rightElementContainer}>
          {props.rightHeaderElement}
        </View>
      </View>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingTop: 8,
  },
  titleContainer: {},
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.white,
  },
  rightElementContainer: {},
  content: {
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default FullFilterSection;
