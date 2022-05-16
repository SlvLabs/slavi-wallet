import React from 'react';
import {Image, ImageSourcePropType, Text, TextStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';

export interface NftInfoElementProps {
  label: string;
  value: string;
  image?: ImageSourcePropType;
  valueStyle?: TextStyle;
  isLast?: boolean;
}

export default function NftInfoElement(props: NftInfoElementProps) {
  const {label, value, image, valueStyle, isLast} = props;

  return (
    <View style={!isLast ? {...styles.container, ...styles.notLastContainer} : styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        {!!image && <Image source={image} style={styles.image}/>}
        <Text style={{...styles.value, ...valueStyle}}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  notLastContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    color: theme.colors.lightGray,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    color: theme.colors.white,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
