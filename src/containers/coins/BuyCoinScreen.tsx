import {SafeAreaView, StyleSheet, View} from 'react-native';
import theme from '../../theme';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import AddressSelector from '../../components/buttons/address-selector';
import {CurrencySelect} from '../../components/coin-buy/currency-select';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CoinBuyRouteProps} from '../../navigation/CoinsStack';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {DestinationCoinAmount} from '../../components/coin-buy/destination-coin-amount';
import {ServiceProvider} from '../../components/coin-buy/service-provider';
import {ConfirmationModal} from '../../components/coin-buy/confirmation-modal';
import {CannotProceedModal} from '../../components/coin-buy/cannot-proceed-modal';
import GSolidButton from '../../components/buttons/g-solid-button';
import {useBuyCoin} from '@slavi/wallet-core/src/providers/ws/hooks/bifinity/buy-coin-hook';
import AlertRow from '../../components/error/alert-row';
import {validationErrorToString} from '@slavi/wallet-core/src/utils/validation-error';
import ROUTES from '../../navigation/config/routes';
import NoticeRow from '../../components/error/notice-row';
import Spinner from '../../components/spinner';

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
  const navigation = useNavigation();
  const balancesState = useAddressesBalance(coin);
  const [receiveAddressIndex, setReceiveAddressIndex] = useState<number>(0);
  const {
    notAvailable,
    pairs,
    withdrawInfo,
    currencyData,
    currency,
    currencyAmount,
    setCurrencyAmount,
    setCurrency,
    setCryptoAmount,
    cryptoAmount,
    validationError,
    error, initError, isLoading, submitBuyCoin,
    createdOrder, isProcessing,
  } = useBuyCoin(coin, coinDetails.ticker, balancesState.balances[receiveAddressIndex]?.address);

  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(false);
  const confirmationModalCancel = useCallback(() => {
    setConfirmationModalVisible(false);
  }, []);

  const doSubmit = useCallback(() => {
    if (createdOrder?.eternalRedirectUrl) {
      console.log('reuse url');
      navigation.navigate(ROUTES.COINS.BUY_COIN_WEB_VIEW, {ticker: coinDetails.ticker, url: createdOrder.eternalRedirectUrl});
    } else {
      console.log('get new url');
      submitBuyCoin();
    }
  }, [navigation, createdOrder, submitBuyCoin, coinDetails]);

  const onContinue = useCallback(() => {
    if (disclaimerAccepted) {
      doSubmit();
    } else {
      setConfirmationModalVisible(true);
    }
  }, [disclaimerAccepted, doSubmit]);

  const onSubmit = useCallback(() => {
    setDisclaimerAccepted(true);
    setConfirmationModalVisible(false);
    doSubmit();
  }, [doSubmit]);

  const [cannotProceedModalVisible, setCannotProceedModalVisible] = useState<boolean>(false);

  const onCannotProceedOK = useCallback(() => {
    setCannotProceedModalVisible(false);
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    if (createdOrder) {
      navigation.navigate(ROUTES.COINS.BUY_COIN_WEB_VIEW, {ticker: coinDetails.ticker, url: createdOrder.eternalRedirectUrl});
    }
  }, [createdOrder, navigation, coinDetails]);

  const feeView = useMemo(
    () =>
      currencyData && typeof currencyData?.fee === 'undefined' && withdrawInfo?.feeInNetworkCoin && (
        <View style={styles.errorContainer}>
          <NoticeRow
            text={validationErrorToString(t, {
              text: 'fee will be {amount} {ticker}',
              vars: {amount: withdrawInfo?.feeInNetworkCoin, ticker: coinDetails.parentName},
            })}
          />
        </View>
      ),
    [t, currencyData, withdrawInfo, coinDetails],
  );

  useEffect(() => {
    if (notAvailable || initError) {
      setCannotProceedModalVisible(true);
    }
  }, [notAvailable, initError]);

  console.log('error = ', error);

  return isLoading || !(pairs || initError || notAvailable) ? (
    <View style={styles.spinnerContainer}>
      <Spinner />
    </View>
  ) : initError ? (
    <SafeAreaView style={styles.screen}>
      <CannotProceedModal
        visible={cannotProceedModalVisible}
        onSubmit={onCannotProceedOK}
        text={initError}
        showImg={false}
      />
    </SafeAreaView>
  ) : notAvailable ? (
    <SafeAreaView style={styles.screen}>
      <CannotProceedModal
        visible={cannotProceedModalVisible}
        onSubmit={onCannotProceedOK}
        text={'Sorry, our service is not available in the location you are in'}
        showImg={true}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.screen}>
      <AddressSelector
        label={t('To account')}
        containerStyle={styles.addressSelector}
        addresses={balancesState.balances}
        onSelect={setReceiveAddressIndex}
        selectedAddress={receiveAddressIndex}
        ticker={coinDetails.ticker}
        disabled={isProcessing}
      />
      <CurrencySelect
        currencies={pairs!}
        setCurrency={setCurrency}
        currency={currency}
        currencyAmount={currencyAmount}
        setCurrencyAmount={setCurrencyAmount}
        containerStyle={styles.currencySelect}
        disabled={isProcessing}
      />
      <DestinationCoinAmount
        logo={coinDetails.logo}
        ticker={coinDetails.ticker}
        amount={cryptoAmount}
        setAmount={setCryptoAmount}
        containerStyle={styles.destinationCoin}
        disabled={isProcessing}
      />
      <ServiceProvider containerStyle={styles.serviceProvider} />
      {!!error && (
        <View style={styles.errorContainer}>
          <AlertRow text={error} />
        </View>
      )}
      {!!validationError && validationError.text && (
        <View style={styles.errorContainer}>
          <AlertRow text={validationErrorToString(t, validationError)} />
        </View>
      )}
      {feeView}
      <GSolidButton
        title={t('Continue')}
        loading={isProcessing}
        onPress={onContinue}
        disabled={!!(error || validationError || isProcessing)}
        containerStyle={styles.continue}
      />
      <ConfirmationModal visible={confirmationModalVisible} onSubmit={onSubmit} onCancel={confirmationModalCancel} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingTop: 0,
    width: '100%',
  },
  addressSelector: {
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 16,
    marginRight: 16,
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
  errorContainer: {
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
