import useTranslation from '../../utils/use-translation';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {useAddressesService, useCoinPatternService, useCoinSpecsService, useDidUpdateEffect} from '@slavi/wallet-core';
import React, {useCallback, useMemo, useState} from 'react';
import SendView, {Recipient, RecipientUpdatingData} from '../../components/coin-send/send-view';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import {StyleSheet, View} from 'react-native';
import AlertRow from '../../components/error/alert-row';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import AddressSelector from '../../components/buttons/address-selector';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import PolkadotPattern from '@slavi/wallet-core/src/services/coin-pattern/polkadot-pattern';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ExistentialDepositError from '@slavi/wallet-core/src/services/errors/existential-deposit-error';
import KeepAliveConfirmationModal from '../../components/coin-send/keep-alive-confirmation-modal';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import useVoutValidator from '@slavi/wallet-core/src/validation/hooks/use-vout-validator';
import TxCreatingResult from '@slavi/wallet-core/src/services/transaction/tx-creating-result';
import ScrollableScreen from '../../components/scrollable-screen';

export interface SendPolkadotScreenProps {
  coin: string;
}

const SendPolkadotScreen = (props: SendPolkadotScreenProps) => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const coinDetails = useCoinDetails(props.coin);
  if (!coinDetails) {
    throw new Error('Unknown coin for details display');
  }

  const coinSpecService = useCoinSpecsService();
  const coinPatternService = useCoinPatternService();
  const addressService = useAddressesService();

  const coinSpec = coinSpecService.getSpec(props.coin);
  if (!coinSpec) {
    throw new Error('Unable get coin spec for coin ' + props.coin);
  }

  const [activeQR, setActiveQR] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<Recipient>({
    address: '',
    amount: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [voutError, setVoutError] = useState<VoutError>();
  const [locked, setLocked] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<TxCreatingResult | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const balancesState = useAddressesBalance(props.coin);
  const [senderIndex, setSenderIndex] = useState<number>();
  const [keepAliveConfirm, setKeepAliveConfirm] = useState<boolean>(false);
  const [receiverPaysFee, setReceiverPaysFee] = useState<boolean>(false);

  const fromAddress = typeof senderIndex !== 'undefined' ? balancesState.balances[senderIndex]?.address : undefined;
  const accountBalance =
    typeof senderIndex !== 'undefined' && typeof balancesState.balances[senderIndex]?.balance !== 'undefined'
      ? balancesState.balances[senderIndex].balance
      : '0';

  const validator = useVoutValidator(props.coin, accountBalance);

  const pattern: PolkadotPattern = useMemo(
    () => coinPatternService.createPolkadotPattern(props.coin, addressService.getGetterDelegate(props.coin)),
    [addressService, coinPatternService, props.coin],
  );

  const enableReceiverPaysFee = useCallback(() => setReceiverPaysFee(true), []);

  const onRecipientChange = (data: RecipientUpdatingData) => {
    setRecipient({
      address: typeof data.address === 'undefined' ? recipient.address : data.address,
      amount: typeof data.amount === 'undefined' ? recipient.amount : data.amount,
    });
  };

  const addError = useCallback((error: string) => {
    setIsValid(false);
    setErrors(p => [...p, error]);
  }, []);

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

  const createTransaction = useCallback(
    async (isKeepAlive: boolean = true): Promise<boolean> => {
      setLocked(true);
      if (validate(true)) {
        if (!pattern) {
          throw new Error('Try create transaction of unknown coin');
        }

        if (!fromAddress) {
          addError(t('Source address not specified'));
          return false;
        }

        let result;
        try {
          result = await pattern.transfer(fromAddress, {
            recipient: recipient.address,
            amount: recipient.amount,
            isKeepAlive: isKeepAlive,
            tip: '0', // TODO: from user
            receiverPaysFee: receiverPaysFee,
          });
        } catch (e) {
          setLocked(false);
          if (e instanceof CreateTransactionError) {
            addError(t('Can not create transaction. Try latter or contact support.'));
            return false;
          }
          if (e instanceof ExistentialDepositError) {
            setKeepAliveConfirm(true);
            return false;
          }
          throw e;
        }

        if (!result) {
          SimpleToast.show(t('Error of transaction creating'));
          return false;
        }

        setTxResult(result);
        return true;
      }

      return false;
    },
    [addError, fromAddress, pattern, receiverPaysFee, recipient.address, recipient.amount, t, validate],
  );

  const onSubmit = useCallback(async () => {
    setLocked(true);
    setTimeout(async () => {
      if (!validate(true)) {
        setLocked(false);
        return;
      }

      try {
        if (await createTransaction(true)) {
          setConfIsShown(true);
        } else {
          setLocked(false);
        }
      } catch (e) {
        setLocked(false);
      }
    }, 300);
  }, [createTransaction, validate]);

  const onQrReadFailed = useCallback(() => SimpleToast.show(t('Can not read qr')), [t]);

  const onQRRead = useCallback(
    (data: any) => {
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

      setActiveQR(false);
      setRecipient({
        ...recipient,
        address: parsed.address || '',
        amount: parsed.amount || '',
      });
    },
    [coinSpec.bip21Name, onQrReadFailed, recipient],
  );

  const cancelConfirmSending = useCallback(() => {
    setConfIsShown(false);
    setLocked(false);
  }, []);

  const send = useCallback(async () => {
    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }
    try {
      await pattern.sendTransactions(txResult.transactions, {validToBlock: txResult.validToBlock});
    } catch (e) {
      addError(t('Error of broadcast tx. Try again latter or contact support'));
    } finally {
      setLocked(false);
      cancelConfirmSending();
    }

    navigation.navigate(ROUTES.COINS.SUCCESSFULLY_SENDING, {
      recipients: [recipient],
      coin: coinDetails.id,
    });
  }, [addError, cancelConfirmSending, coinDetails.id, navigation, pattern, recipient, t, txResult]);

  const onKeepAliveConfirm = useCallback(async () => {
    if (await createTransaction(false)) {
      setConfIsShown(true);
      setKeepAliveConfirm(false);
    }
  }, [createTransaction]);
  const onKeepAliveDecline = useCallback(() => {
    setKeepAliveConfirm(false);
  }, []);

  useDidUpdateEffect(() => validate(), [recipient, validate]);

  return (
    <ScrollableScreen title={t('Send coins')} containerStyle={styles.scroll}>
      <View>
        <CoinBalanceHeader
          balance={accountBalance}
          name={coinDetails.name}
          cryptoBalance={coinDetails.spendableCryptoBalance}
          cryptoTicker={coinDetails.crypto}
          fiatBalance={coinDetails.spendableFiatBalance}
          fiatTicker={coinDetails.fiat}
          logo={coinDetails.logo}
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
          coin={coinDetails.ticker}
          balance={accountBalance}
          recipient={recipient}
          onRecipientChange={onRecipientChange}
          maxIsAllowed={true}
          setRecipientPayFee={enableReceiverPaysFee}
          errors={voutError}
          maximumPrecision={pattern.getMaxPrecision()}
        />
        {!isValid && errors.length > 0 && (
          <View style={styles.errors}>
            {errors.map((error, index) => (
              <AlertRow text={error} key={'general_error_' + index} />
            ))}
          </View>
        )}
      </View>
      <View style={styles.submitButton}>
        <SolidButton title={t('Send')} onPress={onSubmit} disabled={!isValid || locked} loading={locked} />
      </View>
      <QrReaderModal visible={activeQR} onQRRead={onQRRead} onClose={() => setActiveQR(false)} />
      <ConfirmationModal
        visible={confIsShown}
        vouts={txResult?.vouts || []}
        fee={txResult?.fee}
        onAccept={send}
        onCancel={cancelConfirmSending}
        ticker={coinDetails.ticker}
        feeTicker={coinDetails.ticker}
      />
      <KeepAliveConfirmationModal
        visible={keepAliveConfirm}
        onConfirm={onKeepAliveConfirm}
        onCancel={onKeepAliveDecline}
      />
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingBottom: 16,
  },
  errors: {
    marginTop: 30,
  },
  addressSelector: {
    marginBottom: 8,
  },
  gradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
  },
});

export default SendPolkadotScreen;
