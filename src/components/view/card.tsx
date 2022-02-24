import {StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme';
import React from 'react';
import Layout from '../../utils/layout';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card = (props: CardProps) => {
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: Layout.isSmallDevice ? 8 : 16,
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 8,
    backgroundColor: theme.colors.darkBackground,
    margin: Layout.isSmallDevice ? 8 : 16,
    zIndex: 999,
  },
});

export default Card;
