import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomIcon from '../../custom-icon/custom-icon';
import theme from '../../../theme';

export interface IconTextWithLabelProps {
  icon: string;
  label: string;
  text: string;
}

const IconTextWithLabel = (props: IconTextWithLabelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.valueContainer}>
        <CustomIcon
          name={props.icon}
          size={16}
          color={theme.colors.textLightGray}
          style={styles.icon}
        />
        <Text style={styles.value}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    textAlignVertical: 'center',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.textLightGray,
  },
  icon: {
    marginRight: 5,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.white,
  },
});

export default IconTextWithLabel;
