import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import DrawerElementProps from './drawer-element-props';

const defaultIconSize = 24;

const DrawerElement = (props: DrawerElementProps) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...props.containerStyle}}
      onPress={props.onPress}>
      <CustomIcon
        name={props.iconName}
        color={props.iconColor || theme.colorsOld.drawerText}
        size={props.iconSize || defaultIconSize}
      />
      <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default DrawerElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: theme.colorsOld.drawerText,
    marginLeft: 16,
  },
});
