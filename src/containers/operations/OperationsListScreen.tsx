import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import OperationsList from '../../components/operations/operations-list';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import theme from '../../theme';

const OperationsListScreen = () => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({});
  const fiat = useFiatSelector() || 'USD';
  const crypto = useCryptoSelector() || 'BTC';

  return (
    <SafeAreaView style={styles.screen}>
      <OperationsList
        sections={operations}
        fiatTicker={fiat}
        cryptoTicker={crypto}
        onEndReached={getMore}
        filter={updateParams}
      />
      {isLoading && <ActivityIndicator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colorsOld.white,
    flex: 1,
  },
});

export default OperationsListScreen;
