import theme from '../../theme';
import {StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import SafeAreaView from 'react-native-safe-area-view';

export interface InitializationBackgroundProps {
  children: ReactNode;
}

export default function InitializationBackground(props: InitializationBackgroundProps) {
  const {children} = props;
  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always', bottom: 'never'}}>
      <RadialGradient style={styles.gradient} {...theme.gradients.radialBackgroundGradient} >
        {children}
      </RadialGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black
  },
  gradient: {
    padding: 32,
    flex: 1,
  },
});
