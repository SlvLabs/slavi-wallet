import {Icon} from 'react-native-elements';
import theme from '../../theme';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';

export interface SimpleCheckboxProps {
  label?: string;
  children?: React.ReactNode;
  checked: boolean;
  onPress: () => void;
}

export default function SimpleCheckbox(props: SimpleCheckboxProps) {
  const {label, checked, onPress, children} = props;
  const backgroundStyle = useMemo(() => ({
      ...styles.background,
      ...(checked ? styles.checkedBackground : styles.uncheckedBackground)}
  ), [checked]);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={backgroundStyle}>
        {checked && (
          <Icon
            type="octicon"
            name="check"
            color={theme.colors.white}
            size={16}
          />
        )}
      </View>
      {children || <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 19,
    color: theme.colors.white,
    textAlign: 'center',
    marginLeft: 20,
  },
  background: {
    borderRadius: 3,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBackground: {
    backgroundColor: theme.colors.white,
  },
  checkedBackground: {
    backgroundColor: theme.colors.green,
  },
});
