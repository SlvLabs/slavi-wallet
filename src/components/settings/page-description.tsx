import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import theme from '../../theme';

export interface PageDescriptionProps {
  text: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const PageDescription = (props: PageDescriptionProps) => {
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    color: theme.colorsOld.secondary,
    textAlign: 'center',
  },
});

export default PageDescription;
