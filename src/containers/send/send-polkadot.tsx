import {useTranslation} from 'react-i18next';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {
  useAddressesService,
  useCoinPatternService,
  useCoinSpecsService,
  useDidUpdateEffect,
} from '@slavi/wallet-core';
import useSpendableBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-spendable-balance';
import React, {useCallback, useState} from 'react';
import SendView, {
  Recipient,
  RecipientUpdatingData,
} from '../../components/coin-send/send-view';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import AlertRow from '../../components/error/alert-row';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import useTxVoutsValidator, {
  VoutError,
} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import TxCreatingResult from '@slavi/wallet-core/types/services/transaction/tx-creating-result';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import except from '@slavi/wallet-core/src/utils/typed-error/except';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import AddressSelector from '../../components/buttons/address-selector';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import PolkadotPattern from '@slavi/wallet-core/src/services/coin-pattern/polkadot-pattern';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import SolidButton from '../../components/buttons/solid-button';

export interface SendPolkadotScreenProps {
  coin: string;
}

const SendPolkadotScreen = (props: SendPolkadotScreenProps) => {
  const {t} = useTranslation();
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

  const balance: string = useSpendableBalance(props.coin);

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
  const validator = useTxVoutsValidator(props.coin);
  const balancesState = useAddressesBalance(props.coin);
  const [senderIndex, setSenderIndex] = useState<number>();

  const fromAddress =
    typeof senderIndex !== 'undefined'
      ? balancesState.balances[senderIndex]?.address
      : undefined;
  const accountBalance =
    typeof senderIndex !== 'undefined' &&
    typeof balancesState.balances[senderIndex]?.balance !== 'undefined'
      ? balancesState.balances[senderIndex].balance
      : '0';

  const pattern: PolkadotPattern = coinPatternService.createPolkadotPattern(
    props.coin,
    addressService.getGetterDelegate(props.coin),
  );

  const onRecipientChange = (data: RecipientUpdatingData) => {
    setRecipient({
      address: data.address || recipient.address,
      amount: data.amount || recipient.amount,
    });
  };

  const addError = (error: string) => {
    setIsValid(false);
    setErrors([...errors, error]);
  };

  const onSubmit = async () => {
    setLocked(true);
    if (validate()) {
      if (!pattern) {
        throw new Error('Try create transaction of unknown coin');
      }

      if (!fromAddress) {
        console.log('Source address not specified');
        addError(t('Source address not specified'));
        return;
      }

      let result;
      try {
        result = await pattern.transfer(fromAddress, {
          recipient: recipient.address,
          amount: recipient.amount,
          isKeepAlive: false,
          tip: '0', // TODO: from user
        });
      } catch (e) {
        setLocked(false);
        const err1 = except<CreateTransactionError>(CreateTransactionError, e);
        if (err1) {
          addError(
            t('Can not create transaction. Try latter or contact support.'),
          );
        }
        throw e;
      }

      if (!result) {
        SimpleToast.show(t('Error of transaction creating'));
        return;
      }

      console.log(result);
      setConfIsShown(true);
      setTxResult(result);
    }
  };

  const onQrReadFailed = useCallback(
    () => SimpleToast.show(t('Can not read qr')),
    [t],
  );

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

  const cancelConfirmSending = () => {
    setConfIsShown(false);
    setLocked(false);
  };

  const send = async () => {
    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }
    try {
      await pattern.sendTransactions(txResult.transactions);
    } catch (e) {
      addError(t('Error of broadcast tx. Try again latter or contact support'));
    } finally {
      cancelConfirmSending();
    }
  };

  const validate = useCallback((): boolean => {
    const result = validator({
      vouts: [recipient],
      recipientPayFee: false,
    });

    setIsValid(result.isSuccess());
    setErrors(result.getErrors());
    const voutErrors = result.getVoutErrors();
    // Пока что решили без transferMany принудительно достаем из 0-его индекса
    if (voutErrors[0]) {
      setVoutError(voutErrors[0]);
    }

    return result.isSuccess();
  }, [recipient, validator]);

  useDidUpdateEffect(() => validate(), [recipient, validate]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient {...theme.gradients.backgroundGradient} style={styles.gradient}>
        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.scroll}>
          <View>
            <CoinBalanceHeader
              balance={balance}
              name={coinDetails.name}
              cryptoBalance={coinDetails.spendableCryptoBalance}
              cryptoTicker={coinDetails.crypto}
              fiatBalance={coinDetails.spendableFiatBalance}
              fiatTicker={coinDetails.fiat}
              logo={coinDetails.logo}
            />
            <View style={styles.paddingContainer}>
              <AddressSelector
                placeholder={t('From account')}
                containerStyle={styles.addressSelector}
                addresses={balancesState.balances}
                onSelect={setSenderIndex}
                selectedAddress={senderIndex}
              />
              <SendView
                readQr={() => setActiveQR(true)}
                coin={coinDetails.ticker}
                balance={balance}
                recipient={recipient}
                onRecipientChange={onRecipientChange}
                maxIsAllowed={true}
                setRecipientPayFee={() => {}}
                errors={voutError}
              />
              {!isValid && errors.length > 0 && (
                <View style={styles.errors}>
                  {errors.map((error, index) => (
                    <AlertRow text={error} key={'general_error_' + index} />
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.submitButton}>
            <SolidButton
              title={t('Send')}
              onPress={onSubmit}
              disabled={!isValid || locked}
              loading={locked}
            />
          </View>
          <QrReaderModal
            visible={activeQR}
            onQRRead={onQRRead}
            onClose={() => setActiveQR(false)}
          />
          <ConfirmationModal
            visible={confIsShown}
            vouts={txResult?.vouts || []}
            fee={txResult?.fee}
            onAccept={send}
            onCancel={cancelConfirmSending}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingBottom: 16,
  },
  errors: {
    marginTop: 30,
  },
  addressSelector: {},
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
  },
  paddingContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  }
});

export default SendPolkadotScreen;
