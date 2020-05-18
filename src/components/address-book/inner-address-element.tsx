import React from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';

export interface InnerAddressElementProps {
  address: string;
  name?: string;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
}

const InnerAddressElement = (props: InnerAddressElementProps) => {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <Text style={{...styles.name, ...props.nameStyle}}>
        {props.name || t('No name')}
      </Text>
      <Text style={{...styles.address, ...props.addressStyle}}>
        {props.address}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.4,
    color: theme.colorsOld.gray,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 17,
    letterSpacing: 0.4,
    color: theme.colorsOld.lightGray,
    textTransform: 'uppercase',
  },
});

export default InnerAddressElement;
