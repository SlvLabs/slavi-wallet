import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomIcon from '../../components/custom-icon/custom-icon';
import useTranslation from '../../utils/use-translation';
import SourceCoinElement from '../../components/swap/source-coin-element';
import DestinationCoinElement from '../../components/swap/destination-coin-element';
import theme from '../../theme';
import ExchangeHeader from '../../components/swap/exchange-header';
import useCoinsSelector from '@slavi/wallet-core/src/store/modules/coins/use-coins-selector';
import NetworkSelector, {NetworksOptions} from '../../components/swap/network-selector';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import AddressSelector from '../../components/buttons/address-selector';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import SolidButton from '../../components/buttons/solid-button';
import useGetAvailableNetworks from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-get-available-networks';
import ApproveConfirmationModal from '../../components/swap/approve-confirmation-modal';
import SwapConfirmationModal from '../../components/swap/swap-confirmation-modal';
import {useGetSpenderForCoin} from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-get-spender-for-coin';
import {useGetSwapTx} from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-get-swap-tx';
import {useAvailableCoins} from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-available-coins';
import {useGetSwapInfo} from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-get-swap-info';
import useCoinsService from '@slavi/wallet-core/src/contexts/hooks/use-coins-service';
import {useAddressesService, useCoinPatternService, useCoinSpecsService} from '@slavi/wallet-core';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import useInsufficientApprovedAmount
  from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-insufficient-approved-amount';
import EthPattern from '@slavi/wallet-core/src/services/coin-pattern/eth-pattern';
import Erc20Pattern from '@slavi/wallet-core/src/services/coin-pattern/erc-20-pattern';
import useUnconfirmedApprovals from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-unconfirmed-approvals';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import stringNumberGt from '@slavi/wallet-core/src/utils/string-number-gt';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WarningModal from '../../components/modal/warning-modal';
import SwapSuccessModal from '../../components/swap/swap-success-modal';
import {useRoute} from '@react-navigation/core';
import {CoinSwapRouteProps} from '../../navigation/SwapStack';

const APPROVE_INTERVAL_CHECK = 5 * 1000;

