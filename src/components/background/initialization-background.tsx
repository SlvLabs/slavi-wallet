import theme from '../../theme';
import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';

export interface InitializationBackgroundProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export default function InitializationBackground(props: InitializationBackgroundProps) {
  const {children} = props;
  return (
    <View style={styles.container}>
      <RadialGradient
        style={{...styles.gradient, ...props.containerStyle}}
        {...theme.gradients.radialBackgroundGradient}>
        {children}
      </RadialGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    height: '100%',
  },
  gradient: {
    padding: 32,
    flex: 1,
  },
});
