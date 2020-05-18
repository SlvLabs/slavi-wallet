import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../../../theme';

export interface ScrollFilterChipProps {
  text: string;
  onPress?: () => void;
  active?: boolean;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ScrollFilterChip = (props: ScrollFilterChipProps) => {
  const extraStyle = props.active ? styles.activeChip : styles.inactiveChip;
  const extraTextStyle = props.active ? styles.activeText : styles.inactiveText;

  return (
    <TouchableOpacity
      style={{...styles.chips, ...extraStyle, ...props.chipStyle}}
      onPress={props.onPress}>
      <Text style={{...styles.text, ...extraTextStyle, ...props.textStyle}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chips: {
    backgroundColor: theme.colorsOld.cultured,
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 10,
    lineHeight: 10,
    textTransform: 'uppercase',
  },
  inactiveChip: {
    backgroundColor: theme.colorsOld.cultured,
  },
  activeChip: {
    backgroundColor: theme.colorsOld.pink,
  },
  inactiveText: {
    color: theme.colorsOld.gray,
  },
  activeText: {
    color: theme.colorsOld.white,
  },
});

export default ScrollFilterChip;
