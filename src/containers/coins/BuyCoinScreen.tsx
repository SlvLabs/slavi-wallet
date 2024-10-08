import {StyleSheet, Text, View} from 'react-native';
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
import {ServiceProviderOption} from '../../components/coin-buy/service-provider';
import {ConfirmationModal} from '../../components/coin-buy/confirmation-modal';
import {CannotProceedModal} from '../../components/coin-buy/cannot-proceed-modal';
import GSolidButton from '../../components/buttons/g-solid-button';
import {useBuyCoin} from '@slavi/wallet-core/src/providers/ws/hooks/bifinity/buy-coin-hook';
import AlertRow from '../../components/error/alert-row';
import {validationErrorToString} from '@slavi/wallet-core/src/utils/validation-error';
import ROUTES from '../../navigation/config/routes';
import NoticeRow from '../../components/error/notice-row';
import Spinner from '../../components/spinner';
import Screen from '../../components/screen';
import {BuySource} from '@slavi/wallet-core/src/providers/ws/messages/buy-coin';
import {useChangedValueCallback} from '../../hooks/useChangedValueCallback';

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
    error,
    initError,
    isLoading,
    submitBuyCoin,
    createdOrder,
    isProcessing,
    selectSource,
    selectedSource,
    sourceWithTheBestPrice,
  } = useBuyCoin(coin, coinDetails.ticker, balancesState.balances[receiveAddressIndex]?.address);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState<{
    [key in BuySource]: boolean;
  }>({
    binance: false,
    switchere: false,
  });
  const confirmationModalCancel = useCallback(() => {
    setConfirmationModalVisible(false);
  }, []);

  const doSubmit = useCallback(() => {
    if (createdOrder?.url && !(selectedSource === BuySource.switchere)) {
      navigation.navigate(ROUTES.COINS.BUY_COIN_WEB_VIEW, {
        ticker: coinDetails.ticker,
        url: createdOrder.url,
      });
    } else {
      submitBuyCoin();
    }
  }, [navigation, createdOrder, submitBuyCoin, coinDetails, selectedSource]);

  const onContinue = useCallback(() => {
    if (!selectedSource) {
      return;
    }
    if (disclaimerAccepted[selectedSource]) {
      doSubmit();
    } else {
      setConfirmationModalVisible(true);
    }
  }, [disclaimerAccepted, doSubmit, selectedSource]);

  const onSubmit = useCallback(() => {
    setDisclaimerAccepted(c => (selectedSource ? {...c, [selectedSource]: true} : c));
    setConfirmationModalVisible(false);
    doSubmit();
  }, [doSubmit, selectedSource]);

  const [cannotProceedModalVisible, setCannotProceedModalVisible] = useState<boolean>(false);

  const onCannotProceedOK = useCallback(() => {
    setCannotProceedModalVisible(false);
    navigation.goBack();
  }, [navigation]);

  const onOrder = useCallback(
    (order: typeof createdOrder) => {
      if (order) {
        navigation.navigate(ROUTES.COINS.BUY_COIN_WEB_VIEW, {
          ticker: coinDetails.ticker,
          url: order.url,
        });
      }
    },
    [navigation, coinDetails],
  );
  useChangedValueCallback(createdOrder, onOrder);

  const feeView = useMemo(() => {
    const feeInNetworkCoin = selectedSource && withdrawInfo?.[selectedSource]?.feeInNetworkCoin;

    return (
      currencyData &&
      selectedSource &&
      typeof currencyData[selectedSource]?.fee === 'undefined' &&
      feeInNetworkCoin && (
        <View style={styles.errorContainer}>
          <NoticeRow
            text={validationErrorToString(t, {
              text: 'fee will be {amount} {ticker}',
              vars: {
                amount: feeInNetworkCoin,
                ticker: coinDetails.parentTicker || '',
              },
            })}
          />
        </View>
      )
    );
  }, [t, currencyData, withdrawInfo, coinDetails, selectedSource]);

  useEffect(() => {
    if (notAvailable || initError) {
      setCannotProceedModalVisible(true);
    }
  }, [notAvailable, initError]);

  if (isLoading || !(pairs || initError || notAvailable)) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    );
  }

  return (
    <Screen title={t('Buy') + (coinDetails.ticker ? ' ' + coinDetails.ticker : '')}>
      {initError ? (
        <View style={styles.screen}>
          <CannotProceedModal
            visible={cannotProceedModalVisible}
            onSubmit={onCannotProceedOK}
            text={initError}
            showImg={false}
          />
        </View>
      ) : notAvailable ? (
        <View style={styles.screen}>
          <CannotProceedModal
            visible={cannotProceedModalVisible}
            onSubmit={onCannotProceedOK}
            text={'Sorry, our service is not available in the location you are in'}
            showImg={true}
          />
        </View>
      ) : (
        <View style={styles.screen}>
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
          {currencyData && (
            <View style={styles.serviceProviderOptionGroup}>
              <Text style={styles.serviceProviderOptionGroupHeader}>{t('Service provider')}</Text>
              {[BuySource.binance, BuySource.switchere]
                .filter(s => !!currencyData[s])
                .map((s, i, sources) => (
                  <ServiceProviderOption
                    containerStyle={i < sources.length - 1 ? styles.serviceProviderOptionNotLast : undefined}
                    source={s}
                    isSelected={selectedSource === s}
                    isBestPrice={sourceWithTheBestPrice === s && sources.length > 1}
                    selectSource={selectSource}
                    price={currencyData[s]!.price}
                    ticker={currencyData.ticker}
                    key={s}
                  />
                ))}
            </View>
          )}
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
          <ConfirmationModal
            visible={confirmationModalVisible}
            onSubmit={onSubmit}
            onCancel={confirmationModalCancel}
            source={selectedSource}
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
  },
  currencySelect: {
    marginBottom: 8,
  },
  destinationCoin: {
    marginBottom: 8,
  },
  serviceProvider: {
    marginBottom: 8,
  },
  serviceProviderOptionNotLast: {
    marginBottom: 12,
  },
  serviceProviderOptionGroup: {
    marginBottom: 8,
  },
  serviceProviderOptionGroupHeader: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    color: theme.colors.textLightGray1,
    marginBottom: 10,
  },
  errorContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  continue: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    borderRadius: 44,
  },
});

export default BuyCoinScreen;
