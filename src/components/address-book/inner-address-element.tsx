import React from 'react';
import {View, ViewStyle, Text, StyleSheet, TextStyle} from 'react-native';
import theme from '../../theme';
import {useTranslation} from 'react-i18next';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface InnerAddressElementProps {
  address: string;
  name?: string;
  balance?: string;
  ticker?: string;
  containerStyle?: ViewStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
  balanceStyle?: TextStyle;
  balancePrecision?: number;
}

const DEFAULT_PRECISION = 4;

const InnerAddressElement = (props: InnerAddressElementProps) => {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.topRow}>
        <Text style={{...styles.name, ...props.nameStyle}}>
          {props.name || t('No name')}
        </Text>
        {!!props.balance && (
          <Text style={{...styles.balance, ...props.balanceStyle}}>
            {`${makeRoundedBalance(props.balancePrecision || DEFAULT_PRECISION, props.balance)} ${props.ticker}`}
          </Text>
        )}
      </View>
      <Text style={{...styles.address, ...props.addressStyle}}>
        {props.address}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: theme.colors.borderGray,
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.darkGreen1,
  },
  address: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 17,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
  }
});

export default InnerAddressElement;
