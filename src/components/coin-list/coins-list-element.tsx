import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Image, Text} from 'react-native-elements';
import theme from '../../theme';
import getImageSource from '../../utils/get-image-source';
import CoinType from '@slavi/wallet-core/src/utils/coin-types';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import PriceWithChange from './price-with-change';
import Layout from '../../utils/layout';
import NumberText from '../text/number-text';

export interface CoinDisplayData {
  name: string;
  total: string;
  fiatTotal: string;
  cryptoTotal: string;
  invested?: string;
  fiatInvested?: string;
  cryptoInvested?: string;
  ticker: string;
  logo?: string;
  fiatPrice?: number;
  fiatPriceChange?: number;
  cryptoPrice?: number;
  cryptoPriceChange?: number;
  roi?: number;
  shown: boolean;
  priority: number;
  type?: CoinType;
  parent?: string;
  id: string;
}

export interface CoinListElementProps {
  data: CoinDisplayData;
  fiat: string;
  crypto: string;
  fiatSymbol: string;
  showElement: boolean;
  showControl: boolean;
  onPress(): void;
  onShownChange(id: string): void;
}

const cryptoPercision = 4;
const fiatPercision = 2;

const CoinsListElement = (props: CoinListElementProps) => {
  const {
    name,
    total,
    fiatTotal,
    ticker,
    shown,
    logo,
    id,
    fiatPriceChange,
    fiatPrice,
    type
  } = props.data;

  const onChangeSwitcher = useCallback(() => {
    props.onShownChange(id);
  },[id, props.onShownChange]);

  const priceChange = +(fiatPriceChange || 0);

  return props.showElement ? (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.logoContainer}>
        <Image
          source={getImageSource(logo)}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={styles.logoPlaceholder}
        />
      </View>
      <View style={styles.col1}>
        <View style={styles.nameTypeContainer}>
          <Text style={styles.name} ellipsizeMode={'tail'} numberOfLines={1}>{name}</Text>
        </View>
        <View style={styles.underNameRow}>
          {!!type && <Text style={styles.type}>{type}</Text>}
          <PriceWithChange
            price={fiatPrice || 0}
            currency={props.fiatSymbol}
            change={priceChange}
          />
        </View>
      </View>
      <View style={styles.col2}>
        <View style={styles.coinBalanceRow}>
          <NumberText
            value={makeRoundedBalance(cryptoPercision, total)}
            style={{...styles.coinBalanceText, ...styles.coinBalance}}
          />
          <Text style={styles.coinBalanceText}>{ticker}</Text>
        </View>
        {fiatTotal !== '0' && (
          <View style={styles.fiatBalanceRow}>
            <NumberText
              value={makeRoundedBalance(fiatPercision, fiatTotal)}
              style={{...styles.fiatBalanceText, ...styles.fiatBalance}}
            />
            <Text style={styles.fiatBalanceText}>{props.fiat}</Text>
          </View>
        )}
      </View>
      {props.showControl && (
        <View style={styles.displayedSwitchContainer}>
          <Switch value={shown} onValueChange={onChangeSwitcher} />
        </View>
      )}
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
  },
  logo: {
    width: 36,
    height: 36,
  },
  col1: {
    justifyContent: 'center',
    flex: 2,
    maxWidth: Layout.isSmallDevice ? 138 : 168,
  },
  col2: {
    flex: 2,
    justifyContent: 'center',
  },
  logoPlaceholder: {
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    paddingRight: 8,
  },
  name: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.whiteOpacity,
    textAlignVertical: 'bottom',
  },
  displayedSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  displayedLabel: {
    color: theme.colors.mediumTransparent,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    alignItems: 'center',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  ticker: {
    flexDirection: 'row',
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.hardTransparent,
    textAlignVertical: 'bottom',
  },
  underNameRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  fiatBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  coinBalanceText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.whiteOpacity,
    textAlignVertical: 'bottom',
  },
  fiatBalance: {
    marginRight: 3,
  },
  coinBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fiatBalanceText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.hardTransparent,
    textAlignVertical: 'bottom',
  },
  coinBalance: {
    marginRight: 3,
  },
  nameTypeContainer: {
    flexDirection: 'row',
  },
  type: {
    marginRight: 8,
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 16,
    color: theme.colors.textLightGray1,
    textTransform: 'uppercase',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});

export default CoinsListElement;
