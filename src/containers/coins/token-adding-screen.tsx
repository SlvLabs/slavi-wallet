import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';
import AlertRow from '../../components/error/alert-row';
import useTranslation from '../../utils/use-translation';
import useAddUserToken from '@slavi/wallet-core/src/providers/ws/hooks/use-add-user-token';
import {useCoinPatternService, useGetParentCoins} from '@slavi/wallet-core';
import SimpleSelect from '../../components/controls/simple-select';
import SolidButton from '../../components/buttons/solid-button';
import InsertableInput from '../../components/controls/insertable-input';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import Screen from '../../components/screen';

const TokenAddingScreen = () => {
  const [address, setAddress] = useState<string>();
  const [addressError, setAddressError] = useState<string>('');
  const [coin, setCoin] = useState<string>();
  const [error, setError] = useState<string>();

  const {t} = useTranslation();
  const navigation = useNavigation();

  const addingState = useAddUserToken();
  const coinPatternService = useCoinPatternService();
  const {coins} = useGetParentCoins();

  const coinOptions = useMemo(
    () =>
      coins?.reduce((acc: Record<string, string>, element) => {
        acc[element.id] = element.networkName || element.name;
        return acc;
      }, {}),
    [coins],
  );

  useEffect(() => {
    if (!coin) {
      return;
    }
    const addressValidator = coinPatternService.getAddressValidatorByCoin(coin);

    if (address && !addressValidator.validate(address, coin, {isForTokenAdd: true})) {
      setAddressError(t('Invalid address'));
    }
  }, [address, coin, coinPatternService, t]);

  useEffect(() => {
    if (addingState.messages?.address) {
      setAddressError(addingState.messages.address.join(','));
    }
  }, [addingState.messages]);

  useEffect(() => {
    if (
      addingState.error ||
      (addingState.errors && Object.keys(addingState.errors).length > 0) ||
      addingState.messages?.coin
    ) {
      setError(t('Something went wrong. Please try again later or contact support'));
    }
  }, [addingState.error, addingState.errors, addingState.messages, t]);

  useEffect(() => {
    if (!addingState.isLoading && addingState.success) {
      navigation.navigate(ROUTES.COINS.LIST, {hideAdd: true});
    }
  }, [navigation, addingState.success, addingState.isLoading]);

  const tmpAdd = addingState.add;
  const onSubmit = useCallback(() => {
    if (coin && address) {
      tmpAdd(coin, address);
    }
  }, [coin, address, tmpAdd]);

  const onChangeAddress = (_address: string) => {
    setAddressError('');
    setError('');
    setAddress(_address);
  };

  const onChangeCoin = (_coin: string) => {
    setAddressError('');
    setError('');
    setCoin(_coin);
  };

  return (
    <Screen title={t('Add token')}>
      <View style={styles.textBlock}>
        <Text style={styles.description}>
          {t('You can add a token that is missing in our wallet.') +
            '\n' +
            t('To do this, select the blockchain that owns the token and specify the address of the contract')}
        </Text>
      </View>
      <SimpleSelect onSelect={onChangeCoin} options={coinOptions} value={coin} label={t('Parent coin')} />
      <InsertableInput
        onChange={onChangeAddress}
        label={t('Contract address')}
        value={address}
        errorMessage={addressError}
      />
      {!!error && (
        <View style={styles.errorContainer}>
          <AlertRow text={error} />
        </View>
      )}
      <SolidButton
        title={t('Add')}
        containerStyle={styles.submitContainer}
        loading={addingState.isLoading}
        onPress={onSubmit}
        disabled={!!addressError || !!error}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  addressInput: {},
  submitContainer: {
    marginTop: 18,
  },
  errorContainer: {},
  textBlock: {
    marginBottom: 30,
    marginTop: 30,
  },
  description: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
});

export default TokenAddingScreen;
