import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FullFilterSection from './full-filter-section';
import useTranslation from '../../../utils/use-translation';
import {Text} from 'react-native';
import theme from '../../../theme';
import useCoinsSelector from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import FullFilterCoinList from './full-filter-coin-list';
import CoinsFilterModal from './coins-filter-modal';

export interface FullFilterCoinSectionProps {
  selectedCoins: string[];
  submitCoins: (coins: string[]) => void;
  visible: boolean;
}

const COIN_COUNT = 3;

const FullFilterCoinSection = (props: FullFilterCoinSectionProps) => {
  const {selectedCoins: initialSelectedCoins, submitCoins, visible} = props;

  const {t} = useTranslation();

  // TODO: change hook to useRecentCoins
  const coins = useCoinsSelector().slice(COIN_COUNT);

  const [coinModalShown, setCoinModalShown] = useState<boolean>(false);
  const [selectedCoins, setSelectedCoins] = useState<Record<string, boolean>>({});

  const hideCoinFilter = useCallback(() => setCoinModalShown(false), []);
  const showCoinFilter = useCallback(() => setCoinModalShown(true), []);
  const submitCoinFilter = useCallback(
    (_coins: string[]) => {
      setSelectedCoins(Object.fromEntries(_coins.map(coin => [coin, true])));
      submitCoins(_coins);
      hideCoinFilter();
    },
    [hideCoinFilter, submitCoins],
  );

  useEffect(() => {
    if (visible) {
      setSelectedCoins(Object.fromEntries(initialSelectedCoins.map(coin => [coin, true])));
    }
  }, [initialSelectedCoins, visible]);

  const onCoinPress = (coin: string) => {
    const plainSelected: string[] = [];
    Object.entries({
      ...selectedCoins,
      [coin]: !selectedCoins?.[coin],
    }).forEach(([key, value]) => {
      if (value) {
        plainSelected.push(key);
      }
    });
    submitCoins(plainSelected);
  };

  const showAllElement = (
    <TouchableOpacity onPress={showCoinFilter} style={styles.showAllElement}>
      <Text style={styles.showAllText}>{t('Show all')}</Text>
    </TouchableOpacity>
  );

  return visible ? (
    <FullFilterSection title={t('Coins')} rightHeaderElement={showAllElement}>
      <FullFilterCoinList coins={coins} onSelect={onCoinPress} selectedCoins={selectedCoins} />
      <CoinsFilterModal
        visible={coinModalShown}
        onCancel={hideCoinFilter}
        onSubmit={submitCoinFilter}
        selectedCoins={props.selectedCoins}
      />
    </FullFilterSection>
  ) : null;
};

const styles = StyleSheet.create({
  container: {},
  showAllElement: {},
  showAllText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: 0.01,
    fontSize: 12,
    lineHeight: 28,
    color: theme.colors.gold,
    textTransform: 'uppercase',
  },
});

export default FullFilterCoinSection;
