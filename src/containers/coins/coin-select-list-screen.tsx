import React, {useCallback} from 'react';
import useCoinsSelector, {useCoinsSelectorFilter} from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import {useNavigation, useRoute} from '@react-navigation/native';
import CoinSelectList, {CoinListElementData} from '../../components/coins/coins-select-list';
import Screen from '../../components/screen';
import useTranslation from '../../utils/use-translation';

export interface CoinSelectListScreenProps {
  nextScreen?: string;
  filter?: useCoinsSelectorFilter;
  balanceShown?: boolean;
}

export default function CoinSelectListScreen() {
  const {params} = useRoute();
  const {nextScreen, filter, balanceShown} = params as unknown as CoinSelectListScreenProps;
  if (!nextScreen) {
    throw new Error('Wrong coins routing');
  }

  const coins = useCoinsSelector(filter);

  const navigation = useNavigation();
  const {t} = useTranslation();

  const onElementPress = useCallback(
    (coin: CoinListElementData) => navigation.navigate(nextScreen, {coin: coin.id, ticker: coin.ticker}),
    [navigation],
  );

  return (
    <Screen title={t('Select coins')}>
      <CoinSelectList coins={coins} balanceShown={balanceShown} onElementPress={onElementPress} headerHidden={true} />
    </Screen>
  );
}
