import React, {useCallback, useMemo} from 'react';
import {useCurrencyService, useCurrencyLists} from '@slavi/wallet-core';
import {ActivityIndicator, View} from 'react-native';
import {useFiatSelector} from '@slavi/wallet-core/src/store/modules/currency/selectors';
import SelectableList from '../../components/controls/selectable-list';
import mapArrayToSelectOptions from '../../utils/map-array-to-select-options';
import Screen from '../../components/screen';
import useTranslation from '../../utils/use-translation';

const CurrencyScreen = () => {
  const service = useCurrencyService();
  const fiat = useFiatSelector();
  const {fiatList, isLoading} = useCurrencyLists();

  const {t} = useTranslation();

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
    <Screen title={t('Currency')}>
      <SelectableList onSelect={onChange} options={options} current={fiat}/>
    </Screen>
  );
};


export default CurrencyScreen;
