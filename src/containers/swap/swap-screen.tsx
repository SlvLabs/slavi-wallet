import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from '../../components/custom-icon/custom-icon';
import useTranslation from '../../utils/use-translation';
import SourceCoinElement from '../../components/swap/source-coin-element';
import DestinationCoinElement from '../../components/swap/destination-coin-element';
import theme from '../../theme';
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
import useInsufficientApprovedAmount from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-insufficient-approved-amount';
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
import Screen from '../../components/screen';
import SettingsModal from '../../components/swap/settings-modal';
import Layout from '../../utils/layout';
import {useResultBalance} from '@slavi/wallet-core/src/providers/ws/hooks/for-swap/use-result-balance';

const APPROVE_INTERVAL_CHECK = 5 * 1000;

interface _INetwork {
  readonly networkName?: string;
  readonly coinName: string;
  readonly id: string;
  readonly logo?: string;
  readonly ticker: string;
}
const SwapScreen = () => {
  const route = useRoute<CoinSwapRouteProps>();
  const srcCoinFromRoute = route.params?.srcCoin;
  const dstCoinFromRoute = route.params?.dstCoin;
  const networkFromRoute = route.params?.network;
  const networkFromRouteRef = useRef(networkFromRoute);
  networkFromRouteRef.current = networkFromRoute;

  const [network, setNetwork] = useState<_INetwork>();
  const [txPriority, setTxPriority] = useState<TransactionPriority>(TransactionPriority.average);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.1);
  const [inAmount, setInAmount] = useState<string>('0.0');
  const [inCoin, setInCoin] = useState<NonNullable<typeof coinsForSwap>[number] | undefined>();
  const [dstCoin, setDstCoin] = useState<NonNullable<typeof coinsForSwap>[number] | undefined>();
  const [addressIndex, setAddressIndex] = useState<number>();
  const [balance, setBalance] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [approveConfIsShown, setApproveConfIsShown] = useState<boolean>(false);
  const [swapConfIsShown, setSwapConfIsShown] = useState<boolean>(false);
  const [fee, setFee] = useState<string>();
  const [approveTxs, setApproveTxs] = useState<string[] | undefined>();
  const [blocked, setBlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [gasPrice, setGasPrice] = useState<{gasPrice: string; priorityGasPrice: string | null}>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [submitSwap, setSubmitSwap] = useState<boolean>(false); //flag for prevent double modal show
  const [approving, setApproving] = useState<boolean>(false);
  const [errorModalIsShown, setErrorModalIsShown] = useState<boolean>(false);
  const [approveSubmitting, setApproveSubmitting] = useState<boolean>(false);
  const [swapSubmitting, setSwapSubmitting] = useState<boolean>(false);
  const [waitSwapProvider, setWaitSwapProvider] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [successModalIsShown, setSuccessModalIsShown] = useState<boolean>(false);
  const [settingsIsShown, setSettingsIsShown] = useState<boolean>(false);

  const approvingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const waitSwapProviderTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const coinService = useCoinsService();
  const patternService = useCoinPatternService();
  const addressService = useAddressesService();
  const specService = useCoinSpecsService();

  const {isLoading, error: networksError, coins: _parentCoins} = useGetAvailableNetworks();
  const [parentCoins, setParentCoins] = useState<_INetwork[]>([]);
  const parentCoinsRef = useRef(parentCoins);
  useEffect(() => {
    setParentCoins(prev => {
      const checkedIds = new Set<string>();
      let needUpdate = false;
      for (const _pCoin of _parentCoins) {
        const found = prev.find(
          p =>
            p.id === _pCoin.id &&
            p.coinName === _pCoin.name &&
            p.networkName === _pCoin.networkName &&
            p.logo === _pCoin.logo &&
            p.ticker === _pCoin.ticker,
        );
        if (!found) {
          needUpdate = true;
          break;
        }
        checkedIds.add(found.id);
      }
      if (needUpdate || checkedIds.size !== prev.length) {
        setNetwork(p => {
          let endVariant = _parentCoins?.find(pp => pp.id === networkFromRouteRef.current) ?? _parentCoins[0];
          if (p) {
            endVariant = _parentCoins?.find(c => c.id === p.id) ?? endVariant;
          }
          if (!endVariant) {
            return undefined;
          }
          return {
            id: endVariant.id,
            networkName: endVariant.networkName,
            coinName: endVariant.name,
            logo: endVariant.logo,
            ticker: endVariant.ticker,
          };
        });
        const res =
          _parentCoins?.map(c => ({
            id: c.id,
            coinName: c.name,
            logo: c.logo,
            networkName: c.networkName,
            ticker: c.ticker,
          })) ?? [];
        parentCoinsRef.current = res;
        return res;
      }
      return prev;
    });
  }, [_parentCoins]);

  const coins = useCoinsSelector({isSwap: true});

  const [networkOptions, setNetworkOptions] = useState<NetworksOptions>({});

  useEffect(() => {
    setNetworkOptions(
      parentCoins?.reduce<NetworksOptions>((options, coin) => {
        options[coin.id] = {
          id: coin.id,
          name: coin.networkName || coin.coinName,
          logo: coin.logo,
        };
        return options;
      }, {}) ?? {},
    );
  }, [parentCoins]);

  useEffect(() => {
    setNetwork(parentCoinsRef.current.find(c => c.id === networkFromRoute) ?? parentCoinsRef.current[0]);
  }, [networkFromRoute]);

  const {
    error: availableCoinsError,
    errors: availableCoinsErrors,
    isLoading: availableCoinsLoading,
    coins: coinsForSwap,
  } = useAvailableCoins(network?.id);

  const [srcCoins, setSrcCoins] = useState<NonNullable<typeof coins>>([]);
  const [dstCoins, setDstCoins] = useState<NonNullable<typeof coinsForSwap>>([]);
  useEffect(() => {
    let _srcCoins = [];
    let _dstCoins;
    if (coinsForSwap?.length && network) {
      for (const coin of coinsForSwap) {
        const knownCoin = coins.find(c => c.id === coin.id);
        if (knownCoin) {
          if (knownCoin.id === network.id || knownCoin.parent === network.id) {
            _srcCoins.push(knownCoin);
          } else {
            _srcCoins = [];
            break;
          }
        }
      }
      if (_srcCoins.length) {
        _dstCoins = coinsForSwap;
      }
    }
    setSrcCoins(_srcCoins);
    setDstCoins(_dstCoins ?? []);
  }, [coins, coinsForSwap, network]);
  useEffect(() => {
    let routeCoin, parentCoin;
    if (!network?.id || inCoin) {
      return;
    }
    for (const coin of srcCoins) {
      if (coin.id !== network.id && coin.parent !== network.id) {
        return;
      }
      if (network?.id === coin.id) {
        parentCoin = coin;
      }
      if (coin.id === srcCoinFromRoute) {
        routeCoin = coin;
        break;
      }
    }
    setInCoin(routeCoin ?? parentCoin ?? srcCoins[0]);
  }, [network?.id, srcCoinFromRoute, srcCoins, inCoin]);

  useEffect(() => {
    if (dstCoin) {
      return;
    }

    let routeCoin, defaultCoin;
    for (const coin of dstCoins) {
      if (coin.default) {
        defaultCoin = coin;
      }
      if (coin.id === dstCoinFromRoute) {
        routeCoin = coin;
        break;
      }
    }

    setDstCoin(routeCoin ?? defaultCoin ?? dstCoins[0]);
  }, [dstCoinFromRoute, dstCoins, dstCoin]);

  const balancesState = useAddressesBalance(inCoin?.id);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const {contractAddress, error: spenderError} = useGetSpenderForCoin(network?.id);

  const {
    request: requestApproval,
    error: approvalError,
    loading: approvalsLoading,
    approvals,
  } = useUnconfirmedApprovals(network?.id, inCoin?.id, address);

  const networkPattern: EthPattern | null = useMemo(() => {
    if (network?.id) {
      return patternService.createEthPattern(network?.id, addressService.getGetterDelegate(network?.id));
    }

    return null;
  }, [network?.id, patternService, addressService]);

  const coinPattern: Erc20Pattern | null = useMemo(() => {
    if (inCoin?.id && network?.id && inCoin.id !== network.id && !isLoading) {
      return patternService.createErc20Pattern(inCoin.id, addressService.getGetterDelegate(inCoin.id));
    }

    return null;
  }, [inCoin?.id, network?.id, isLoading, patternService, addressService]);

  const {
    error: allowanceError,
    errors: allowanceErrors,
    insufficientAmount,
    request: requestInsufficientApprovedAmount,
    isLoading: allowanceLoading,
  } = useInsufficientApprovedAmount(address, network?.id, inCoin?.id, inAmount);

  const {
    spentAmount: realSpentAmount,
    receiveAmount: realReceiveAmount,
    tx,
    error: txError,
    errors: txErrors,
    isLoading: txLoading,
    getSwapTx,
  } = useGetSwapTx();

  useEffect(() => {
    let canceled = false;
    networkPattern
      ?.getCurrentGasPrice()
      .then(r => {
        if (!canceled) {
          setGasPrice(r);
        }
      })
      .catch(e => {
        setError(t('internal error'));
        console.error(e);
      });
    return () => {
      canceled = true;
    };
  }, [t, networkPattern]);

  const {
    receiveAmount,
    error: getInfoError,
    errors: getInfoErrors,
    price,
  } = useGetSwapInfo({
    coin: network?.id,
    fromCoin: inCoin?.id,
    address: address,
    toCoin: dstCoin?.id,
    gasPrice: gasPrice?.gasPrice,
    amount: inAmount,
  });

  const showApproveConf = useCallback(() => setApproveConfIsShown(true), []);
  const hideApproveConf = useCallback(() => {
    setApproveConfIsShown(false);
    setLoading(false);
  }, []);
  const showSwapConf = useCallback(() => setSwapConfIsShown(true), []);
  const hideSwapConf = useCallback(() => setSwapConfIsShown(false), []);
  const showErrorModal = useCallback(() => setErrorModalIsShown(true), []);
  const hideErrorModal = useCallback(() => setErrorModalIsShown(false), []);
  const showSuccessModal = useCallback(() => setSuccessModalIsShown(true), []);
  const hideSuccessModal = useCallback(() => setSuccessModalIsShown(false), []);

  const setApprovingTimer = useCallback(() => {
    requestApproval();

    if (approvingTimer.current) {
      clearInterval(approvingTimer.current);
    }

    approvingTimer.current = setInterval(() => {
      requestApproval();
    }, APPROVE_INTERVAL_CHECK);
  }, [requestApproval]);

  const onApproveSubmit = useCallback(async () => {
    setLoading(true);
    if (
      !inCoin?.id ||
      !inAmount ||
      !address ||
      !contractAddress ||
      allowanceLoading ||
      !insufficientAmount ||
      !coinPattern
    ) {
      setLoading(false);
      return;
    }

    try {
      const approve = await coinPattern.approve(address, contractAddress, {transactionPriority: txPriority});

      setFee(makeRoundedBalance(6, approve.fee));
      setApproveTxs(approve.transactions);
      showApproveConf();
    } catch (e) {
      setLoading(false);
      setError(t('internal error'));
      return;
    }
  }, [
    inCoin?.id,
    inAmount,
    address,
    contractAddress,
    allowanceLoading,
    insufficientAmount,
    coinPattern,
    txPriority,
    showApproveConf,
    t,
  ]);

  const onApproveAccept = useCallback(() => {
    if (
      !approveTxs ||
      approveTxs.length === 0 ||
      !network?.id ||
      !networkPattern ||
      !address ||
      !inCoin?.id ||
      !contractAddress ||
      approveSubmitting
    ) {
      return;
    }

    setApproveSubmitting(true);
    networkPattern
      .sendApproveTransactions(approveTxs, {
        address: address,
        coin: inCoin.id,
        contract: contractAddress,
      })
      .then(() => {
        setApproving(true);
        setApprovingTimer();
      })
      .catch(() => {
        if (approvingTimer.current) {
          clearInterval(approvingTimer.current);
        }
      })
      .finally(() => {
        setApproveSubmitting(false);
        hideApproveConf();
      });
  }, [
    approveTxs,
    network?.id,
    networkPattern,
    address,
    inCoin?.id,
    contractAddress,
    approveSubmitting,
    hideApproveConf,
    setApprovingTimer,
  ]);

  const onSwapAccept = useCallback(() => {
    const f = async () => {
      if (
        !dstCoin?.id ||
        !network?.id ||
        !(+inAmount > 0) ||
        !tx ||
        !networkPattern ||
        !inCoin?.id ||
        !realReceiveAmount ||
        error ||
        swapSubmitting
      ) {
        return;
      }

      setSwapSubmitting(true);

      const nonce = await networkPattern.getNonce(tx);
      const chainId = specService.getSpec(network?.id)?.chainId;

      const {gas, ...other} = tx;

      const signedTx = await networkPattern.signTransaction({
        ...other,
        nonce: nonce,
        gasLimit: gas,
        chainId: chainId,
      });

      try {
        await networkPattern.sendSwapTransactions([signedTx], {
          srcCoin: inCoin.id,
          srcAmount: inAmount,
          dstCoin: dstCoin.id,
          dstAmount: realReceiveAmount,
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
    };

    setLoading(true);
    f();
  }, [
    dstCoin?.id,
    network?.id,
    tx,
    networkPattern,
    inCoin?.id,
    realReceiveAmount,
    error,
    swapSubmitting,
    specService,
    showSuccessModal,
    inAmount,
    t,
    hideSwapConf,
  ]);

  const onSwapSubmit = useCallback(async () => {
    if (
      !network?.id ||
      !inCoin?.id ||
      !dstCoin?.id ||
      !inAmount ||
      +inAmount === 0 ||
      !slippageTolerance ||
      !address ||
      !networkPattern ||
      !gasPrice
    ) {
      return;
    }

    const realNetwork = coins.find(e => e.id === inCoin?.id)?.parent;

    if (inCoin.id !== network.id && realNetwork !== network.id) {
      return;
    }

    setBlocked(true);
    setSubmitSwap(true);

    await coinService.enablePregenedCoin(dstCoin.id);

    getSwapTx({
      coin: network?.id,
      fromCoin: inCoin.id,
      toCoin: dstCoin.id,
      amount: inAmount,
      slippage: slippageTolerance,
      allowPartialFill: false,
      gasPrice: gasPrice.gasPrice,
      address: address,
    });
  }, [
    network?.id,
    inCoin?.id,
    dstCoin?.id,
    inAmount,
    slippageTolerance,
    address,
    networkPattern,
    gasPrice,
    coins,
    coinService,
    getSwapTx,
  ]);

  const onAddressSelect = useCallback(
    (index: number) => {
      if (balancesState.balances[index]) {
        setAddressIndex(index);
        setAddress(balancesState.balances[index].address);
        setBalance(balancesState.balances[index].balance);
      }
    },
    [balancesState],
  );

  const onNetworkSelect = useCallback(
    (value: string) => {
      setInCoin(undefined);
      setFee(undefined);
      setSrcCoins([]);
      setDstCoin(undefined);
      setDstCoins([]);
      setNetwork(parentCoins?.find(p => p.id === value));
    },
    [parentCoins],
  );

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
  }, [navigation, hideSuccessModal]);

  useEffect(() => {
    if (!balancesState || !balancesState.balances || balancesState.balances.length === 0) {
      return;
    }

    if (!address && balancesState?.balances?.[0]) {
      setAddress(balancesState.balances[0].address);
      setBalance(balancesState.balances[0].balance);
      setAddressIndex(0);
      return;
    }

    const index = balancesState.balances.findIndex(e => e.address === address);
    if (index !== -1) {
      setBalance(balancesState.balances[index].balance);
      setAddressIndex(index);
    }
  }, [balancesState, address]);

  useEffect(() => {
    if (tx && network?.id && networkPattern && submitSwap && gasPrice) {
      const estimateFee = networkPattern.getFee(gasPrice, tx.gas, txPriority);
      const networkBalance = coins.find(c => c.id === network?.id)?.total || '0';
      if (stringNumberGt(networkBalance, estimateFee)) {
        setFee(makeRoundedBalance(6, estimateFee));
        showSwapConf();
      } else {
        setLoading(false);
        setError(t('insufficientNetworkFunds'));
      }

      setSubmitSwap(false);
      setBlocked(false);
    }
  }, [tx, network?.id, txPriority, networkPattern, submitSwap, coins, showSwapConf, t, gasPrice]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (getInfoError === 'insufficient liquidity' || txError === 'insufficient liquidity') {
      setError(t('insufficientLiquidity'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if (txError === 'insufficient funds') {
      setError(`${t('insufficientNetworkFunds')} ${network?.id}`);
      setLoading(false);
      setBlocked(false);
      return;
    }

    if (txError === 'cannot estimate' || getInfoError === 'cannot estimate') {
      setError(t('sleepingToleranceError'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if (txError === 'not enough allowance') {
      setError(t('notEnoughAllowance'));
      setLoading(false);
      setBlocked(false);
      return;
    }

    if (
      networksError ||
      allowanceError ||
      allowanceErrors ||
      spenderError ||
      availableCoinsError ||
      availableCoinsErrors ||
      txError ||
      txErrors ||
      approvalError
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
    isLoading,
    network?.id,
  ]);

  useEffect(() => {
    setLoading(isLoading || allowanceLoading || txLoading || availableCoinsLoading);
  }, [isLoading, allowanceLoading, txLoading, availableCoinsLoading]);

  useEffect(() => {
    setDisabled(!network?.id || !inCoin?.id || !inAmount || !address || !!error || !stringNumberGt(inAmount, '0'));
  }, [network?.id, inCoin?.id, inAmount, address, error]);

  useEffect(() => {
    if (!approving) {
      requestInsufficientApprovedAmount();
    }
  }, [address, network?.id, inCoin?.id, approving, requestInsufficientApprovedAmount]);

  useEffect(() => {
    if (!approvalsLoading) {
      if (approvals && approvals.length > 0) {
        setApproving(true);
        setWaitSwapProvider(true);
      } else {
        if (approvingTimer.current) {
          clearInterval(approvingTimer.current);
        }

        setApproving(false);
      }
    }
  }, [approvals, approvalsLoading, requestInsufficientApprovedAmount]);

  useEffect(() => {
    if (initialized) {
      return;
    }
    setApprovingTimer();
    setInitialized(true);
  }, [initialized, setApprovingTimer]);

  useEffect(() => {
    return () => {
      if (approvingTimer.current) {
        clearInterval(approvingTimer.current);
      }

      if (waitSwapProviderTimer.current) {
        clearInterval(waitSwapProviderTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inCoin?.id && dstCoin?.id && inCoin.id === dstCoin.id) {
      setError(t('sameSwap'));
    } else {
      setError(undefined);
    }
  }, [inCoin?.id, network?.id, dstCoin?.id, inAmount, address, t]);

  useEffect(() => {
    if (inAmount && balance && stringNumberGt(inAmount, balance)) {
      setError(t('Insufficient funds'));
    }
  }, [inAmount, balance, t]);

  useEffect(() => {
    setInAmount('0.0');
  }, [inCoin?.id]);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (!balancesState.isLoading) {
        balancesState.request();
      }

      requestInsufficientApprovedAmount();
    });
  }, [navigation, balancesState.isLoading, balancesState.request, balancesState, requestInsufficientApprovedAmount]);

  useEffect(() => {
    if (!insufficientAmount && !allowanceLoading) {
      if (waitSwapProviderTimer.current) {
        clearInterval(waitSwapProviderTimer.current);
      }
      setWaitSwapProvider(false);
    }
  }, [insufficientAmount, allowanceLoading]);

  useEffect(() => {
    if (waitSwapProvider && !approving && !waitSwapProviderTimer.current) {
      waitSwapProviderTimer.current = setInterval(() => {
        requestInsufficientApprovedAmount();
      }, APPROVE_INTERVAL_CHECK);
    }
  }, [waitSwapProvider, approving, requestInsufficientApprovedAmount]);

  const showSettings = useCallback(() => setSettingsIsShown(true), []);
  const hideSettings = useCallback(() => setSettingsIsShown(false), []);

  const onSettingsChange = useCallback(
    (speed: TransactionPriority, value: number) => {
      setSlippageTolerance(value);
      setTxPriority(speed);
      hideSettings();
    },
    [hideSettings],
  );

  const onSrcCoinSelect = useCallback(
    (id: string) => {
      setInCoin(srcCoins?.find(c => c.id === id));
    },
    [srcCoins],
  );

  const onDstCoinSelect = useCallback(
    (id: string) => {
      setDstCoin(dstCoins?.find(c => c.id === id));
    },
    [dstCoins],
  );

  const dstBalance = useResultBalance(dstCoin?.id || '', address, receiveAmount);

  return (
    <Screen
      title={t('exchange')}
      controls={
        <TouchableOpacity style={styles.button} onPress={showSettings}>
          <CustomIcon name={'settings-outline'} size={20} color={theme.colors.textLightGray3} />
        </TouchableOpacity>
      }
      titleContainerStyle={styles.headerTitleContainer}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scroll}>
        <View style={styles.swapBlock}>
          <NetworkSelector
            value={network?.id}
            networks={networkOptions}
            onSelect={onNetworkSelect}
            containerStyle={styles.network}
            label={t('blockchain')}
          />
          <SourceCoinElement
            balance={balance || '0'}
            ticker={inCoin?.ticker || ''}
            containerStyle={styles.srcBlock}
            amount={inAmount}
            onAmountChange={setInAmount}
            coins={srcCoins}
            onCoinSelect={onSrcCoinSelect}
            logo={inCoin?.logo}
          />
          <View style={styles.swapButton}>
            <CustomIcon name={'exchange1'} color={theme.colors.green} size={18} />
          </View>
          <DestinationCoinElement
            ticker={dstCoin?.ticker || ''}
            amount={makeRoundedBalance(6, receiveAmount || '0')}
            containerStyle={styles.destBlock}
            coins={dstCoins}
            onCoinSelect={onDstCoinSelect}
            logo={dstCoin?.logo}
            balance={dstBalance}
          />
          <AddressSelector
            label={t('From account')}
            containerStyle={styles.addressSelector}
            addresses={balancesState.balances}
            onSelect={onAddressSelect}
            selectedAddress={addressIndex}
            ticker={inCoin?.ticker || ''}
            baseTicker={network?.ticker}
          />
        </View>
        <View style={styles.priceView}>
          <Text style={styles.price}>{!!price && price !== '0' && t('price')}</Text>
          <Text style={styles.price}>
            {!!price &&
              price !== '0' &&
              `${makeRoundedBalance(4, price)} ${inCoin?.ticker} ${t('per')} 1 ${dstCoin?.ticker}`}
          </Text>
        </View>
        {approving || waitSwapProvider ? (
          <View style={styles.approvingView}>
            <CustomIcon name={'timer'} size={20} color={theme.colors.white} />
            <Text style={styles.approvingText}>{t('approving')}</Text>
          </View>
        ) : insufficientAmount ? (
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
        )}
        <Text style={styles.error}>{error}</Text>
        <ApproveConfirmationModal
          visible={approveConfIsShown}
          onCancel={hideApproveConf}
          onAccept={onApproveAccept}
          contract={contractAddress || ''}
          fee={fee || ''}
          loading={approveSubmitting}
          feeTicker={network?.ticker || ''}
        />
        <SwapConfirmationModal
          visible={swapConfIsShown}
          onCancel={hideSwapConf}
          onAccept={onSwapAccept}
          contract={contractAddress || ''}
          fee={fee || ''}
          srcCoin={inCoin?.ticker || ''}
          srcLogo={inCoin?.logo}
          srcAmount={makeRoundedBalance(4, realSpentAmount || '0')}
          dstCoin={dstCoin?.ticker || ''}
          dstLogo={dstCoin?.logo}
          dstAmount={makeRoundedBalance(4, realReceiveAmount || '0')}
          loading={swapSubmitting}
          feeTicker={network?.ticker || ''}
        />
        <WarningModal
          title={t('internal error')}
          visible={errorModalIsShown}
          onCancel={hideErrorModal}
          description={t('internalErrorDesc')}
        />
        <SwapSuccessModal visible={successModalIsShown} onCancel={hideSuccessModal} onAccept={onFinish} />
      </KeyboardAwareScrollView>
      {settingsIsShown && (
        <SettingsModal
          speed={txPriority}
          slippageTolerance={slippageTolerance}
          visible={settingsIsShown}
          onCancel={hideSettings}
          onAccept={onSettingsChange}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
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
    width: Layout.isSmallDevice ? 32 : 40,
    height: Layout.isSmallDevice ? 32 : 40,
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
    marginBottom: -12,
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
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  destBlock: {
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
    justifyContent: 'flex-start',
  },
  network: {
    marginBottom: 12,
    height: 70,
  },
  headerTitleContainer: {
    marginRight: Layout.isSmallDevice ? -32 : -40,
  },
});

export default SwapScreen;
