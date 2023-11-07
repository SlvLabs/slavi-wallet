import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import SendView, {Recipient, RecipientUpdatingData} from '../../components/coin-send/send-view';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import AlertRow from '../../components/error/alert-row';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import {useAddressesService, useCoinPatternService, useCoinSpecsService, useDidUpdateEffect} from '@slavi/wallet-core';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useVoutValidator from '@slavi/wallet-core/src/validation/hooks/use-vout-validator';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import TxPriorityButtonGroup from '../../components/coin-send/tx-priority-button-group';
import SolidButton from '../../components/buttons/solid-button';
import AddressSelector from '../../components/buttons/address-selector';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import AbsurdlyHighFee from '@slavi/wallet-core/src/services/errors/absurdly-high-fee';
import TxCreatingResult from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import ScrollableScreen from '../../components/scrollable-screen';
import makeRoundedBalance from '../../utils/make-rounded-balance';
import MinaFeeAdvancedModal from '../../components/modal/mina-fee-advanced-modal';
import SimpleInput from '../../components/controls/simple-input';

export interface SendMinaScreenProps {
  coin: string;
}

const SendMinaScreen = (props: SendMinaScreenProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const coinDetails = useCoinDetails(props.coin);
  if (!coinDetails) {
    throw new Error('Unknown coin for details display');
  }
  const coinSpecService = useCoinSpecsService();
  const coinSpec = coinSpecService.getSpec(props.coin);
  if (!coinSpec) {
    throw new Error('Unable get coin spec for coin ' + props.coin);
  }
  const addressService = useAddressesService();
  const coinPatternService = useCoinPatternService();
  const pattern = useMemo(
    () => coinPatternService.createMinaPattern(props.coin, addressService.getGetterDelegate(props.coin)),
    [addressService, coinPatternService, props.coin],
  );

  const [recipient, setRecipient] = useState<Recipient>({
    address: '',
    amount: '',
  });
  const [memo, setMemo] = useState<string>('');
  const [memoError, setMemoError] = useState<string>();
  const [recipientPayFee, setRecipientPayFee] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [voutError, setVoutError] = useState<VoutError>();
  const [locked, setLocked] = useState<boolean>(false);
  const [sendingLocked, setSendingLocked] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<TxCreatingResult | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [activeQR, setActiveQR] = useState<boolean>(false);
  const [senderIndex, setSenderIndex] = useState<number>();

  const [advancedModalIsShown, setAdvancedModalIsShown] = useState<boolean>(false);
  const [advancedFee, setAdvancedFee] = useState<string>();

  const [txPriority, _setTxPriority] = useState<TransactionPriority>(TransactionPriority.average);

  const setTxPriority = useCallback((newValue: TransactionPriority) => {
    setAdvancedFee(undefined);
    _setTxPriority(newValue);
  }, []);

  const balancesState = useAddressesBalance(props.coin);
  const fromAddress = typeof senderIndex !== 'undefined' ? balancesState.balances[senderIndex]?.address : undefined;
  const accountBalance =
    typeof senderIndex !== 'undefined' && typeof balancesState.balances[senderIndex]?.balance !== 'undefined'
      ? balancesState.balances[senderIndex].balance
      : '0';
  const validator = useVoutValidator(props.coin, accountBalance);

  const onQrReadFailed = useCallback(() => SimpleToast.show(t('Can not read qr')), [t]);

  const onQRRead = useCallback(
    (data: string) => {
      let parsed: QrData | undefined;
      let bip21Name = coinSpec.bip21Name;
      if (coinDetails.parent) {
        const coinParentSpec = coinSpecService.getSpec(coinDetails.parent);
        if (coinParentSpec) {
          bip21Name = coinParentSpec?.bip21Name;
        }
      }
      try {
        parsed = parseDataFromQr(data, bip21Name);
      } catch (e) {
        onQrReadFailed();
        return;
      }

      if (!parsed) {
        onQrReadFailed();
        return;
      }

      setActiveQR(false);
      setRecipient(p => ({
        ...p,
        address: parsed?.address || '',
        amount: parsed?.amount || '',
      }));
    },
    [coinDetails.parent, coinSpec.bip21Name, coinSpecService, onQrReadFailed],
  );

  const validate = useCallback(
    (strict?: boolean): boolean => {
      const result = validator(recipient.address, recipient.amount, strict);

      setIsValid(result.isValid && memo.length <= 32);
      if (memo.length > 32) {
        setMemoError(t('minaMemoIsTooLong'));
      } else {
        setMemoError(undefined);
      }
      const tmp: VoutError = {address: [], amount: []};
      if (result.address) {
        tmp.address.push(result.address);
      }
      if (result.amount) {
        tmp.amount.push(result.amount);
      }
      setVoutError(result.address || result.amount ? tmp : undefined);

      return result.isValid;
    },
    [memo.length, recipient.address, recipient.amount, t, validator],
  );

  const onRecipientChange = useCallback((data: RecipientUpdatingData) => {
    setRecipient(p => ({
      address: typeof data.address === 'undefined' ? p.address : data.address,
      amount: typeof data.amount === 'undefined' ? p.amount : data.amount,
    }));
    setRecipientPayFee(false);
  }, []);
  const setError = useCallback((error: string) => {
    setIsValid(false);
    setErrors([error]);
  }, []);

  const setWarn = useCallback((error: string) => {
    setErrors([error]);
  }, []);

  const onSubmit = async () => {
    setLocked(true);
    if (validate(true)) {
      if (!fromAddress) {
        setError(t('Source address not specified'));
        return;
      }

      let result;
      try {
        result = await pattern.createTransaction(recipient, fromAddress, {
          txPriority,
          receiverPaysFee: recipientPayFee,
          fee: advancedFee,
          memo,
        });
      } catch (e) {
        console.error(e);
        if (e instanceof InsufficientFunds) {
          setError(t('serverInsufficientFunds'));
        } else {
          setLocked(false);
          if (e instanceof CreateTransactionError) {
            if (e.message === 'Less than minimum amount') {
              setVoutError({amount: [t('minaMinSendForAccountActivation')], address: []});
            } else {
              setWarn(t('Can not create transaction. Try latter or contact support.'));
            }
            return;
          } else {
            if (e instanceof AbsurdlyHighFee) {
              setError(t('Can not create transaction. absurdly high fee.'));
              return;
            }
          }
          throw e;
        }
      }

      if (!result) {
        setLocked(false);
        return;
      }
      setErrors([]);
      setConfIsShown(true);
      setTxResult(result);
    } else {
      setLocked(false);
    }
  };
  const cancelConfirmSending = useCallback(() => {
    setConfIsShown(false);
    setLocked(false);
  }, []);
  const send = async () => {
    if (sendingLocked) {
      return;
    }

    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }

    setSendingLocked(true);
    try {
      await pattern.sendTransactions(txResult.transactions);
    } catch (e) {
      setWarn(t('Error of broadcast tx. Try again latter or contact support'));
      return;
    } finally {
      setSendingLocked(false);
      setLocked(false);
      cancelConfirmSending();
    }

    navigation.navigate(ROUTES.COINS.SUCCESSFULLY_SENDING, {
      recipients: [recipient],
      coin: coinDetails.id,
    });
  };

  const setAdvancedOptions = useCallback((fee?: string) => {
    setAdvancedFee(fee);
    setAdvancedModalIsShown(false);
  }, []);

  useDidUpdateEffect(() => validate(), [recipient, validate]);

  useEffect(() => {
    if (balancesState.balances.length === 1) {
      setSenderIndex(0);
    }
  }, [balancesState.balances.length]);

  const enableRecipientPaysFee = useCallback(() => setRecipientPayFee(true), []);

  return (
    <ScrollableScreen title={t('Send coins')} containerStyle={styles.scroll}>
      <View>
        <CoinBalanceHeader
          balance={accountBalance}
          name={coinDetails.name}
          cryptoTicker={coinDetails.crypto}
          fiatTicker={coinDetails.fiat}
          logo={coinDetails.logo}
          type={coinDetails.type}
          ticker={coinDetails.ticker}
        />
        <AddressSelector
          label={t('From account')}
          containerStyle={styles.addressSelector}
          addresses={balancesState.balances}
          onSelect={setSenderIndex}
          selectedAddress={senderIndex}
          ticker={coinDetails.ticker}
          baseTicker={coinDetails.parentTicker}
        />
        <SendView
          readQr={() => setActiveQR(true)}
          coin={coinDetails.id}
          ticker={coinDetails.ticker}
          balance={accountBalance}
          recipient={recipient}
          onRecipientChange={onRecipientChange}
          maxIsAllowed={true}
          setRecipientPayFee={enableRecipientPaysFee}
          errors={voutError}
          maximumPrecision={pattern.getMaxPrecision()}
        />
        <SimpleInput value={memo} onChange={setMemo} label={t('minaMemoInputLabel')} errorMessage={memoError} />
        <TxPriorityButtonGroup
          label={t('Transaction fee')}
          selectedIndex={txPriority}
          onSelected={setTxPriority}
          advancedIsAllowed={true}
          onAdvancedPress={() => setAdvancedModalIsShown(true)}
        />
        {errors.length > 0 && (
          <View style={styles.errors}>
            {errors.map((error, index) => (
              <AlertRow text={error} key={'general_error_' + index} />
            ))}
          </View>
        )}
      </View>
      <View style={styles.submitButton}>
        <SolidButton
          title={t('Send')}
          onPress={onSubmit}
          disabled={!isValid || locked}
          loading={locked || sendingLocked}
        />
      </View>
      <QrReaderModal visible={activeQR} onQRRead={onQRRead} onClose={() => setActiveQR(false)} />
      <ConfirmationModal
        visible={confIsShown}
        vouts={txResult?.vouts || []}
        fee={makeRoundedBalance(6, txResult?.fee)}
        onAccept={send}
        onCancel={cancelConfirmSending}
        ticker={coinDetails.ticker}
        feeTicker={coinDetails.parentTicker || coinDetails.ticker}
      />
      <MinaFeeAdvancedModal
        visible={advancedModalIsShown}
        onCancel={() => setAdvancedModalIsShown(false)}
        onAccept={setAdvancedOptions}
      />
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  errors: {
    padding: 32,
  },
  addressSelector: {
    marginBottom: 8,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default SendMinaScreen;
