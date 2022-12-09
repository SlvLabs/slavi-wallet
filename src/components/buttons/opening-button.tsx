import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import Layout from '../../utils/layout';

export interface OpeningButtonProps {
  opened: boolean;
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export default function OpeningButton({opened, title, onPress, containerStyle}: OpeningButtonProps) {
  return (
    <TouchableOpacity
      style={{...styles.container, ...containerStyle, ...(opened ? styles.openedContainer : styles.closedContainer)}}
      onPress={onPress}
    >
      <Text style={{...styles.title, ...(opened ? styles.openedTitle : styles.closedTitle)}}>{title}</Text>
      <CustomIcon name={'arrow-right1'} style={{...styles.icon, ...(opened ? styles.openedIcon : {})}} size={16} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: Layout.isSmallDevice ? 9 : 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  closedContainer: {
    backgroundColor: theme.colors.simpleCoinBackground,
  },
  openedContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.buttonBorder,
    borderStyle: 'solid',
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.white,
  },
  icon: {
    marginLeft: 12,
    transform: [
      {
        rotate: '90deg',
      },
    ],
    color: theme.colors.textLightGray3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openedIcon: {
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
  openedTitle: {
    opacity: 0.7,
  },
  closedTitle: {
    opacity: 1,
  }
});
