import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {Reducer, useCallback, useEffect, useReducer, useState} from 'react';
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

enum CoinsSortType {
  name,
  value,
  priority,
}

interface CoinsSortParams {
  field: string,
  direction: number,
}

const coinsSorts: Record<CoinsSortType, CoinsSortParams> = {
  [CoinsSortType.name]: {
    field: 'name',
    direction: 0,
  },
  [CoinsSortType.value]: {
    field: 'value',
    direction: 1,
  },
  [CoinsSortType.priority]: {
    field: 'priority',
    direction: 1,
  }
}

interface CoinsState {
  coins: DisplayCoinData[];
  sort: CoinsSortType,
}

enum CoinsActionType {
  updateCoins,
  sortCoins
}

type CoinsAction =
  { type: CoinsActionType.updateCoins, coins: DisplayCoinData[]} |
  { type: CoinsActionType.sortCoins, sort: CoinsSortType};

const CoinsUpdateAction = (coins: DisplayCoinData[]): CoinsAction => ({
  type: CoinsActionType.updateCoins,
  coins: coins,
});

const CoinsSortAction = (sort: CoinsSortType): CoinsAction => ({
  type: CoinsActionType.sortCoins,
  sort: sort,
});

type CoinsReducer = Reducer<CoinsState, CoinsAction>;

const initialCoinsState: CoinsState = {
  coins: [],
  sort: CoinsSortType.priority,
}

const coinsReducer: CoinsReducer = (state, action) =>{
  switch (action.type) {
    case CoinsActionType.updateCoins: {
      const sort = coinsSorts[state.sort];
      const coins = [...action.coins];
      sortByField(coins, sort.field as keyof DisplayCoinData, sort.direction);
      return {
        ...state,
        coins: coins,
      };
    }
    case CoinsActionType.sortCoins: {
      const sort = coinsSorts[action.sort];
      const coins = [...state.coins];
      sortByField(coins, sort.field as keyof DisplayCoinData, sort.direction);
      return {
        sort: action.sort,
        coins: coins,
      };
    }
    default: {
      throw new Error('Unknown coins reducer action');
    }
  }
}

const CoinsListScreen = () => {
  const {t} = useTranslation();
  const coins = useCoinsSelector();
  const [coinsToCardState, dispatchCoinsToCard] = useReducer<CoinsReducer>(coinsReducer, initialCoinsState);
  const fiat = store.useFiatSelector() || 'BTC';
  const crypto = store.useCryptoSelector() || 'USD';
  const balance = useTotalBalance({fiat: fiat, crypto: crypto});
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const navigation = useNavigation();
  const coinService = useCoinsService();
  const onAddPress = () => {
    setAddClicked(!addClicked);
  };

  useEffect(() => {
    dispatchCoinsToCard(CoinsUpdateAction(coins));
  }, [coins, dispatchCoinsToCard]);

  //TODO: test it
  const onShownChange = (id: string) => {
    let idx = coins.findIndex(coin => coin.id === id);
    coinService.update(id, undefined, !coins[idx].shown);
  };

  const sortingMethods: ParamsItem[] = [
    {
      title: t('Default'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.priority));
      },
      isActive: coinsToCardState.sort === CoinsSortType.priority,
    },
    {
      title: t('By name'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.name));
      },
      isActive: coinsToCardState.sort === CoinsSortType.name,
    },
    {
      title: t('By btc value'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.value));
      },
      isActive: coinsToCardState.sort === CoinsSortType.value,
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
          coins={coinsToCardState.coins}
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
