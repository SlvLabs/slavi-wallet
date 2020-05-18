import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import OperationsList from '../../operations/operations-list';
import useCoinsForSelect from '@slavi/wallet-core/src/store/modules/coins/use-coins-for-select';

export interface HistoryViewProps {
  coin: string;
}

const HistoryView = (props: HistoryViewProps) => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({
    coin: props.coin,
  });
  const fiat = useFiatSelector() || 'USD';
  const crypto = useCryptoSelector() || 'BTC';

  const coins = useCoinsForSelect(elements =>
    elements.filter(element => element.id === props.coin),
  );

  return (
    <View style={styles.container}>
      <OperationsList
        sections={operations}
        fiatTicker={fiat}
        cryptoTicker={crypto}
        onEndReached={getMore}
        filter={updateParams}
        coins={coins}
      />
      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HistoryView;
