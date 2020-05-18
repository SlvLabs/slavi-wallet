import SearchCoinRow, {FilterTag} from './search-coin-row';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ParamsItem} from './search-params-button';
import {CoinDisplayData} from './coins-list-element';
import CoinsList, {showCoinsEnum} from './coins-list';
import searcher from '@slavi/wallet-core/src/utils/search-in-arrays-of-object-by-string-field';
import TokenAddButton from '../../containers/token/token-add-button';
import OutlineButton from '../buttons/outline-button';
import {useTranslation} from 'react-i18next';

export interface CoinsListCardProps {
  containerStyle: ViewStyle;
  sortingMethods: ParamsItem[];
  filtrationMethods: ParamsItem[];
  coins: CoinDisplayData[];
  addClicked: boolean;
  onAddPress(): void;
  onElementPress(ticker: string): void;
  onShownChange(ticker: string): void;
  filtrationTags: FilterTag[];
  onFilterRemove: (tag: any) => void;
  fiat: string;
  crypto: string;
}

const CoinListCard = (props: CoinsListCardProps) => {
  const {t} = useTranslation();
  const {
    containerStyle,
    sortingMethods,
    coins,
    onElementPress,
    onAddPress,
    addClicked,
    filtrationMethods,
  } = props;
  const [coinsToList, setCoinsToList] = useState<CoinDisplayData[]>(coins);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (search.length > 0) {
      const newList: CoinDisplayData[] = searcher(
        coins,
        ['name', 'ticker'],
        search,
      );
      setCoinsToList(newList);
    } else {
      setCoinsToList(coins);
    }
  }, [coins, search]);

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
        filtrationMethods={filtrationMethods}
        onAddPress={onAddPress}
        filtrationTags={props.filtrationTags}
        onFilterRemove={props.onFilterRemove}
        onClear={clearSearch}
      />
      <CoinsList
        onShownChange={props.onShownChange}
        coins={coinsToList}
        onElementPress={onElementPress}
        toShow={
          search.length > 0
            ? showCoinsEnum.all
            : addClicked
            ? showCoinsEnum.onlyNotShown
            : showCoinsEnum.onlyShown
        }
        fiat={props.fiat}
        crypto={props.crypto}
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
  container: {},
  buttonContainer: {
    padding: 16,
  },
  bottomButton: {
    paddingTop: 8,
  },
});

export default CoinListCard;
