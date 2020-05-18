import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import SendView, {
  Recipient,
  RecipientUpdatingData,
} from '../../components/coin-send/send-view';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import useSpendableBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-spendable-balance';
import AlertRow from '../../components/error/alert-row';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import TxCreatingResult from '@slavi/wallet-core/types/services/transaction/tx-creating-result';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';
import {useCoinSpecsService, useDidUpdateEffect} from '@slavi/wallet-core';
import useAddressesBalance from '@slavi/wallet-core/src/providers/ws/hooks/use-addresses-balance';
import useVoutValidator from '@slavi/wallet-core/src/validation/hooks/use-vout-validator';
import except from '@slavi/wallet-core/src/utils/typed-error/except';
import InsufficientFunds from '@slavi/wallet-core/src/services/errors/insufficient-funds';
import CreateTransactionError from '@slavi/wallet-core/src/services/errors/create-transaction-error';
import TransactionPriority from '@slavi/wallet-core/src/utils/transaction-priority';
import TxPriorityButtonGroup from '../../components/coin-send/tx-priority-button-group';
import EthFeeAdvancedModal from '../../components/modal/eth-fee-advanced-modal';
import EthPattern from '@slavi/wallet-core/src/services/coin-pattern/eth-pattern';
import Erc20Pattern from '@slavi/wallet-core/src/services/coin-pattern/erc-20-pattern';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import AddressSelector from '../../components/buttons/address-selector';
import ROUTES from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';

export interface SendEthScreenProps {
  coin: string;
  pattern: EthPattern | Erc20Pattern;
}

const SendEthBasedScreen = (props: SendEthScreenProps) => {
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

  const balance: string = useSpendableBalance(props.coin);

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
  const [isValid, setIsValid] = useState<boolean>(false);
  const [activeQR, setActiveQR] = useState<boolean>(false);
  const [senderIndex, setSenderIndex] = useState<number>();
  const [txPriority, setTxPriority] = useState<TransactionPriority>(
    TransactionPriority.average,
  );
  const [advancedModalIsShown, setAdvancedModalIsShown] =
    useState<boolean>(false);

  const [advancedGasPrice, setAdvancedGasPrice] = useState<string>();
  const [advancedGasLimit, setAdvancedGasLimit] = useState<string>();

  const balancesState = useAddressesBalance(props.coin);
  const fromAddress =
    typeof senderIndex !== 'undefined'
      ? balancesState.balances[senderIndex]?.address
      : undefined;
  const accountBalance =
    typeof senderIndex !== 'undefined' &&
    typeof balancesState.balances[senderIndex]?.balance !== 'undefined'
      ? balancesState.balances[senderIndex].balance
      : '0';
  const validator = useVoutValidator(props.coin, accountBalance);

  const onQrReadFailed = useCallback(
    () => SimpleToast.show(t('Can not read qr')),
    [t],
  );

  const onQRRead = useCallback(
    (data: any) => {
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
      setRecipient({
        ...recipient,
        address: parsed.address || '',
        amount: parsed.amount || '',
      });
    },
    [
      coinDetails.parent,
      coinSpec.bip21Name,
      coinSpecService,
      onQrReadFailed,
      recipient,
    ],
  );

  const validate = useCallback((): boolean => {
    const result = validator(recipient.address, recipient.amount);

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
  }, [recipient, validator]);

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
      if (!props.pattern) {
        throw new Error('Try create transaction of unknown coin');
      }

      if (!fromAddress) {
        addError(t('Source address not specified'));
        return;
      }

      let result;
      try {
        result = await props.pattern.createTransaction(recipient, fromAddress, {
          transactionPriority: TransactionPriority.average,
          receiverPaysFee: recipientPayFee,
          gasLimit: advancedGasLimit,
          gasPrice: advancedGasPrice,
        });
      } catch (e) {
        const err = except<InsufficientFunds>(InsufficientFunds, e);
        if (err) {
          addError(
            t(
              'Server returned error: Insufficient funds. Perhaps the balance of the wallet did not have time to update.',
            ),
          );
        } else {
          setLocked(false);
          const err1 = except<CreateTransactionError>(
            CreateTransactionError,
            e,
          );
          if (err1) {
            addError(
              t('Can not create transaction. Try latter or contact support.'),
            );
          }
          throw e;
        }
      }

      if (!result) {
        SimpleToast.show(t('Error of transaction creating'));
        return;
      }

      setConfIsShown(true);
      setTxResult(result);
    } else {
      setLocked(false);
    }
  };
  const cancelConfirmSending = () => {
    setConfIsShown(false);
    setLocked(false);
  };
  const send = async () => {
    if (!txResult) {
      throw new Error('Try send transaction before creating');
    }

    try {
      await props.pattern.sendTransactions(txResult.transactions);
    } catch (e) {
      addError(t('Error of broadcast tx. Try again latter or contact support'));
      return;
    } finally {
      cancelConfirmSending();
    }

    navigation.navigate(ROUTES.COINS.SUCCESSFULLY_SENDING, {
      recipients: [recipient],
      ticker: coinDetails.ticker,
    });
  };

  const setAdvancedOptions = (gasPrice?: string, gasLimit?: string) => {
    setAdvancedGasLimit(gasLimit);
    if (gasPrice) {
      setAdvancedGasPrice(EthPattern.gweiToWei(gasPrice));
    }
    setAdvancedModalIsShown(false);
  };

  useDidUpdateEffect(() => validate(), [recipient, validate]);

  const currentGasPrice =
    advancedGasPrice || props.pattern.getGasLimit(txPriority) || '0';
  const currentGasLimit =
    advancedGasLimit || props.pattern.getDefaultGasPrice();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <CoinBalanceHeader
          balance={accountBalance}
          name={coinDetails.name}
          cryptoTicker={coinDetails.crypto}
          fiatTicker={coinDetails.fiat}
          logo={coinDetails.logo}
        />
        <AddressSelector
          placeholder={t('From account')}
          containerStyle={styles.addressSelector}
          addresses={balancesState.balances}
          onSelect={setSenderIndex}
          selectedAddress={senderIndex}
        />
        <View style={styles.sendContainer}>
          <SendView
            readQr={() => setActiveQR(true)}
            coin={coinDetails.ticker}
            balance={balance}
            recipient={recipient}
            onRecipientChange={onRecipientChange}
            maxIsAllowed={true}
            setRecipientPayFee={() => setRecipientPayFee(true)}
            errors={voutError}
          />
        </View>
        <TxPriorityButtonGroup
          label={t('Transaction fee')}
          selectedIndex={txPriority}
          onSelected={setTxPriority}
          advancedIsAllowed={true}
          onAdvancedPress={() => setAdvancedModalIsShown(true)}
        />
        {!isValid && errors.length > 0 && (
          <View style={styles.errors}>
            {errors.map((error, index) => (
              <AlertRow text={error} key={'general_error_' + index} />
            ))}
          </View>
        )}
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
        <EthFeeAdvancedModal
          visible={advancedModalIsShown}
          onCancel={() => setAdvancedModalIsShown(false)}
          onAccept={setAdvancedOptions}
          defaultGasPrice={EthPattern.weiToGwei(currentGasPrice)}
          defaultGasLimit={currentGasLimit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 16,
  },
  errors: {
    marginTop: 30,
  },
  container: {
    backgroundColor: theme.colorsOld.white,
  },
  sendContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  addressSelector: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
});

export default SendEthBasedScreen;
