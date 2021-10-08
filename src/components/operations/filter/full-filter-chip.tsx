import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

export interface FullFilterChipProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const FullFilterChip = (props: FullFilterChipProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}>
      {props.selected ? (
        <LinearGradient {...theme.gradients.button} style={styles.contentContainer} >
          <Text style={{...styles.title, ...styles.activeTitle}}>
            {props.title}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {props.title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 8,
  },
  title: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    color: theme.colors.textLightGray3
  },
  activeTitle: {
    color: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground3,
  }
});

export default FullFilterChip;
