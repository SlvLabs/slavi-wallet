import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import BalanceHeader from '../../components/coin-list/balance-header';
import CoinListCard from '../../components/coin-list/coins-list-card';
import theme from '../../theme';
import {Icon} from 'react-native-elements';
import {ParamsItem} from '../../components/coin-list/search-params-button';
import useCoinsSelector, {
  DisplayCoinData,
} from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import useCoinsService from '@slavi/wallet-core/src/contexts/hooks/use-coins-service';
import useTotalBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-total-balance-hook';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import sortByField from '@slavi/wallet-core/src/utils/sort-objects-in-array-by-field';
import store from '@slavi/wallet-core/src/store/index';

enum filterKeys {
  HIDE_WITHOUT_BALANCE,
}

interface CoinFilter {
  name: string;
  function: (coins: DisplayCoinData[]) => DisplayCoinData[];
}

const CoinsListScreen = () => {
  const {t} = useTranslation();
  const coins = useCoinsSelector();
  const [filteredCoins, setFilteredCoins] = useState<DisplayCoinData[]>(coins);
  const [coinsToCard, setCoinsToCart] = useState<DisplayCoinData[]>(coins);
  const [nameSortDirection, setNameSortDirection] = useState(1);
  const [valueSortDirection, setValueSortDirection] = useState(0);
  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';
  const balance = useTotalBalance({fiat: fiat, crypto: crypto});
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [filters, setFilters] = useState<filterKeys[]>([]);
  const navigation = useNavigation();
  const coinService = useCoinsService();
  const onAddPress = () => {
    setAddClicked(!addClicked);
  };

  // TODO: remove magic numbers, maybe refactor logic of sort
  useEffect(() => {
    if (nameSortDirection === 1) {
      sortByField(filteredCoins, 'name', 0);
    } else if (valueSortDirection) {
      sortByField(filteredCoins, 'total', 1);
    }
    setCoinsToCart([...filteredCoins]);
  }, [filteredCoins, nameSortDirection, valueSortDirection]);

  const onShownChange = (id: string) => {
    let idx = coins.findIndex(coin => coin.id === id);
    coinService.update(id, undefined, !coins[idx].shown).then(res => {
      if (res) {
        coins[idx].shown = res.shown;
        const indexInToCard = coinsToCard.findIndex(
          el => el.name === coins[idx].name,
        );
        coinsToCard[indexInToCard].shown = res.shown;
        setCoinsToCart([...coinsToCard]);
      }
    });
  };

  const sortingMethods: ParamsItem[] = [
    {
      title: t('By name'),
      onPress: () => {
        setNameSortDirection(nameSortDirection === 0 ? 1 : 0);
        setValueSortDirection(0);
      },
      icon: <Icon type="material" name="label" color={theme.colorsOld.pink} />,
    },
    {
      title: t('By btc value'),
      onPress: () => {
        setValueSortDirection(valueSortDirection === 0 ? 1 : 0);
        setNameSortDirection(0);
      },
      icon: <Icon type="font-awesome" name="btc" color={theme.colorsOld.pink} />,
    },
  ];

  const filterImplementations: Record<filterKeys, CoinFilter> = useMemo(
    () => ({
      [filterKeys.HIDE_WITHOUT_BALANCE]: {
        name: t('Hide without balance'),
        function: (_coins: DisplayCoinData[]) =>
          _coins.filter(coin => coin.total && coin.total !== '0'),
      },
    }),
    [t],
  );

  const filtrationMethods: ParamsItem[] = [
    {
      title: filterImplementations[filterKeys.HIDE_WITHOUT_BALANCE].name,
      onPress: () => setFilters([...filters, filterKeys.HIDE_WITHOUT_BALANCE]),
      icon: (
        <Icon type="font-awesome-5" name="coins" color={theme.colorsOld.pink} />
      ),
    },
  ];

  const onCoinPress = useCallback(
    (id: string) => {
      navigation.navigate(ROUTES.COINS.INFO, {coin: id});
    },
    [navigation],
  );

  const removeFilter = (tag: filterKeys) => {
    setFilters(filters.filter(element => element !== tag));
  };

  useEffect(() => {
    let _filteredCoins = coins;
    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        const filteredFunction = filterImplementations[filter].function;
        _filteredCoins = filteredFunction(_filteredCoins);
      });
    }

    setFilteredCoins(_filteredCoins);
  }, [coins, filterImplementations, filters]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BalanceHeader
          fiatBalance={balance.fiat}
          fiatTicker={fiat}
        />
        <CoinListCard
          containerStyle={styles.coinsCard}
          sortingMethods={sortingMethods}
          filtrationMethods={filtrationMethods}
          coins={coinsToCard}
          onElementPress={onCoinPress}
          onAddPress={onAddPress}
          addClicked={addClicked}
          onShownChange={onShownChange}
          filtrationTags={filters.map(filter => ({
            name: filterImplementations[filter].name,
            key: filter,
          }))}
          onFilterRemove={removeFilter}
          fiat={fiat}
          crypto={crypto}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark,
    flex: 1,
  },
  coinsCard: {
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CoinsListScreen;
