import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import OperationsList from '../../operations/operations-list';

export interface HistoryViewProps {
  coin: string;
}

const HistoryView = (props: HistoryViewProps) => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({
    coins: [props.coin],
  });
  const fiat = useFiatSelector() || 'USD';
  const crypto = useCryptoSelector() || 'BTC';

  return (
    <View style={styles.container}>
      <OperationsList
        sections={operations}
        fiatTicker={fiat}
        cryptoTicker={crypto}
        onEndReached={getMore}
        filter={updateParams}
        placeholderStyle={styles.placeholder}
      />
      {isLoading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  placeholder: {
    paddingTop: 50,
  }
});

export default HistoryView;
