import theme from '../theme';
import ScreenHeader, {ScreenHeaderProps} from './screen-header';
import {StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../utils/layout';

export interface ScreenProps extends ScreenHeaderProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

export default function Screen({children, containerStyle, contentStyle, ...headerProps}: ScreenProps) {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <LinearGradient {...theme.gradients.screenBackground} style={styles.gradient}>
        <ScreenHeader {...headerProps} />
        <View style={{...styles.content, ...contentStyle}}>{children}</View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingRight: Layout.isSmallDevice ? 8 : 16,
  },
  content: {
    flex: 1,
  },
});
