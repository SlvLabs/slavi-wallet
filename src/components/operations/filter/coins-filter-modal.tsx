import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import useCoinsSelector, {DisplayCoinData} from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import FullScreenModal from '../../modal/full-screen-modal';
import useTranslation from '../../../utils/use-translation';
import FullFilterCoinList from './full-filter-coin-list';
import SearchInput from '../../controls/search-input';
import theme from '../../../theme';

export interface CoinsFilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (coins: string[]) => void;
  selectedCoins: string[];
}

const CoinsFilterModal = (props: CoinsFilterModalProps) => {
  const {selectedCoins: initialSelectedCoins, onSubmit, visible} = props;

  const {t} = useTranslation();

  const coins = useCoinsSelector();

  const [filter, setFilter] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<DisplayCoinData[]>(coins);
  const [selectedCoins, setSelectedCoins] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (visible) {
      setSelectedCoins(Object.fromEntries(initialSelectedCoins.map(coin => [coin, true])));
    }
  }, [initialSelectedCoins, visible]);

  useEffect(() => {
    if (filter) {
      setFilteredCoins(
        coins.filter(
          element =>
            element.name.search(new RegExp(filter, 'i')) !== -1 ||
            element.ticker.search(new RegExp(filter, 'i')) !== -1,
        ),
      );
    } else {
      setFilteredCoins(coins);
    }
  }, [filter, coins]);

  const submit = useCallback(() => {
    const selected: string[] = [];
    Object.entries(selectedCoins).forEach(([key, value]) => {
      if (value) {
        selected.push(key);
      }
    });
    onSubmit(selected);
  }, [onSubmit, selectedCoins]);

  const onCoinPress = useCallback((coin: string) => {
    setSelectedCoins(p => ({
      ...p,
      [coin]: !p?.[coin],
    }));
  }, []);

  return (
    <FullScreenModal
      visible={visible}
      onCancel={props.onCancel}
      title={t('Select coins')}
      rightIconName={'check'}
      rightIconOnPress={submit}
      rightIconColor={theme.colors.green}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
        <SearchInput
          containerStyle={styles.search}
          placeholder={t('Search...')}
          onChange={setFilter}
          value={filter}
          inputContainerStyle={styles.searchInputStyle}
        />
        <FullFilterCoinList
          coins={filteredCoins}
          containerStyle={styles.coinList}
          onSelect={onCoinPress}
          selectedCoins={selectedCoins}
        />
      </ScrollView>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  container: {},
  search: {
    margin: 16,
  },
  searchInputStyle: {
    backgroundColor: theme.colors.grayDark,
  },
  coinList: {
    margin: 16,
  },
});

export default CoinsFilterModal;
