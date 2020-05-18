import React, {useState} from 'react';
import {useCurrencyService, useCurrencyLists} from '@slavi/wallet-core';
import {ActivityIndicator, Button, SafeAreaView, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useTranslation} from 'react-i18next';
import {
  useCryptoSelector,
  useFiatSelector,
} from '@slavi/wallet-core/src/store/modules/currency/selectors';

const CurrencyScreen = () => {
  const {t} = useTranslation();
  const service = useCurrencyService();
  const startFiat = useFiatSelector();
  const startCrypto = useCryptoSelector();
  const [fiat, setFiat] = useState<string>(useFiatSelector() || '');
  const [crypto, setCrypto] = useState<string>(useCryptoSelector() || '');
  const {fiatList, cryptoList, isLoading} = useCurrencyLists();
  const onChangeFiat = (newFiat: string) => {
    setFiat(newFiat);
  };
  const onChangeCrypto = (newCrypto: string) => {
    setCrypto(newCrypto);
  };
  const onConfirm = () => {
    if (fiat !== startFiat) {
      service.setFiat(fiat);
    }
    if (crypto !== startCrypto) {
      service.setCrypto(crypto);
    }
  };
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView>
      {fiatList && (
        <Picker
          selectedValue={fiat}
          onValueChange={itemValue => onChangeFiat(itemValue as string)}>
          {fiatList.map(val => (
            <Picker.Item label={val} value={val} key={val} />
          ))}
        </Picker>
      )}
      {cryptoList && (
        <Picker
          selectedValue={crypto}
          onValueChange={itemValue => onChangeCrypto(itemValue as string)}>
          {cryptoList.map(val => (
            <Picker.Item label={val} value={val} key={val} />
          ))}
        </Picker>
      )}
      <Button onPress={onConfirm} title={t('Confirm')} />
    </SafeAreaView>
  );
};

export default CurrencyScreen;
