import theme from '../theme';
import ScreenHeader, {ScreenHeaderProps} from './screen-header';
import {StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../utils/layout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export interface ScrollableScreenProps extends ScreenHeaderProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export default function ScrollableScreen(props: ScrollableScreenProps) {
  const {children, containerStyle, ...headerProps} = props;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{...styles.container, ...containerStyle}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
    >
      <LinearGradient {...theme.gradients.screenBackground} style={styles.gradient}>
        <ScreenHeader {...headerProps} />
        <View style={styles.content}>
          {children}
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%'
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
