import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {NftInfoRouteProps} from '../../navigation/CoinsStack';
import Layout from '../../utils/layout';
import useNftInfo from '@slavi/wallet-core/src/providers/ws/hooks/nft/use-nft-info';
import Spinner from '../../components/spinner';
import SolidButton from '../../components/buttons/solid-button';
import useTranslation from '../../utils/use-translation';
import RecipientInput from '../../components/coin-send/recipient-input';
import IncrementableDecimalInput from '../../components/controls/incrementable-decimal-input';
import theme from '../../theme';
import useQrReader from '../../utils/use-qr-reader';
import {QrData} from '@slavi/wallet-core/src/utils/qr';
import ScreenHeader from '../../components/screen-header';
import {useAddressesService, useCoinPatternService} from '@slavi/wallet-core';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import {_TxCreatingResult} from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import NftConfirmation from '../../components/nft/nft-confirmation';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import NftImage from '../../components/nft/nft-image';
import {Decimal80} from '@slavi/wallet-core/src/utils/prepared-decimal';
import except from '@slavi/wallet-core/src/utils/typed-error/except';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';

export default function NftSendScreen() {
  const route = useRoute<NftInfoRouteProps>();
  const {id, contract, network} = route.params;

  const [address, setAddress] = useState<string|undefined>();
  const [amount, setAmount] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>();
  const [tx, setTx] = useState<_TxCreatingResult>();
  const [confModalIsVisible, setConfModalIsVisible] = useState<boolean>(true);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const addressService = useAddressesService();
  const patternService = useCoinPatternService();

  const pattern = useMemo(() =>
    patternService.createEthPattern(network, addressService.getGetterDelegate(network)),
    [patternService]
  );

  const addressValidator = useMemo(
    () => patternService.getAddressValidatorByCoin(network),
    [network, patternService]
  );

  const {isLoading, error, data} = useNftInfo(network, contract, id);

  const onReadQr = useCallback((data: QrData) => {
    !!data.address && setAddress(data.address);
    !!data.amount && setAmount(data.amount);
  }, []);

  const {showModal, modal} = useQrReader({onRead: onReadQr, coin: network});

  const validateAmount = useCallback(() => {
    if(data?.type === 'ERC-721') {
      return true;
    }

    if(!data?.amount || (amount && (new Decimal80(amount)).greaterThan(data?.amount))) {
      setGeneralError(t('nftNotEnough'));
      return false;
    }

    return true;
  }, [data, amount, t]);

  const validateAddress = useCallback(() => {
    if(address && !addressValidator.validate(address, network)) {
      setGeneralError(t('nftNotValidAddress'));
      return false;
    }
    return true;
  }, [address, addressValidator, network, t]);

  const validate = useCallback(() => {
    return validateAddress() && validateAmount();
  }, [validateAddress, validateAmount]);

  const onContinuePress = useCallback(() => {
    const f = async () => {
      if(isLoading || !data || loading) {
        return;
      }

      if(!validate()) {
        return;
      }

      setLoading(true);
      try {
        const result = await pattern.transferNft(
          address!,
          {
            contract: contract,
            id: data.id,
            type: data.type,
            owner: data.owner
          },
          amount,
          {
            transactionPriority: TransactionPriority.average,
          }
        );

        setTx(result);
        setConfModalIsVisible(true);
      } catch (e) {
        const err = except<InsufficientFunds>(InsufficientFunds, e);
        if (err) {
          setGeneralError(t('nftNotEnoughNetwork'));
        } else {
          setGeneralError(t('internal error'));
        }
      } finally {
        setLoading(false);
      }
    }

    f();
  }, [pattern, data, isLoading, loading, address, amount, t, validate]);

  const onSuccess = useCallback(() => {
      if(!address || !data) {
        return;
      }

      navigation.navigate(ROUTES.COINS.NFT_SUCCESS, {
        amount: amount,
        ticker: data.ticker,
        name: data.name,
        image: data.image,
        from: data.owner,
        to: address
      });
    },
    [navigation, amount, address, data]
  );

  const hideConfModal = useCallback(() => setConfModalIsVisible(false), []);

  const sendTx = useCallback(async () => {
    if(!tx || !data) {
      return;
    }

    try {
      await pattern.sendNFTTransactions(
        tx.transactions,
        {
          id: data.id,
          contract: data?.contract,
          coin: data?.network.id,
        },
      );

      hideConfModal();
      onSuccess();
    } catch (e) {
      setGeneralError(t('internal error'));
    }
  }, [tx, onSuccess, data, hideConfModal])

  useEffect(() => {
    setGeneralError(undefined);
    setTx(undefined);
  }, [address, amount]);

  useEffect(() => {
    if(amount) {
      validateAmount();
    }
  }, [amount, validateAmount]);

  useEffect(() => {
    if(address) {
      validateAddress();
    }
  }, [address, validateAddress]);

  useEffect(() => {
    if(error) {
      setGeneralError(t('internal error'));
    }
  }, [error, t]);

  if(isLoading || !data) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScreenHeader title={t('nftSendTitle')} />
      <NftImage image={data.image} imageStyle={styles.image}/>
      <Text style={styles.title}>{data.name}</Text>
      {data.type === 'ERC-1155' && <IncrementableDecimalInput
        value={amount}
        onValueChange={setAmount}
        containerStyle={styles.amountInput}
        minValue={'0'}
        maxValue={data.amount}
      />}
      <RecipientInput
        onPressQr={showModal}
        value={address}
        onChange={setAddress}
        containerStyle={styles.recipientInput}
      />
      <Text style={styles.error}>{generalError}</Text>
      <SolidButton
        title={t('Continue')}
        containerStyle={styles.button}
        onPress={onContinuePress}
        loading={loading}
        disabled={!!generalError}
      />
      {modal}
      {!!address && !!tx && (
        <NftConfirmation
          visible={confModalIsVisible}
          onCancel={hideConfModal}
          onAccept={sendTx}
          amount={amount}
          address={address}
          name={data.name}
          ticker={data.ticker}
          image={data.image}
          fee={tx?.fee}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
    width: '100%',
  },
  image: {
    width: Layout.isSmallDevice ? 240 : 327,
    height: Layout.isSmallDevice ? 240 : 327,
    borderRadius: 12,
  },
  title: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Layout.isSmallDevice ? 15 : 18,
    lineHeight: Layout.isSmallDevice ? 21: 28,
    color: theme.colors.white,
    marginTop: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 24,
    width: '100%',
  },
  amountInput: {
    marginBottom: 12,
  },
  recipientInput: {
    width: '100%',
    backgroundColor: theme.colors.grayDark,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    paddingTop: 0,
    paddingBottom: 0,
  },
  error: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.red,
    marginTop: 16,
    textAlign: 'center',
  }
});

