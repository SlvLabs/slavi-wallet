import {ActivityIndicator, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import usePricePairsList from '@slavi/wallet-core/src/providers/ws/hooks/use-price-pairs-list';
import PricePairsList from '../../components/price-pairs/price-pairs-list';

export interface PricePairsViewProps {
  coin: string;
}
const PricePairsView = (props: PricePairsViewProps) => {
  const coin = props.coin;

  const {
    state: {list, isLoading},
    request,
  } = usePricePairsList(coin);

  useEffect(() => {
    request();
  }, [request]);

  return (
    <ScrollView>
      {isLoading ? <ActivityIndicator /> : <PricePairsList elements={list} />}
    </ScrollView>
  );
};

export default PricePairsView;
