import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Icon, IconProps} from 'react-native-elements';
import theme from '../../theme';

export interface ErrorScreenContentProps {
  header: string;
  text: string;
  icon?: IconProps;
  containerStyle?: ViewStyle;
  headerStyle?: TextStyle;
  textStyle?: TextStyle;
}

const defaultIcon: IconProps = {
  name: 'error-outline',
  type: 'material',
  color: theme.colors.grayDark,
  size: 150,
};

const ErrorScreenContent = (props: ErrorScreenContentProps) => {
  const iconProps: IconProps = props.icon || defaultIcon;
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.header, ...props.headerStyle}}>
        {props.header}
      </Text>
      <Icon {...iconProps} />
      <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    color: theme.colors.grayDark,
  },
  text: {
    textAlign: 'center',
    color: theme.colors.grayDark,
  },
});

export default ErrorScreenContent;
