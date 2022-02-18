import React, {useCallback, useMemo} from 'react';
import {useCurrencyService, useCurrencyLists} from '@slavi/wallet-core';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {useFiatSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import theme from '../../theme';
import SelectableList from '../../components/controls/selectable-list';
import mapArrayToSelectOptions from '../../utils/map-array-to-select-options';

const CurrencyScreen = () => {
  const service = useCurrencyService();
  const fiat = useFiatSelector();
  const {fiatList, isLoading} = useCurrencyLists();

  const onChange = useCallback((value: string) => service.setFiat(value),[service]);

  const options: Record<string, string> | undefined = useMemo(
    () => mapArrayToSelectOptions(fiatList), [fiatList]
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SelectableList onSelect={onChange} options={options} current={fiat}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.screenBackground,
  },
  content: {
    padding: 16,
  }
});

export default CurrencyScreen;
