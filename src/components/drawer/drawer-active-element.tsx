import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import theme from '../../theme';
import DrawerElementProps from './drawer-element-props';
import LinearGradient from 'react-native-linear-gradient';
import DrawerElement from './drawer-element';

const DrawerActiveElement = (props: DrawerElementProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <LinearGradient
        {...theme.gradientsOld.drawerActiveBorder}
        style={styles.activeIndicator}>
        <View style={styles.activeIndicatorContent} />
      </LinearGradient>
      <LinearGradient
        {...theme.gradientsOld.drawerActiveBackground}
        style={styles.content}>
        <DrawerElement
          iconName={props.iconName}
          text={props.text}
          onPress={props.onPress}
          textStyle={styles.text}
          iconColor={theme.colorsOld.white}
          iconSize={props.iconSize}
          containerStyle={styles.element}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DrawerActiveElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: theme.colorsOld.white,
    marginLeft: 16,
  },
  activeIndicator: {
    width: 8,
  },
  activeIndicatorContent: {
    flex: 1,
  },
  element: {
    marginLeft: -8,
  },
});
