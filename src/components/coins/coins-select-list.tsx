import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SimpleInput from '../controls/simple-input';
import theme from '../../theme';
import CustomIcon from '../custom-icon/custom-icon';
import SimpleCoinListElement from './simple-coin-list-element';
import useTranslation from '../../utils/use-translation';
import {useFiatSelector, useRates} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import Layout from '../../utils/layout';

export interface CoinListElementData {
  id: string;
  name: string;
  ticker: string;
  logo?: string;
  type?: string;
  total?: string;
}

export interface CoinsSelectListProps {
  coins: CoinListElementData[];
  onElementPress: (coinId: string) => void;
  balanceShown?: boolean;
}

export default function CoinSelectList(props: CoinsSelectListProps) {
  const {coins, onElementPress, balanceShown} = props;

  const [search, setSearch] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<CoinListElementData[]>(coins);

  const {t} = useTranslation();

  const fiatTicker = useFiatSelector();
  const rates = useRates();

  useEffect(() => setFilteredCoins(coins.filter(element =>
    element.name.toLowerCase().includes(search.toLowerCase()) ||
    element.ticker.toLowerCase().includes(search.toLowerCase())
  )), [search, coins]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SimpleInput
          value={search}
          onChange={setSearch}
          placeholder={t('Search...')}
          inputContainerStyle={styles.inputContainer}
          placeholderTextColor={theme.colors.textLightGray3}
          inputStyle={styles.input}
          iconLeft={true}
          icon={<CustomIcon name={'search'} size={22} color={theme.colors.textLightGray1}
          />}
        />
      </View>
      <ScrollView style={styles.scroll}>
        {filteredCoins.map((item, index) => (
          <SimpleCoinListElement
            name={item.name}
            type={item.type}
            logo={item.logo}
            onPress={() => onElementPress(item.id)}
            key={`coin_${index}`}
            balance={item.total}
            ticker={item.ticker}
            fiatBalance={typeof rates[`${item.id}-${fiatTicker}`] !== 'undefined' && item.total ? '' + ((+item.total) * rates[`${item.id}-${fiatTicker}`]) : undefined}
            fiatTicker={fiatTicker}
            shownBalances={balanceShown}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: theme.colors.grayDark,
  },
  input: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.textLightGray1,
  },
  scroll: {
    height: Layout.window.height - 220,
  },
});
