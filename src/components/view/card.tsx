import {StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme';
import React from 'react';

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
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 8,
    backgroundColor: theme.colors.darkBackground,
    margin: 16,
    zIndex: 999,
  },
});

export default Card;
