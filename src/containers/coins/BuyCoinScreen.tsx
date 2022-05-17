import {SafeAreaView, StyleSheet} from 'react-native';
import theme from '../../theme';
import Layout from '../../utils/layout';
import React, {useCallback, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import AddressSelector from '../../components/buttons/address-selector';
import {CurrencySelect} from '../../components/coin-buy/currency-select';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CoinBuyRouteProps} from '../../navigation/CoinsStack';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {DestinationCoinAmount} from '../../components/coin-buy/destination-coin-amount';
import {ServiceProvider} from '../../components/coin-buy/service-provider';
import SolidButton from '../../components/buttons/solid-button';
import {ConfirmationModal} from '../../components/coin-buy/confirmation-modal';
import {CannotProceedModal} from '../../components/coin-buy/cannot-proceed-modal';
import {
  getCryptoAmountByCurrencyAmountAndPrice,
  getCurrencyAmountByCryptoAmountAndPrice,
} from '../../utils/currency-calculator';
import GSolidButton from '../../components/buttons/g-solid-button';

interface CoinTradePairToUser {
  ticker: string;
  price: string;
  name?: string;
  img?: string;
  minAmountToSpend?: string;
  maxAmountToSpend?: string;
}
interface WithdrawInfoForUser {
  min?: string;
  max?: string;
  fee?: string;
}
interface BuyCoinData {
  pairs: CoinTradePairToUser[];
  withdrawInfo: WithdrawInfoForUser;
}

const dataStub: BuyCoinData = {
  withdrawInfo: {
    max: '1000',
    min: '0',
    fee: '0',
  },
  pairs: [
    {
      ticker: 'USD',
      name: 'Dollar',
      img: '/images/usdt.png',
      price: '30000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'EUR',
      img: '/images/firo-logo.png',
      price: '35000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'RUB',
      img: '/images/polka.png',
      price: '700000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'USD1',
      name: 'Dollar',
      img: '/images/usdt.png',
      price: '30000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'EUR1',
      img: '/images/firo-logo.png',
      price: '35000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'RUB1',
      img: '/images/polka.png',
      price: '700000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'USD2',
      name: 'Dollar',
      img: '/images/usdt.png',
      price: '30000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'EUR2',
      img: '/images/firo-logo.png',
      price: '35000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'RUB2',
      img: '/images/polka.png',
      price: '700000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'USD3',
      name: 'Dollar',
      img: '/images/usdt.png',
      price: '30000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'EUR3',
      img: '/images/firo-logo.png',
      price: '35000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
    {
      ticker: 'RUB3',
      img: '/images/polka.png',
      price: '700000',
      minAmountToSpend: '100',
      maxAmountToSpend: '1000',
    },
  ],
};

const BuyCoinScreen = () => {
  const route = useRoute<CoinBuyRouteProps>();
  const coin = route.params?.coin;
  if (!coin) {
    throw new Error('Coin is required for buy screen');
  }
  const coinDetails = useCoinDetails(coin);
  if (!coinDetails) {
    throw new Error('Unknown coin for buy screen');
  }

  const {t} = useTranslation();
  const [currency, setCurrency] = useState<string>('USD');
  const [currencyAmount, _setCurrencyAmount] = useState<string>('0');
  const [cryptoAmount, _setCryptoAmount] = useState<string>('0');
  const setCurrencyAmount = useCallback((newCurrencyAmount: string) => {
      _setCurrencyAmount(newCurrencyAmount);
      const currentCurrency = dataStub.pairs.find(p => p.ticker === currency);
      _setCryptoAmount(getCryptoAmountByCurrencyAmountAndPrice(newCurrencyAmount, currentCurrency?.price));
  }, [currency]);
  const setCryptoAmount = useCallback((newCryptoAmount: string) => {
      _setCryptoAmount(newCryptoAmount);
      const currentCurrency = dataStub.pairs.find(p => p.ticker === currency);
      _setCurrencyAmount(getCurrencyAmountByCryptoAmountAndPrice(newCryptoAmount, currentCurrency?.price));
  }, [currency]);
  const balancesState = useAddressesBalance(coin);
  const [receiveAddressIndex, setReceiveAddressIndex] = useState<number>(0);

  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(false);
  const confirmationModalCancel = useCallback(() => {
    setConfirmationModalVisible(false);
  }, []);

  const onContinue = useCallback(() => {
    if (disclaimerAccepted) {
      //SUBMIT TODO
    } else {
      setConfirmationModalVisible(true);
    }
  }, [disclaimerAccepted]);

  const onSubmit = useCallback(() => {
    setDisclaimerAccepted(true);
    setConfirmationModalVisible(false);
    //SUBMIT TODO
  }, []);

  const [cannotProceedModalVisible, setCannotProceedModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const onCannotProceedOK = useCallback(() => {
    setCannotProceedModalVisible(false);
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <AddressSelector
        label={t('To account')}
        containerStyle={styles.addressSelector}
        addresses={balancesState.balances}
        onSelect={setReceiveAddressIndex}
        selectedAddress={receiveAddressIndex}
        ticker={coinDetails.ticker}
      />
      <CurrencySelect
        currencies={dataStub.pairs}
        setCurrency={setCurrency}
        currency={currency}
        currencyAmount={currencyAmount}
        setCurrencyAmount={setCurrencyAmount}
        containerStyle={styles.currencySelect}
      />
      <DestinationCoinAmount
        logo={coinDetails.logo}
        ticker={coinDetails.ticker}
        amount={cryptoAmount}
        setAmount={setCryptoAmount}
        containerStyle={styles.destinationCoin}
      />
      <ServiceProvider containerStyle={styles.serviceProvider} />
      {/*<View style={styles.textBlock}>*/}
      {/*  <Text style={styles.description}>{*/}
      {/*    t('You can add a token that is missing in our wallet.') + '\n' +*/}
      {/*      t('To do this, select the blockchain that owns the token and specify the address of the contract')*/}
      {/*  }</Text>*/}
      {/*</View>*/}
      {/*{!!error && (*/}
      {/*  <View style={styles.errorContainer}>*/}
      {/*    <AlertRow text={error} />*/}
      {/*  </View>*/}
      {/*)}*/}
      <GSolidButton
        title={t('Continue')}
        loading={false}
        onPress={onContinue}
        disabled={false}
        containerStyle={styles.continue}
      />
      <ConfirmationModal visible={confirmationModalVisible} onSubmit={onSubmit} onCancel={confirmationModalCancel} />
      <CannotProceedModal visible={cannotProceedModalVisible} onSubmit={onCannotProceedOK} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  addressSelector: {
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
  },
  currencySelect: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  destinationCoin: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  serviceProvider: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  continue: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    paddingBottom: 16,
    borderRadius: 44,
  },
});

export default BuyCoinScreen;
