import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import OperationsList from '../../components/operations/operations-list';
import useOperationsList from '@slavi/wallet-core/src/providers/ws/hooks/use-operations-list';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

const OperationsListScreen = () => {
  const {isLoading, operations, updateParams, getMore} = useOperationsList({});
  const fiat = useFiatSelector() || 'USD';
  const crypto = useCryptoSelector() || 'BTC';

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient {...theme.gradients.backgroundGradient} style={styles.gradient}>
        <OperationsList
          sections={operations}
          fiatTicker={fiat}
          cryptoTicker={crypto}
          onEndReached={getMore}
          filter={updateParams}
        />
        {isLoading && <ActivityIndicator />}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  }
});

export default OperationsListScreen;
