import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';
import Layout from '../../utils/layout';

export interface SimpleRadioProps<V> {
  options: {value: V; label: string}[];
  selected: V;
  onChange: (value: V) => void;
  elementStyle?: ViewStyle;
}
function addDelimiters<V>(
  options: {value: V; label: string}[],
  selected: V,
): ('delimiter' | {value: V; label: string})[] {
  const result: ('delimiter' | {value: V; label: string})[] = [];
  for (let i = 0; i < options.length; ++i) {
    if (i === 0 || selected === options[i].value || selected === options[i - 1].value) {
      result.push(options[i]);
    } else {
      result.push('delimiter');
      result.push(options[i]);
    }
  }
  return result;
}

export default function SimpleRadio<V>(props: SimpleRadioProps<V>) {
  const {options, selected, onChange, elementStyle} = props;
  const optionsWithDelimiters = addDelimiters(options, selected);
  return (
    <View style={styles.container}>
      {optionsWithDelimiters.map(o => {
        if (o === 'delimiter') {
          return <View style={styles.delimiter} />;
        }
        const {value, label} = o;
        return (
          <TouchableOpacity
            onPress={() => onChange(value)}
            style={{...styles.element, ...elementStyle}}
            key={`option_${value}`}>
            {selected === value ? (
              <LinearGradient {...theme.gradients.activeIcon} style={styles.gradient}>
                <Text style={styles.activeLabel}>{label}</Text>
              </LinearGradient>
            ) : (
              <Text style={styles.label}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.balanceHeaderBackground,
    borderRadius: 10,
    alignItems: 'center',
  },
  element: {
    height: 40,
    width: Layout.isSmallDevice ? 60 : 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
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
    paddingRight: 8,
    paddingLeft: 8,
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
  delimiter: {
    width: 0,
    height: 16,
    borderRightColor: theme.colors.borderGray,
    borderRightWidth: 1,
  },
});
