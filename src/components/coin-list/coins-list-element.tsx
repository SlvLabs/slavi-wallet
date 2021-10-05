import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Image, Text} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';
import getImageSource from '../../utils/get-image-source';
import CoinType from '@slavi/wallet-core/src/utils/coin-types';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import PriceWithChange from './price-with-change';

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
  showElement: boolean;
  showControl: boolean;
  onPress(): void;
  onShownChange(ticker: string): void;
}

const cryptoPercision = 4;
const fiatPercision = 2;

const CoinsListElement = (props: CoinListElementProps) => {
  const {t} = useTranslation();
  const {
    name,
    total,
    fiatTotal,
    ticker,
    shown,
    logo,
    id,
    fiatPriceChange,
    fiatPrice
  } = props.data;

  const onChangeSwitcher = useCallback(() => {
    props.onShownChange(id);
  },[]);

  const priceChange = useMemo(() => +(fiatPriceChange || 0), []);

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
        <Text style={styles.name}>{name}</Text>
        <View style={styles.underNameRow}>
          <Text style={styles.ticker}>{ticker}</Text>
          <PriceWithChange
            price={fiatPrice || 0}
            currency={'$'}          // TODO: receive from backend
            change={priceChange}
          />
        </View>
      </View>
      <View style={styles.col2}>
        <View style={styles.fiatBalanceRow}>
          <Text style={{...styles.fiatBalanceText, ...styles.fiatBalance}}>
            {makeRoundedBalance(fiatPercision, fiatTotal)}
          </Text>
          <Text style={styles.fiatBalanceText}>{props.fiat}</Text>
        </View>
        <View style={styles.coinBalanceRow}>
          <Text style={{...styles.coinBalanceText, ...styles.coinBalance}}>
            {makeRoundedBalance(cryptoPercision, total)}
          </Text>
          <Text style={styles.coinBalanceText}>{ticker}</Text>
        </View>
      </View>
      {props.showControl && (
        <View style={styles.displayedSwitchContainer}>
          <Text style={styles.displayedLabel}>{t('Displayed')}:</Text>
          <Switch value={shown} onValueChange={onChangeSwitcher} />
        </View>
      )}
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.mediumTransparent,
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
    flex: 1,
  },
  col2: {
    flex: 2,
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
  fiatBalanceText: {
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
  coinBalanceText: {
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
  }
});

export default CoinsListElement;
