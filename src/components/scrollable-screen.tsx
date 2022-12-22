import theme from '../theme';
import ScreenHeader, {ScreenHeaderProps} from './screen-header';
import {RefreshControlProps, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactElement, ReactNode} from 'react';
import {View} from 'react-native';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';
import Layout from '../utils/layout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface ScrollableScreenProps extends ScreenHeaderProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  gradientStyle?: ViewStyle;
  gradient?: LinearGradientProps;
  refreshControl?: ReactElement<RefreshControlProps>;
}

export default function ScrollableScreen({
  children,
  containerStyle,
  contentStyle,
  gradient,
  gradientStyle,
  refreshControl,
  ...headerProps
}: ScrollableScreenProps) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{...styles.container, ...containerStyle}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      refreshControl={refreshControl}>
      <LinearGradient
        {...{...theme.gradients.screenBackground, ...gradient}}
        style={{...styles.gradient, ...gradientStyle}}>
        <ScreenHeader {...headerProps} />
        <View style={{...styles.content, ...contentStyle}}>{children}</View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
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
