import SearchCoinRow from './search-coin-row';
import React, {Reducer, useCallback, useEffect, useReducer, useState} from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import {ParamsItem} from './search-params-button';
import {CoinDisplayData} from './coins-list-element';
import CoinsList, {showCoinsEnum} from './coins-list';
import searcher from '@slavi/wallet-core/src/utils/search-in-arrays-of-object-by-string-field';
import TokenAddButton from '../../containers/token/token-add-button';
import OutlineButton from '../buttons/outline-button';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import useCoinsSelector, {DisplayCoinData} from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import {useNavigation, useRoute} from '@react-navigation/native';
import useCoinsService from '@slavi/wallet-core/src/contexts/hooks/use-coins-service';
import useCoinSortingProvider from '@slavi/wallet-core/src/contexts/hooks/use-coin-sorting-provider';
import sortByField, {Comparator} from '@slavi/wallet-core/src/utils/sort-objects-in-array-by-field';
import ROUTES from '../../navigation/config/routes';
import store from '@slavi/wallet-core/src/store/index';
import {useFiatSymbolSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';

export interface CoinsListCardProps {
  containerStyle: ViewStyle;
}

enum CoinsSortType {
  name,
  value,
  priority,
}

interface CoinsSortParams {
  field: string,
  direction: number,
  comparator?: Comparator<any>,
}

const coinsSorts: Record<CoinsSortType, CoinsSortParams> = {
  [CoinsSortType.name]: {
    field: 'name',
    direction: 0,
  },
  [CoinsSortType.value]: {
    field: 'fiatTotal',
    direction: 1,
    comparator: (a: DisplayCoinData, b: DisplayCoinData) => {
      if (+a.fiatTotal === +b.fiatTotal) {
        if(+a.total > +b.total) return -1;
        else if(+a.total < +b.total) return 1;
        return 0;
      }
      else if (+a.fiatTotal > +b.fiatTotal) return -1;
      else return 1;
    },
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

const coinsReducer: CoinsReducer = (state, action) =>{
  switch (action.type) {
    case CoinsActionType.updateCoins: {
      const sort = coinsSorts[state.sort];
      const coins = [...action.coins];
      sortByField(coins, sort.field as keyof DisplayCoinData, sort.direction, sort.comparator);
      return {
        ...state,
        coins: coins,
      };
    }
    case CoinsActionType.sortCoins: {
      const sort = coinsSorts[action.sort];
      const coins = [...state.coins];
      sortByField(coins, sort.field as keyof DisplayCoinData, sort.direction, sort.comparator);
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

const CoinListCard = (props: CoinsListCardProps) => {
  const {containerStyle} = props;

  const {t} = useTranslation();
  const coins = useCoinsSelector();
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();
  const coinService = useCoinsService();
  const sortingProvider = useCoinSortingProvider();
  const fiat = store.useFiatSelector() || 'USD';
  const crypto = store.useCryptoSelector() || 'BTC';
  const fiatSymbol = useFiatSymbolSelector() || '$';

  const [coinsToList, setCoinsToList] = useState<CoinDisplayData[]>([]);
  const [search, setSearch] = useState<string>('');

  const [coinsToCardState, dispatchCoinsToCard] = useReducer<CoinsReducer>(coinsReducer, {
    coins: [],
    sort: sortingProvider.get(),
  });

  const onAddPress = () => {
    setAddClicked(!addClicked);
  };

  useEffect(() => {
    dispatchCoinsToCard(CoinsUpdateAction(coins));
  }, [coins, dispatchCoinsToCard]);

  const onShownChange = useCallback((id: string) => coinService.changeShown(id), [coinService]);

  const sortingMethods: ParamsItem[] = [
    {
      title: t('Default'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.priority));
        sortingProvider.set(CoinsSortType.priority);
      },
      isActive: coinsToCardState.sort === CoinsSortType.priority,
    },
    {
      title: t('By name'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.name));
        sortingProvider.set(CoinsSortType.name);
      },
      isActive: coinsToCardState.sort === CoinsSortType.name,
    },
    {
      title: t('By value'),
      onPress() {
        dispatchCoinsToCard(CoinsSortAction(CoinsSortType.value));
        sortingProvider.set(CoinsSortType.value);
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

  useEffect(() => {
    if((route.params as any)?.hideAdd) {
      setAddClicked(false)
    }
  }, [(route.params as any)?.hideAdd])

  useEffect(() => {
    if (search.length > 0) {
      const newList: CoinDisplayData[] = searcher(
        coinsToCardState.coins,
        ['name', 'ticker'],
        search,
      );
      setCoinsToList(newList);
    } else {
      setCoinsToList(coinsToCardState.coins);
    }
  }, [coinsToCardState.coins, search]);

  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);

  const resetList = useCallback(() => {
    clearSearch();
    if (addClicked) {
      onAddPress();
    }
  }, [addClicked, clearSearch, onAddPress]);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <SearchCoinRow
        search={search}
        onSearch={setSearch}
        sortingMethods={sortingMethods}
        onAddPress={onAddPress}
        onClear={clearSearch}
      />
      <CoinsList
        onShownChange={onShownChange}
        coins={coinsToList}
        onElementPress={onCoinPress}
        toShow={
          search.length > 0
            ? showCoinsEnum.all
            : addClicked
            ? showCoinsEnum.onlyNotShown
            : showCoinsEnum.onlyShown
        }
        fiat={fiat}
        crypto={crypto}
        fiatSymbol={fiatSymbol}
      />
      {(addClicked || search.length > 0) && (
        <View style={styles.buttonContainer}>
          <TokenAddButton />
          <OutlineButton
            title={t('Show all coins')}
            containerStyle={styles.bottomButton}
            onPress={resetList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get('window').height - 294,
    backgroundColor: theme.colors.screenBackground,
  },
  buttonContainer: {
    padding: 16,
  },
  bottomButton: {
    marginTop: 8,
  },
});

export default CoinListCard;
