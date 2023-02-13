import {ImageStyle, StyleSheet, View} from 'react-native';
import React from 'react';
import {Image, Text} from 'react-native-elements';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import ConvertedBalanceElement from '../coin-info/converted-balance-element';
import Card from '../view/card';

export interface CoinBalanceHeaderProps {
  name: string;
  balance: string;
  fiatBalance?: string;
  fiatTicker?: string;
  cryptoBalance?: string;
  cryptoTicker?: string;
  logo?: string;
  logoStyle?: ImageStyle;
  extraContent?: React.ReactNode;
  type?: string;
  ticker: string;
}

const CoinBalanceHeader = (props: CoinBalanceHeaderProps) => {
  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image source={getImageSource(props.logo)} style={styles.logoImage} />
        </View>
        <View style={styles.dataColumn}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.type}>{props.type || props.ticker}</Text>
          </View>
          <ConvertedBalanceElement
            balance={props.balance}
            fiatBalance={props.fiatBalance}
            fiatTicker={props.fiatTicker}
            cryptoBalance={props.cryptoBalance}
            cryptoTicker={props.cryptoTicker}
          />
        </View>
      </View>
      {props.extraContent}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
  },
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dataColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 5,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.quiteTransparent,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  button: {
    width: 88,
  },
  type: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 16,
    color: theme.colors.borderGreen,
    textTransform: 'uppercase',
  }
});

export default CoinBalanceHeader;
