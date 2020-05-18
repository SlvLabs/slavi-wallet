import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomIcon from '../../custom-icon/custom-icon';
import Card from '../../view/card';
import theme from '../../../theme';

export interface IconTextWithLabelProps {
  icon: string;
  label: string;
  text: string;
}

const IconTextWithLabel = (props: IconTextWithLabelProps) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.valueContainer}>
        <CustomIcon
          name={props.icon}
          size={16}
          color={theme.colorsOld.pink}
          style={styles.icon}
        />
        <Text style={styles.value}>{props.text}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginRight: 0,
    marginLeft: 0,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    textAlignVertical: 'center',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: theme.colorsOld.lightGray,
  },
  icon: {
    marginRight: 5,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.4,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
  },
});

export default IconTextWithLabel;
