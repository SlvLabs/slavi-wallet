import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import AlertRow from '../../components/error/alert-row';
import useAddUserToken from '@slavi/wallet-core/src/providers/ws/hooks/use-add-user-token';
import ParentCoinSelect from './parent-coin-select';
import {useCoinPatternService} from '@slavi/wallet-core';

export interface TokenAddingFormProps {
  containerStyle?: ViewStyle;
  addressStyle?: ViewStyle;
  submitStyle?: ViewStyle;
  errorStyle?: ViewStyle;
}

const ADDRESS_ERROR = 'Invalid address';
const ERROR = 'Something went wrong. Please try again later or contact support';

const TokenAddingForm = (props: TokenAddingFormProps) => {
  const {t} = useTranslation();
  const [address, setAddress] = useState<string>();
  const [addressError, setAddressError] = useState<string>('');
  const [coin, setCoin] = useState<string>();
  const [error, setError] = useState<string>();
  const addingState = useAddUserToken();
  const coinPatternService = useCoinPatternService();

  useEffect(() => {
    if (!coin) {
      return;
    }
    const addressValidator = coinPatternService.getAddressValidatorByCoin(coin);

    if (address && !addressValidator.validate(address, coin)) {
      setAddressError(t(ADDRESS_ERROR));
    }
  }, [address, coin, coinPatternService, t]);

  useEffect(() => {
    if (addingState.messages?.address) {
      setAddressError(addingState.messages.address.join(','));
    }
  }, [addingState.messages]);

  useEffect(() => {
    // схлапываем все ненужные юзеру ошибки, все ровно поправить не может
    if (
      addingState.error ||
      (addingState.errors && Object.keys(addingState.errors).length > 0) ||
      addingState.messages?.coin
    ) {
      setError(t(ERROR));
    }
  }, [addingState.error, addingState.errors, addingState.messages, t]);

  const onSubmit = () => {
    if (coin && address) {
      addingState.add(coin, address);
    }
  };

  const onChangeAddress = (_address: string) => {
    setAddressError('');
    setAddress(_address);
  };

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <ParentCoinSelect onValueChange={setCoin} />
      <Input
        onChangeText={onChangeAddress}
        label={t('Contract address')}
        value={address}
        style={{...styles.addressInput, ...props.addressStyle}}
        errorMessage={addressError}
      />
      {!!error && (
        <View style={{...styles.errorContainer, ...props.errorStyle}}>
          <AlertRow text={error} />
        </View>
      )}
      <Button
        title={t('Add')}
        style={{...styles.submit, ...props.submitStyle}}
        loading={addingState.isLoading}
        onPress={onSubmit}
        disabled={!!addressError || !!error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  addressInput: {},
  submit: {},
  errorContainer: {},
});

export default TokenAddingForm;
