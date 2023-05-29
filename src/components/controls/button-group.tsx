import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import Layout from '../../utils/layout';

interface ButtonGroupProps {
  selected?: number;
  options: string[];
  onPress: (index: number) => void;
}

export function ButtonGroup({selected, options, onPress}: ButtonGroupProps) {
  return (
    <View style={styles.wrap}>
      {options.map((option, i) => (
        <TouchableOpacity onPress={() => onPress(i)}>
          {i === selected ? (
            <LinearGradient style={styles.selectedContainer} {...theme.gradients.activeIcon}>
              <Text style={styles.selectedText}>{option}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.container}>
              <View
                style={
                  i === options.length - 1 || (selected && i === selected - 1)
                    ? styles.textContainer
                    : {...styles.textContainer, ...styles.bordered}
                }>
                <Text style={styles.text}>{option}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkWord,
    borderRadius: 10,
  },
  container: {
    borderRadius: 6,
    paddingTop: Layout.isSmallDevice ? 8 : 12,
    paddingBottom: Layout.isSmallDevice ? 8 : 12,
    minWidth: Layout.isSmallDevice ? 32 : 40,
  },
  selectedContainer: {
    borderRadius: 6,
    paddingTop: Layout.isSmallDevice ? 8 : 12,
    paddingBottom: Layout.isSmallDevice ? 8 : 12,
    paddingLeft: Layout.isSmallDevice ? 4 : 8,
    paddingRight: Layout.isSmallDevice ? 4 : 8,
    minWidth: Layout.isSmallDevice ? 32 : 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    fontFamily: theme.fonts.default,
    color: theme.colors.white,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
  text: {
    fontFamily: theme.fonts.default,
    color: theme.colors.textLightGray,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
  },
  textContainer: {
    paddingLeft: Layout.isSmallDevice ? 4 : 8,
    paddingRight: Layout.isSmallDevice ? 4 : 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bordered: {
    borderRightWidth: 1,
    borderRightColor: theme.colors.borderGray,
  },
});
