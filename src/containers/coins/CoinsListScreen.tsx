import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import BalanceHeader from '../../components/coin-list/balance-header';
import CoinListCard from '../../components/coin-list/coins-list-card';
import theme from '../../theme';
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

const CoinsListScreen = () => {
  const {t} = useTranslation();
  const coins = useCoinsSelector();
  // TODO: research
  const [filteredCoins, setFilteredCoins] = useState<DisplayCoinData[]>(coins);
  const [coinsToCard, setCoinsToCart] = useState<DisplayCoinData[]>(coins);
  const [nameSortDirection, setNameSortDirection] = useState(1);
  const [valueSortDirection, setValueSortDirection] = useState(0);
  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';
  const balance = useTotalBalance({fiat: fiat, crypto: crypto});
  const [addClicked, setAddClicked] = useState<boolean>(false);
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
      isActive: !!nameSortDirection,
    },
    {
      title: t('By btc value'),
      onPress: () => {
        setValueSortDirection(valueSortDirection === 0 ? 1 : 0);
        setNameSortDirection(0);
      },
      isActive: !!valueSortDirection,
    },
  ];

  const onCoinPress = useCallback(
    (id: string) => {
      navigation.navigate(ROUTES.COINS.INFO, {coin: id});
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <BalanceHeader
          fiatBalance={balance.fiat}
          fiatTicker={fiat}
        />
        <CoinListCard
          containerStyle={styles.coinsCard}
          sortingMethods={sortingMethods}
          coins={coinsToCard}
          onElementPress={onCoinPress}
          onAddPress={onAddPress}
          addClicked={addClicked}
          onShownChange={onShownChange}
          fiat={fiat}
          crypto={crypto}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    flex: 1,
  },
  coinsCard: {
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CoinsListScreen;
