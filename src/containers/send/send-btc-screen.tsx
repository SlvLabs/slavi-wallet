import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import SendManyView from '../../components/coin-send/send-many-view';
import {useAddressesService, useCoinPatternService, useCoinSpecsService, useDidUpdateEffect} from '@slavi/wallet-core';
import useSpendableBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-spendable-balance';
import {Recipient} from '../../components/coin-send/send-view';
import useTranslation from '../../utils/use-translation';
import useTxVoutsValidator, {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import AlertRow from '../../components/error/alert-row';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import SimpleToast from 'react-native-simple-toast';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import TxPriorityButtonGroup from '../../components/coin-send/tx-priority-button-group';
import SolidButton from '../../components/buttons/solid-button';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import AbsurdlyHighFee from '@slavi/wallet-core/src/services/errors/absurdly-high-fee';
import TxCreatingResult from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import ScrollableScreen from '../../components/scrollable-screen';

export interface SendBtcScreenProps {
  coin: string;
}

const defaultRecipient: Recipient = {
  address: '',
  amount: '',
};

const SendBtcScreen = (props: SendBtcScreenProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [activeQR, setActiveQR] = useState<number>(-1);
  const [recipients, setRecipients] = useState<Recipient[]>([defaultRecipient]);
  const [recipientPayFee, setRecipientPayFee] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [voutErrors, setVoutErrors] = useState<{[index: number]: VoutError}>({});
  const [locked, setLocked] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<TxCreatingResult | null>(null);
  const [txPriority, setTxPriority] = useState<TransactionPriority>(TransactionPriority.average);

  const coinDetails = useCoinDetails(props.coin);
  if (!coinDetails) {
    throw new Error('Unknown coin for details display');
  }
  const addressService = useAddressesService();
  const coinSpec = useCoinSpecsService().getSpec(props.coin);
  if (!coinSpec) {
    throw new Error('Unable get coin spec for coin ' + props.coin);
  }

  const balance: string = useSpendableBalance(props.coin);
  const validator = useTxVoutsValidator(props.coin);
  const coinPatternService = useCoinPatternService();
  const readQr = useCallback((index: number): void => setActiveQR(index), []);

  const pattern = useMemo(
    () =>
      coinPatternService.createBtcPattern(
        props.coin,
        addressService.getGetterDelegate(props.coin),
        addressService.getCreatorDelegate(props.coin),
      ),
    [addressService, coinPatternService, props.coin],
  );

  const onQrReadFailed = useCallback(() => SimpleToast.show(t('Can not read qr')), [t]);

  const onQRRead = useCallback(
    (data: string) => {
      let parsed: QrData | undefined;
      try {
        parsed = parseDataFromQr(data, coinSpec.bip21Name);
      } catch (e) {
        onQrReadFailed();
        return;
      }

      if (!parsed) {
        onQrReadFailed();
        return;
      }

      setActiveQR(pQr => {
        setRecipients(p =>
          p.map((element, index) => {
            if (parsed && index === pQr) {
              return {
                ...element,
                address: parsed.address || '',
                amount: parsed.amount || '',
              };
            }
            return element;
          }),
        );
        return -1;
      });
    },
    [coinSpec.bip21Name, onQrReadFailed],
  );

  const validate = useCallback(
    (strict?: boolean): boolean => {
      const result = validator(
        {
          vouts: recipients,
          recipientPayFee: recipientPayFee,
        },
        strict,
      );

      setIsValid(result.isSuccess());
      setErrors(result.getErrors());
      setVoutErrors(result.getVoutErrors());

      return result.isSuccess();
    },
    [recipientPayFee, recipients, validator],
  );

  const onRecipientChange = useCallback((index: number, recipient: {address?: string; amount?: string}) => {
    setRecipients(p =>
      p.map((current, i) => {
        if (i === index) {
          const newRecipient = {...current};
          if (typeof recipient.address !== 'undefined') {
            newRecipient.address = recipient.address;
          }
          if (typeof recipient.amount !== 'undefined') {
            setRecipientPayFee(pp => (p.length !== 1 ? false : pp && recipient.amount === newRecipient.amount));
            newRecipient.amount = recipient.amount;
          }

          return newRecipient;
        }
        return current;
      }),
    );
  }, []);

  const onRecipientAdd = useCallback(() => setRecipients(p => [...p, {...defaultRecipient}]), []);

  const onRecipientRemove = useCallback((index: number) => setRecipients(p => p.filter((_, i) => i !== index)), []);

  const trySetRecipientPayFee = useCallback(() => {
    if (recipients.length > 1) {
      return;
    }
    setRecipientPayFee(true);
  }, [recipients.length]);

  const addError = useCallback((error: string) => {
    setIsValid(false);
    setErrors(p => [...p, error]);
  }, []);

  const onSubmit = useCallback(async () => {
    setLocked(true);
    if (validate(true)) {
      if (!pattern) {
        throw new Error('Try create transaction of unknown coin');
      }

      let result;
      try {
        result = await pattern
          .createTransactions([...recipients], {
            receiverPaysFee: recipientPayFee,
            txPriority: txPriority,
          })
          // try to recreate tx if on slow fee result is not good
          .catch(e => {
            if (
              e instanceof CreateTransactionError &&
              e.message === 'Fee is less than minimal' &&
              txPriority === TransactionPriority.slow
            ) {
              return pattern.createTransactions([...recipients], {
                receiverPaysFee: recipientPayFee,
                txPriority: TransactionPriority.average,
              });
            }
            throw e;
          });
      } catch (e) {
        if (e instanceof InsufficientFunds) {
          addError(t('serverInsufficientFunds'));
        } else {
          setLocked(false);
          if (e instanceof CreateTransactionError) {
            addError(t('Can not create transaction. Try latter or contact support.'));
          } else {
            if (e instanceof AbsurdlyHighFee) {
              addError(t('Can not create transaction. absurdly high fee.'));
            }
          }
          throw e;
        }
        setLocked(false);
      }

      if (!result) {
        SimpleToast.show(t('Error of transaction creating'));
        return;
      }

      setConfIsShown(true);
      setTxResult(result);
    }
  }, [addError, pattern, recipientPayFee, recipients, t, txPriority, validate]);

  const cancelConfirmSending = useCallback(() => {
    setConfIsShown(false);
    setLocked(false);
  }, []);
  const send = useCallback(async () => {
    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }

    try {
      await pattern.sendTransactions(txResult.transactions);
    } catch (e) {
      addError(t('Error of broadcast tx. Try again latter or contact support'));
      return;
    } finally {
      setLocked(false);
      cancelConfirmSending();
    }

    navigation.navigate(ROUTES.COINS.SUCCESSFULLY_SENDING, {
      recipients: recipients,
      coin: coinDetails.id,
    });
  }, [addError, cancelConfirmSending, coinDetails.id, navigation, pattern, recipients, t, txResult]);

  useDidUpdateEffect(() => validate(), [recipients, validate]);

  return (
    <ScrollableScreen title={t('Send coins')} containerStyle={styles.scroll}>
      <CoinBalanceHeader
        balance={balance}
        name={coinDetails.name}
        cryptoBalance={coinDetails.spendableCryptoBalance}
        cryptoTicker={coinDetails.crypto}
        fiatBalance={coinDetails.spendableFiatBalance}
        fiatTicker={coinDetails.fiat}
        logo={coinDetails.logo}
        type={coinDetails.type}
        ticker={coinDetails.ticker}
      />
      <SendManyView
        readQr={readQr}
        coin={props.coin}
        ticker={coinDetails.ticker}
        balance={balance}
        recipients={recipients}
        onRecipientChange={onRecipientChange}
        onRecipientAdd={onRecipientAdd}
        onRecipientRemove={onRecipientRemove}
        setRecipientPayFee={trySetRecipientPayFee}
        errors={voutErrors}
        maximumPrecision={pattern.getMaxPrecision()}
      />
      <TxPriorityButtonGroup
        label={t('Transaction fee')}
        selectedIndex={txPriority}
        onSelected={setTxPriority}
        advancedIsAllowed={false}
      />
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
      <QrReaderModal visible={activeQR >= 0} onQRRead={onQRRead} onClose={() => setActiveQR(-1)} />
      <ConfirmationModal
        visible={confIsShown}
        vouts={txResult?.vouts || []}
        fee={txResult?.fee || '0'}
        onAccept={send}
        onCancel={cancelConfirmSending}
        ticker={coinDetails.ticker}
        feeTicker={coinDetails.ticker}
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
  scroll: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default SendBtcScreen;
