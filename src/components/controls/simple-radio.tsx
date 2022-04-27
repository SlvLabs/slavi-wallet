import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface SimpleRadioProps {
  options: Record<string | number, string>;
  selected: string;
  onChange: (value: string) => void;
  elementStyle?: ViewStyle;
}

export default function SimpleRadio(props: SimpleRadioProps) {
  const {options, selected, onChange, elementStyle} = props;

  return (
    <View style={styles.container}>
      {Object.entries(options).map(([value, label]) => (
        <TouchableOpacity
          onPress={() => onChange(value)}
          style={{...styles.element, ...elementStyle}}
          key={`option_${value}`}
        >
          {selected == value ? (
            <LinearGradient {...theme.gradients.activeIcon} style={styles.gradient}>
              <Text style={styles.activeLabel}>{label}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.label}>
              {label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.balanceHeaderBackground,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  element: {
    height: 40,
    width: Layout.isSmallDevice ? 60 : 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 14,
    lineHeight: Layout.isSmallDevice ? 14 : 16,
    color: theme.colors.white,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Layout.isSmallDevice ? 12 : 14,
    lineHeight: Layout.isSmallDevice ? 14 : 16,
    color: theme.colors.textLightGray,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
});
