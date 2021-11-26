import React from 'react';

import {ScrollView, StyleSheet, Text, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface ScrollableAreaProps {
    text: string;
    containerStyle?: ViewStyle;
}

export default function ScrollableArea(props: ScrollableAreaProps) {
  const {text, containerStyle} = props;
  return (
    // TODO: style indicator
    <ScrollView style={{...styles.container, ...containerStyle}}>
        <Text style={styles.text}>{text}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 500,
    borderRadius: 8,
    backgroundColor: theme.colors.grayDark,
    padding: 16,
  },
  text: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 17,
    color: theme.colors.textLightGray,
    textAlign: 'left',
  },
});
