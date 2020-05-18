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
}

const CoinBalanceHeader = (props: CoinBalanceHeaderProps) => {
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <Image source={getImageSource(props.logo)} style={styles.logoImage} />
        </View>
        <View style={styles.dataColumn}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{props.name}</Text>
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
  logoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  logoImage: {
    width: 48,
    height: 48,
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
    justifyContent: 'flex-start',
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: theme.colorsOld.darkGray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  button: {
    width: 88,
  },
});

export default CoinBalanceHeader;
