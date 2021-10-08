import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity, View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

export interface ScrollFilterChipProps {
  text: string;
  onPress?: () => void;
  active?: boolean;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ScrollFilterChip = (props: ScrollFilterChipProps) => {
  return (
    <TouchableOpacity
      style={{...styles.chips, ...props.chipStyle}}
      onPress={props.onPress}>
      {props.active ? (
        <LinearGradient {...theme.gradients.button} style={styles.contentContainer} >
          <Text style={{...styles.text, ...styles.activeText, ...props.textStyle}}>
            {props.text}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={{...styles.text, ...props.textStyle}}>
            {props.text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chips: {
    backgroundColor: theme.colors.cardBackground3,
    borderRadius: 16,
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    color: theme.colors.textLightGray3,
  },
  activeText: {
    color: theme.colorsOld.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 17,
    paddingLeft: 17,
    borderRadius: 8,
    justifyContent: 'center',
  }
});

export default ScrollFilterChip;
