import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useTranslation from '../../utils/use-translation';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import SendView, {Recipient, RecipientUpdatingData} from '../../components/coin-send/send-view';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import AlertRow from '../../components/error/alert-row';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationSendModal from '../../components/coin-send/confirmation-modal';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import {useCoinSpecsService, useDidUpdateEffect} from '@slavi/wallet-core';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useVoutValidator from '@slavi/wallet-core/src/validation/hooks/use-vout-validator';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import SolidButton from '../../components/buttons/solid-button';
import AddressSelector from '../../components/buttons/address-selector';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import AbsurdlyHighFee from '@slavi/wallet-core/src/services/errors/absurdly-high-fee';
import TxCreatingResult from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import ScrollableScreen from '../../components/scrollable-screen';
import {SolanaSplPattern} from '@slavi/wallet-core/src/services/coin-pattern/solana-spl-pattern';
import SolanaPattern from '@slavi/wallet-core/src/services/coin-pattern/solana-pattern';

export interface SendSolanaBasedScreenProps {
  coin: string;
  pattern: SolanaPattern | SolanaSplPattern;
}

const SendSolanaBasedScreen = (props: SendSolanaBasedScreenProps) => {
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

  const [recipient, setRecipient] = useState<Recipient>({
    address: '',
    amount: '',
  });
  const [recipientPayFee, setRecipientPayFee] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [voutError, setVoutError] = useState<VoutError>();
  const [locked, setLocked] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<TxCreatingResult | null>(null);
  const [sendingLocked, setSendingLocked] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [activeQR, setActiveQR] = useState<boolean>(false);
  const [senderIndex, setSenderIndex] = useState<number>();

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

      setIsValid(result.isValid);
      const tmp: VoutError = {address: [], amount: []};
      if (result.address) {
        tmp.address.push(result.address);
      }
      if (result.amount) {
        tmp.amount.push(result.amount);
      }
      setVoutError(tmp);

      return result.isValid;
    },
    [recipient, validator],
  );

  const onRecipientChange = useCallback((data: RecipientUpdatingData) => {
    setRecipient(p => ({
      address: typeof data.address === 'undefined' ? p.address : data.address,
      amount: typeof data.amount === 'undefined' ? p.amount : data.amount,
    }));
    setRecipientPayFee(false);
  }, []);

  const addError = useCallback((error: string) => {
    setIsValid(false);
    setErrors(p => [...p, error]);
  }, []);

  const createTransaction = useCallback(async (): Promise<boolean> => {
    setLocked(true);
    if (!validate(true)) {
      setLocked(false);
      return false;
    }

    if (!fromAddress) {
      addError(t('Source address not specified'));
      return false;
    }

    let result;
    try {
      result = await props.pattern.createTransfer(
        [
          {
            address: recipient.address,
            amount: recipient.amount,
          },
        ],
        {
          from: fromAddress,
          receiverPaysFee: recipientPayFee,
        },
      );
    } catch (e) {
      if (e instanceof InsufficientFunds) {
        let text = t('serverInsufficientFunds');

        if (coinDetails.parent && e.coin === coinDetails.parent) {
          text += ` (${coinDetails.parentName})`;
        }
        addError(text);
        return false;
      }

      setLocked(false);
      if (e instanceof CreateTransactionError) {
        addError(t('Can not create transaction. Try latter or contact support.'));
        return false;
      }
      if (e instanceof AbsurdlyHighFee) {
        addError(t('Can not create transaction. absurdly high fee.'));
        return false;
      }

      throw e;
    }

    if (!result) {
      setLocked(false);
      return false;
    }

    setTxResult(result);
    return true;
  }, [
    addError,
    coinDetails.parent,
    coinDetails.parentName,
    fromAddress,
    props.pattern,
    recipient.address,
    recipient.amount,
    recipientPayFee,
    t,
    validate,
  ]);

  const onSubmit = useCallback(async () => {
    try {
      if (await createTransaction()) {
        setConfIsShown(true);
      } else {
        setLocked(false);
      }
    } catch (e) {
      SimpleToast.showWithGravity((e as Error).toString(), SimpleToast.LONG, SimpleToast.TOP);
      setLocked(false);
    }
  }, [createTransaction]);

  const cancelConfirmSending = useCallback(() => {
    setConfIsShown(false);
    setLocked(false);
  }, []);

  const send = useCallback(async () => {
    if (sendingLocked) {
      return;
    }
    setSendingLocked(true);
    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }

    try {
      await props.pattern.sendTransactions(txResult.transactions);
    } catch (e) {
      addError(t('Error of broadcast tx. Try again latter or contact support'));
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
  }, [
    addError,
    cancelConfirmSending,
    coinDetails.id,
    navigation,
    props.pattern,
    recipient,
    sendingLocked,
    t,
    txResult,
  ]);

  useDidUpdateEffect(() => validate(), [recipient, validate]);

  useEffect(() => {
    if (isValid) {
      setErrors([]);
    }
  }, [isValid]);

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
          maximumPrecision={props.pattern.getMaxPrecision()}
        />
      </View>
      {!isValid && errors.length > 0 && (
        <View style={styles.errors}>
          {errors.map((error, index) => (
            <AlertRow text={error} key={'general_error_' + index} />
          ))}
        </View>
      )}
      <View style={styles.submitButton}>
        <SolidButton title={t('Send')} onPress={onSubmit} disabled={!isValid || locked} loading={locked} />
      </View>
      <QrReaderModal visible={activeQR} onQRRead={onQRRead} onClose={() => setActiveQR(false)} />
      <ConfirmationSendModal
        visible={confIsShown}
        vouts={txResult?.vouts || []}
        fee={txResult?.fee}
        onAccept={send}
        onCancel={cancelConfirmSending}
        ticker={coinDetails.ticker}
        feeTicker={coinDetails.parentTicker || coinDetails.ticker}
      />
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 16,
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

export default SendSolanaBasedScreen;
