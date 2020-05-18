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
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colorsOld.white,
    margin: 16,
    shadowColor: theme.colorsOld.gray,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    shadowOpacity: 0.32,
    elevation: 16,
    zIndex: 999,
  },
});

export default Card;
