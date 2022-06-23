import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import React from 'react';
import theme from '../../theme';
import {Currency} from './currency-select';

interface CurrencySelectListElementProps {
  currency: Currency;
  onPress: () => void;
}

export const CurrencySelectListElement = ({currency, onPress}: CurrencySelectListElementProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftColumn}>
        <Image source={getImageSource(currency.img)} style={styles.logo} />
      </View>
      <View style={styles.centerColumn}>
        <Text style={styles.name}>{currency.name || currency.ticker}</Text>
        {!!currency.name && <Text style={styles.ticker}>{currency.ticker}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: theme.colors.simpleCoinBackground,
  },
  leftColumn: {
    flex: 1,
    paddingRight: 16,
  },
  centerColumn: {
    flex: 8,
    justifyContent: 'center',
  },
  logo: {
    width: 32,
    height: 32,
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 20,
    color: theme.colors.white,
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
});
