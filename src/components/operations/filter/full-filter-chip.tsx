import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import theme from '../../../theme';

export interface FullFilterChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const FullFilterChip = (props: FullFilterChipProps) => {
  const extraContainerStyle = props.selected
    ? styles.activeContainer
    : styles.inactiveContainer;
  const extraTitleStyle = props.selected
    ? styles.activeTitle
    : styles.inactiveTitle;
  return (
    <TouchableOpacity
      style={{...styles.container, ...extraContainerStyle}}
      onPress={props.onPress}>
      <Text style={{...styles.title, ...extraTitleStyle}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    margin: 4,
  },
  inactiveContainer: {
    backgroundColor: theme.colorsOld.cultured,
  },
  activeContainer: {
    backgroundColor: theme.colorsOld.pink,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    textTransform: 'uppercase',
  },
  inactiveTitle: {
    color: theme.colorsOld.gray,
  },
  activeTitle: {
    color: theme.colorsOld.white,
  },
});

export default FullFilterChip;