const SwapScreen = () => {
  const route = useRoute<CoinSwapRouteProps>();
  const selectedCoin = route.params?.srcCoin;
  const selectedNetwork = route.params?.network;

  const [network, setNetwork] = useState<string>(selectedNetwork);
  const [txPriority, setTxPriority] = useState<TransactionPriority>(TransactionPriority.average);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.1);
  const [inAmount, setInAmount] = useState<string>('0.0');
  const [inCoin, setInCoin] = useState<string|undefined>(selectedCoin);
  const [dstCoin, setDstCoin] = useState<string>();
  const [addressIndex, setAddressIndex] = useState<number>();
  const [balance, setBalance] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [srcTicker, setSrcTicker] = useState<string>();
  const [srcLogo, setSrcLogo] = useState<string>();
  const [dstTicker, setDstTicker] = useState<string>();
  const [dstLogo, setDstLogo] = useState<string>();
  const [approveConfIsShown, setApproveConfIsShown] = useState<boolean>(false);
  const [swapConfIsShown, setSwapConfIsShown] = useState<boolean>(false);
  const [fee, setFee] = useState<string>();
  const [approveTxs, setApproveTxs] = useState<string[]|undefined>();
  const [blocked, setBlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [gasPrice, setGasPrice] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [submitSwap, setSubmitSwap] = useState<boolean>(false);       //flag for prevent double modal show
  const [approving, setApproving] = useState<boolean>(false);
  const [errorModalIsShown, setErrorModalIsShown] = useState<boolean>(false);
  const [approveSubmitting, setApproveSubmitting] = useState<boolean>(false);
  const [swapSubmitting, setSwapSubmitting] = useState<boolean>(false);
  const [waitSwapProvider, setWaitSwapProvider] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [successModalIsShown, setSuccessModalIsShown] = useState<boolean>(false);

  const approvingTimer = useRef<NodeJS.Timer | null>(null);
  const waitSwapProviderTimer = useRef<NodeJS.Timer | null>(null);

  const coinService = useCoinsService();
  const patternService = useCoinPatternService();
  const addressService = useAddressesService();
  const specService = useCoinSpecsService();

  const {isLoading, error: networksError, coins: parentCoins} = useGetAvailableNetworks();
  const coins = useCoinsSelector({isSwap: true});
  const balancesState = useAddressesBalance(inCoin);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const {contractAddress, error: spenderError} = useGetSpenderForCoin(network);

  const {
    request: requestApproval,
    error: approvalError,
    loading: approvalsLoading,
    approvals
  } = useUnconfirmedApprovals(network, inCoin, address);

  const networkPattern: EthPattern | null = useMemo(() => {
    if(network) {
      return patternService.createEthPattern(
        network,
        addressService.getGetterDelegate(network),
      );
    }

    return null;
  }, [network, patternService, addressService]);

  const coinPattern: Erc20Pattern | null = useMemo(() => {
    if(inCoin && network && inCoin !== network && !isLoading) {
      return patternService.createErc20Pattern(
        inCoin,
        addressService.getGetterDelegate(inCoin)
      );
    }

    return null;
  },
    [inCoin, patternService, addressService]);

  const {
    error: allowanceError,
    errors: allowanceErrors,
    insufficientAmount,
    request: requestInsufficientApprovedAmount,
    isLoading:  allowanceLoading
  } =  useInsufficientApprovedAmount(address, network, inCoin, inAmount);

  const {
    spentAmount: realSpentAmount,
    receiveAmount: realReceiveAmount,
    tx,
    error: txError,
    errors: txErrors,
    isLoading: txLoading,
    getSwapTx
  } = useGetSwapTx();

  const networkOptions: NetworksOptions = useMemo((): NetworksOptions => {
    if(isLoading || !parentCoins) {
      return {};
    }

    const options: NetworksOptions = {};
    parentCoins.forEach((coin) => {
      options[coin.id] = {
        id: coin.id,
        name: coin.networkName || coin.name,
        logo: coins.find(element => element.id === coin.id)?.logo,
      }
    });

    return options;
  }, [isLoading, parentCoins, coins]);

  const filteredCoins = useMemo(() => {
    if(!network) {
      return [];
    }

    return coins.filter((coin) => coin.parent === network || coin.id === network);
  }, [network, coins]);

  const {
    error: availableCoinsError,
    errors: availableCoinsErrors,
    isLoading: availableCoinsLoading,
    coins: dstCoins
  } = useAvailableCoins(network);

  const {receiveAmount, error: getInfoError, errors: getInfoErrors, price} = useGetSwapInfo({
    coin: network,
    fromCoin: inCoin,
    address: address,
    toCoin: dstCoin,
    gasPrice: gasPrice,
    amount: inAmount
  });

  const showApproveConf = useCallback(() => setApproveConfIsShown(true), []);
  const hideApproveConf = useCallback(() => setApproveConfIsShown(false), []);
  const showSwapConf = useCallback(() => setSwapConfIsShown(true), []);
  const hideSwapConf = useCallback(() => setSwapConfIsShown(false), []);
  const showErrorModal = useCallback(() => setErrorModalIsShown(true), []);
  const hideErrorModal = useCallback(() => setErrorModalIsShown(false), []);
  const showSuccessModal = useCallback(() => setSuccessModalIsShown(true), []);
  const hideSuccessModal = useCallback(() => setSuccessModalIsShown(false), []);

  const setApprovingTimer = useCallback(() => {
    requestApproval();

    if(approvingTimer.current) {
      clearInterval(approvingTimer.current);
    }

    approvingTimer.current = setInterval(() => {
      requestApproval();
    }, APPROVE_INTERVAL_CHECK);
  }, [requestApproval]);

  const onApproveSubmit = useCallback(() => {
    setLoading(true);4

    const f = async () => {
      if(!inCoin
        || !inAmount
        || !address
        || !contractAddress
        || allowanceLoading
        || !insufficientAmount
        || !coinPattern
      ) {
        setLoading(false);
        return;
      }

      try {
        const approve = await coinPattern.approve(
          address,
          contractAddress,
          {transactionPriority: txPriority}
        );

        setFee(approve.fee);
        setApproveTxs(approve.transactions);
        showApproveConf();
      } catch (e) {
        setLoading(false);
        setError(t('internal error'));
        return;
      }
    }

    f();
  }, [
    showApproveConf,
    contractAddress,
    address,
    inAmount,
    inCoin,
    allowanceLoading,
    insufficientAmount,
  ]);

  const onApproveAccept = useCallback(() => {
    if(!approveTxs
      || approveTxs.length === 0
      || !network
      || !networkPattern
      || !address
      || !inCoin
      || !contractAddress
      || approveSubmitting
    ) {
      return;
    }

    setApproveSubmitting(true);
    networkPattern.sendApproveTransactions(approveTxs, {
      address: address,
      coin: inCoin,
      contract: contractAddress,
    })
      .then(() => {
        setApproving(true);
        setApprovingTimer();
      })
      .catch(() => {
      if(approvingTimer.current) {
        clearInterval(approvingTimer.current);
      }
    })
      .finally(() => {
        setLoading(false);
        setApproveSubmitting(false);
      });

    hideApproveConf();
  }, [approveTxs, network, hideApproveConf, t, networkPattern, setApprovingTimer, address]);

  const onSwapAccept = useCallback(() => {
    const f = async () => {
      if(!dstCoin
        || !network
        || !tx
        || !networkPattern
        || !inCoin
        || !receiveAmount
        || error
        || swapSubmitting
      ) {
        return;
      }

      setSwapSubmitting(true);

      const nonce = await networkPattern.getNonce(tx);
      const chainId = specService.getSpec(network)?.chainId;

      const {gas, ...other} = tx;

      const signedTx = await networkPattern.signTransaction({
        ...other,
        nonce: nonce,
        gasLimit: gas,
        chainId: chainId,
      });

      try {
        await networkPattern.sendSwapTransactions([signedTx], {
          srcCoin: inCoin,
          srcAmount: inAmount,
          dstCoin: dstCoin,
          dstAmount: receiveAmount,
        });
      } catch (e) {
        setLoading(false);
        setError(t('internal error'));
        return;
      } finally {
        hideSwapConf();
        setLoading(false);
        setSwapSubmitting(false);
      }

      showSuccessModal();
    }

    setLoading(true);
    f();
  }, [dstCoin, coinService, tx, coinService, specService, networkPattern, insufficientAmount, showSuccessModal]);

  const onSwapSubmit = useCallback(async () => {
    if(!network
      || !inCoin
      || !dstCoin
      || !inAmount
      || !slippageTolerance
      || !address
      || !networkPattern
      || !gasPrice
    ) {
      return;
    }

    const realNetwork = coins.find(e => e.id === inCoin)?.parent;

    if(realNetwork !== network) {
      return;
    }

    setBlocked(true);
    setSubmitSwap(true);

    await coinService.enablePregenedCoin(dstCoin);

    getSwapTx({
      coin: network,
      fromCoin: inCoin,
      toCoin: dstCoin,
      amount: inAmount,
      slippage: slippageTolerance,
      allowPartialFill: false,
      gasPrice: gasPrice,
      address: address,
    });
  }, [network, inCoin, dstCoin, inAmount, slippageTolerance, address, networkPattern, gasPrice]);

  const onTxPriorityChange = useCallback((value) => setTxPriority(+value), []);

  const onAddressSelect = useCallback((index: number) => {
    if(balancesState.balances[index]) {
      setAddressIndex(index);
      setAddress(balancesState.balances[index].address);
      setBalance(balancesState.balances[index].balance);
    }
  }, [balancesState]);

  const onNetworkSelect = useCallback((value: string) => {
    setInCoin(undefined);
    setNetwork(value);
  }, []);

  const onFinish = useCallback(() => {
    hideSuccessModal();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: ROUTES.TABS.OPERATIONS,
        },
      ],
    });
  }, [navigation, hideSuccessModal])

  useEffect(() => {
    if(!isLoading && !network && parentCoins?.[0]?.id) {
      setNetwork(selectedNetwork || parentCoins[0].id);
    }
  }, [parentCoins, isLoading, network, selectedCoin]);

  useEffect(() => {
    if(!inCoin && filteredCoins?.[0]) {
      if(!filteredCoins.find(e => e.id === selectedCoin)) {
        setInCoin(filteredCoins[0].id);
      } else {
        setInCoin(selectedCoin);
      }
    }
  }, [filteredCoins, inCoin, selectedCoin]);

  useEffect(() => setInCoin(selectedCoin), [selectedCoin]);
  useEffect(() => setNetwork(selectedNetwork), [selectedNetwork]);

  useEffect(() => {
    if(!balancesState || !balancesState.balances || balancesState.balances.length === 0) {
      return;
    }

    if(!address && balancesState?.balances?.[0]) {
      setAddress(balancesState.balances[0].address);
      setBalance(balancesState.balances[0].balance);
      setAddressIndex(0);
      return;
    }

    const index = balancesState.balances.findIndex(e => e.address === address);
    if(index !== -1) {
      setBalance(balancesState.balances[index].balance);
      setAddressIndex(index);
    }
  }, [balancesState, address]);

  useEffect(() => {
    const coin = coins.find(c => c.id === inCoin);
    setSrcTicker(coin?.ticker);
    setSrcLogo(coin?.logo);
  }, [inCoin]);

  useEffect(() => {
    if(!dstCoins) {
      return;
    }

    const coin = dstCoins.find(c => c.id === dstCoin);
    setDstTicker(coin?.ticker);
    setDstLogo(coin?.logo);
  }, [dstCoin, network]);

  useEffect(() => {
    if(tx && network && networkPattern && submitSwap) {
      const estimateFee = networkPattern.getFee(txPriority, tx.gas);
      const networkBalance = (coins.find((c) => c.id === network))?.total || '0'
      if(stringNumberGt(networkBalance, estimateFee)) {
        setFee(estimateFee);
        showSwapConf();
      } else {
        setLoading(false);
        setError(t('insufficientNetworkFunds'));
      }

      setSubmitSwap(false);
      setBlocked(false);
    }
  }, [tx, network, txPriority, networkPattern, submitSwap]);

  useEffect(() => {
    if(dstCoins && dstCoins.length > 0) {
      for (const c of dstCoins) {
        if(c.id !== network && c.default) {
          setDstCoin(c.id);
          setDstLogo(c.logo);
        }
      }
    }
  }, [dstCoins, network]);

  useEffect(() => {
    if(isLoading) {
      return;
    }

    if(getInfoError === 'insufficient liquidity' || txError === 'insufficient liquidity') {
      setError(t('insufficientLiquidity'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if(txError === 'insufficient funds') {
      setError(`${t('insufficientNetworkFunds')} ${network}`);
      setLoading(false);
      setBlocked(false);
      return;
    }

    if(txError === 'cannot estimate' || getInfoError === 'cannot estimate') {
      setError(t('sleepingToleranceError'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if(txError === 'not enough allowance') {
      setError(t('notEnoughAllowance'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if(
      networksError
      || allowanceError
      || allowanceErrors
      || spenderError
      || availableCoinsError
      || availableCoinsErrors
      || txError
      || txErrors
      || approvalError
    ) {
      setBlocked(false);
      setLoading(false);
      showErrorModal();
      return;
    }
  }, [
    networksError,
    allowanceError,
    allowanceErrors,
    spenderError,
    availableCoinsError,
    availableCoinsErrors,
    getInfoError,
    getInfoErrors,
    txError,
    txErrors,
    t,
    showErrorModal,
    approvalError,
  ]);

  useEffect(() => {
    if(!networkPattern) {
      return;
    }

    setGasPrice(networkPattern.getGasLimit(txPriority));
  }, [networkPattern, txPriority]);

  useEffect(() => {
    setLoading(isLoading || allowanceLoading || txLoading || availableCoinsLoading);
  }, [isLoading, allowanceLoading, txLoading, availableCoinsLoading]);

  useEffect(() => {
    setDisabled(!network || !inCoin || !inAmount || !address || !!error || !stringNumberGt(inAmount, '0'));
  }, [network, inCoin, inAmount, address, error]);

  useEffect(() => {
    if(!approving) {
      requestInsufficientApprovedAmount();
    }
  }, [address, network, inCoin, approving, requestInsufficientApprovedAmount]);

  useEffect(() => {
    if(!approvalsLoading) {
      if(approvals && approvals.length > 0) {
        setApproving(true);
        setWaitSwapProvider(true);
      } else {
        if(approvingTimer.current) {
          clearInterval(approvingTimer.current);
        }

        setApproving(false);
      }
    }
  }, [approvals, approvalsLoading, requestInsufficientApprovedAmount]);

  useEffect(() => {
    if(initialized) {
      return;
    }
    setApprovingTimer();
    setInitialized(true);
  }, [initialized, setApprovingTimer]);


  useEffect(() => {
    return () => {
      if(approvingTimer.current) {
        clearInterval(approvingTimer.current);
      }

      if(waitSwapProviderTimer.current) {
        clearInterval(waitSwapProviderTimer.current);
      }
    }
  }, []);

  useEffect(() => {
    setError(undefined);
  }, [inCoin, network, dstCoin, inAmount, address]);

  useEffect(() => {
      if(inAmount && balance && stringNumberGt(inAmount, balance)) {
        setError(t('Insufficient funds'));
      }
  }, [inAmount, balance, t]);

  useEffect(() => {
    if(inCoin && dstCoin && inCoin === dstCoin) {
      setError(t('sameSwap'));
    }
  }, [inCoin, dstCoin, t]);

  useEffect(() => {
    setInAmount('0.0');
  }, [inCoin]);

  useEffect(() => {
    if(error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    return  navigation.addListener('focus', () => {
      if(!balancesState.isLoading) {
        balancesState.request();
      }

      requestInsufficientApprovedAmount();
    });
  }, [navigation, balancesState.isLoading, balancesState.request]);

  useEffect(() => {
    if(!insufficientAmount && !allowanceLoading) {
      if(waitSwapProviderTimer.current){
        clearInterval(waitSwapProviderTimer.current);
      }
      setWaitSwapProvider(false);
    }
  }, [insufficientAmount, allowanceLoading]);

  useEffect(() => {
    if(waitSwapProvider && !approving && !waitSwapProviderTimer.current) {
      waitSwapProviderTimer.current = setInterval(() => {
        requestInsufficientApprovedAmount();
      }, APPROVE_INTERVAL_CHECK);
    }
  }, [waitSwapProvider, approving, requestInsufficientApprovedAmount]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scroll}>
        <ExchangeHeader
          txPriority={txPriority}
          onSlippageToleranceChange={setSlippageTolerance}
          slippageTolerance={slippageTolerance}
          onTxPriorityChange={onTxPriorityChange}
        />
        <View style={styles.swapBlock}>
          <NetworkSelector
            value={network}
            networks={networkOptions}
            onSelect={onNetworkSelect}
            containerStyle={styles.network}
          />
          <SourceCoinElement
            balance={balance || '0'}
            ticker={srcTicker || ''}
            containerStyle={styles.srcBlock}
            amount={inAmount}
            onAmountChange={setInAmount}
            coins={filteredCoins}
            onCoinSelect={setInCoin}
            logo={srcLogo}
          />
          <View style={styles.swapButton}>
            <CustomIcon name={'exchange1'} color={theme.colors.green} size={18} />
          </View>
          <DestinationCoinElement
            ticker={dstTicker || ''}
            amount={makeRoundedBalance(6, receiveAmount || '0')}
            containerStyle={styles.destBlock}
            coins={dstCoins || []}
            onCoinSelect={setDstCoin}
            logo={dstLogo}
          />
          <AddressSelector
            label={t('From account')}
            containerStyle={styles.addressSelector}
            addresses={balancesState.balances}
            onSelect={onAddressSelect}
            selectedAddress={addressIndex}
            ticker={srcTicker || ''}
          />
        </View>
          <View style={styles.priceView}>
            <Text style={styles.price}>
              {(!!price && price !== '0') && t('price')}
            </Text>
            <Text style={styles.price}>
              {(!!price && price !== '0') && `${makeRoundedBalance(4,price)} ${srcTicker} ${t('per')} 1 ${dstTicker}`}
            </Text>
          </View>
        {approving || waitSwapProvider ? (
          <View style={styles.approvingView}>
            <CustomIcon name={'timer'} size={20} color={theme.colors.white} />
            <Text style={styles.approvingText}>{t('approving')}</Text>
          </View>
        ) :
          (!!insufficientAmount ? (
          <SolidButton
            title={t('approve')}
            containerStyle={styles.submitButton}
            onPress={onApproveSubmit}
            loading={blocked || loading}
            disabled={disabled}
          />
        ) : (
          <SolidButton
            title={t('swap')}
            containerStyle={styles.submitButton}
            onPress={onSwapSubmit}
            loading={blocked || loading}
            disabled={disabled}
          />
        ))}
        <Text style={styles.error}>{error}</Text>
        <ApproveConfirmationModal
          visible={approveConfIsShown}
          onCancel={hideApproveConf}
          onAccept={onApproveAccept}
          contract={contractAddress || ''}
          fee={fee || ''}
          loading={approveSubmitting}
        />
        <SwapConfirmationModal
          visible={swapConfIsShown}
          onCancel={hideSwapConf}
          onAccept={onSwapAccept}
          contract={contractAddress || ''}
          fee={fee || ''}
          srcCoin={srcTicker || ''}
          srcLogo={srcLogo}
          srcAmount={makeRoundedBalance(4, realSpentAmount || '0')}
          dstCoin={dstTicker || ''}
          dstLogo={dstLogo}
          dstAmount={makeRoundedBalance(4, realReceiveAmount || '0')}
          loading={swapSubmitting}
        />
        <WarningModal
          title={t('internal error')}
          visible={errorModalIsShown}
          onCancel={hideErrorModal}
          description={t('internalErrorDesc')}
        />
        <SwapSuccessModal
          visible={successModalIsShown}
          onCancel={hideSuccessModal}
          onAccept={onFinish}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
    paddingRight: 16,
    paddingLeft: 16,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 18,
  },
  button: {
    backgroundColor: theme.colors.grayDark,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapBlock: {},
  swapButton: {
    backgroundColor: theme.colors.grayDark,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    zIndex: 100,
    marginTop: -12,
    alignSelf: 'center',
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  backButton: {
    transform: [{
      rotate: '180deg',
    }],
  },
  destBlock: {
    marginTop: -12,
    height: 110,
  },
  srcBlock: {
    height: 110,
  },
  addressSelector: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    height: 70,
    marginTop: 18,
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
  },
  error: {
    fontFamily: theme.fonts.gilroy,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.red,
    textTransform: 'capitalize',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,
  },
  approvingView: {
    borderRadius: 38,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.disabledButton,
    marginTop: 20,
  },
  approvingText: {
    fontFamily: theme.fonts.default,
    color: theme.colors.white,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    marginLeft: 12,
  },
  priceView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10,
  },
  price: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 28,
    color: theme.colors.white,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  network: {
    marginBottom: 12,
    height: 70,
  },
});

export default SwapScreen;
