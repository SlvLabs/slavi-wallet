import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import makeRoundedBalance from '../../utils/make-rounded-balance';

export interface SimpleCoinListElementProps {
  name: string;
  logo?: string;
  type?: string;
  onPress?: () => void;
  balance?: string;
  ticker?: string;
  fiatBalance?: string;
  fiatTicker?: string;
  shownBalances?: boolean;
}

const fiatPrecision = 2;
const cryptoPrecision = 4;

export default function SimpleCoinListElement(props: SimpleCoinListElementProps) {
  const {logo, name, type, onPress, fiatBalance, fiatTicker, balance, ticker, shownBalances} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftColumn}>
        <Image
          source={getImageSource(logo)}
          style={styles.logo}
        />
      </View>
      <View style={styles.centerColumn}>
        <Text style={styles.name}>{name}</Text>
        {!!type && <Text style={styles.type}>{type}</Text>}
      </View>
      {!!shownBalances && (
        <View style={styles.rightColumn}>
          {typeof fiatBalance !== 'undefined' ? (
            <View>
              <Text style={styles.fiatBalance}>{`${makeRoundedBalance(fiatPrecision, fiatBalance)} ${fiatTicker}`}</Text>
              <Text style={styles.balance}>{`${makeRoundedBalance(cryptoPrecision, balance)} ${ticker}`}</Text>
            </View>
          ) : (
            <Text style={styles.fiatBalance}>{`${makeRoundedBalance(fiatPrecision, balance)} ${ticker}`}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

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
  rightColumn: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoPlaceholder: {
    backgroundColor: '#fff',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 20,
    color: theme.colors.white,
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
  balance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    color: theme.colors.textLightGray,
    textTransform: 'uppercase',
  },
  fiatBalance: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14.,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: 'right',
  },
});
