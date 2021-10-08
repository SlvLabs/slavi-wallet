import {useTranslation} from 'react-i18next';
import useCoinDetails from '@slavi/wallet-core/src/store/modules/coins/use-coin-details';
import {
  useAddressesService,
  useCoinPatternService,
  useCoinSpecsService,
} from '@slavi/wallet-core';
import useSpendableBalance from '@slavi/wallet-core/src/store/modules/balances/hooks/use-spendable-balance';
import React, {useCallback, useState} from 'react';
import {Recipient} from '../../components/coin-send/send-view';
import CoinBalanceHeader from '../../components/coins/coin-balance-header';
import SendManyView from '../../components/coin-send/send-many-view';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import AlertRow from '../../components/error/alert-row';
import {Button} from 'react-native-elements';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import ConfirmationModal from '../../components/coin-send/confirmation-modal';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import TxCreatingResult from '@slavi/wallet-core/types/services/transaction/tx-creating-result';
import SimpleToast from 'react-native-simple-toast';
import {parseDataFromQr, QrData} from '@slavi/wallet-core/src/utils/qr';

export interface SendPolkadotScreenProps {
  coin: string;
}

const defaultRecipient: Recipient = {
  address: '',
  amount: '',
};

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

  const [recipient, setRecipient] = useState<Recipient>({
    address: '',
    amount: '',
  });
  const [activeQR, setActiveQR] = useState<number>(-1);
  const [recipients, setRecipients] = useState<Recipient[]>([defaultRecipient]);
  const [errors, setErrors] = useState<string[]>([]);
  const [voutErrors, setVoutErrors] = useState<{[index: number]: VoutError}>(
    {},
  );
  const [locked, setLocked] = useState<boolean>(false);
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<TxCreatingResult | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const pattern = coinPatternService.createPolkadotPattern(
    props.coin,
    addressService.getGetterDelegate(props.coin),
  );

  const onRecipientChange = (
    index: number,
    recipient: {address?: string; amount?: string},
  ) => {
    setRecipients(
      recipients.map((current, i) => {
        if (i === index) {
          const newRecipient = {...current};
          if (typeof recipient.address !== 'undefined') {
            newRecipient.address = recipient.address;
          }
          if (typeof recipient.amount !== 'undefined') {
            newRecipient.amount = recipient.amount;
          }

          return newRecipient;
        }
        return current;
      }),
    );
  };

  const onRecipientAdd = () =>
    setRecipients([...recipients, {...defaultRecipient}]);

  const onRecipientRemove = (index: number) => {
    setRecipients(recipients.filter((recipient, i) => i !== index));
  };

  const addError = (error: string) => {
    setIsValid(false);
    setErrors([...errors, error]);
  };

  const onSubmit = async () => {};

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

      setActiveQR(-1);
      setRecipients(
        recipients.map((element, index) => {
          if (parsed && index === activeQR) {
            return {
              ...element,
              address: parsed.address || '',
              amount: parsed.amount || '',
            };
          }
          return element;
        }),
      );
    },
    [activeQR, coinSpec.bip21Name, onQrReadFailed, recipients],
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

  return (
    <SafeAreaView>
      <ScrollView>
        <CoinBalanceHeader
          balance={balance}
          name={coinDetails.name}
          cryptoBalance={coinDetails.spendableCryptoBalance}
          cryptoTicker={coinDetails.crypto}
          fiatBalance={coinDetails.spendableFiatBalance}
          fiatTicker={coinDetails.fiat}
          logo={coinDetails.logo}
          type={coinDetails.type}
        />
        <SendManyView
          readQr={(index: number): void => setActiveQR(index)}
          coin={props.coin}
          balance={balance}
          recipients={recipients}
          onRecipientChange={onRecipientChange}
          onRecipientAdd={onRecipientAdd}
          onRecipientRemove={onRecipientRemove}
          errors={voutErrors}
          setRecipientPayFee={() => {}}
        />
        {!isValid && errors.length > 0 && (
          <View style={styles.errors}>
            {errors.map((error, index) => (
              <AlertRow text={error} key={'general_error_' + index} />
            ))}
          </View>
        )}
        <View style={styles.submitButton}>
          <Button
            title={t('Send')}
            onPress={onSubmit}
            disabled={!isValid || locked}
            loading={locked}
          />
        </View>
        <QrReaderModal
          visible={activeQR >= 0}
          onQRRead={onQRRead}
          onClose={() => setActiveQR(-1)}
        />
        <ConfirmationModal
          visible={confIsShown}
          vouts={txResult?.vouts || []}
          fee={txResult?.fee}
          onAccept={send}
          onCancel={cancelConfirmSending}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 30,
    marginBottom: 30,
  },
  errors: {
    marginTop: 30,
  },
});

export default SendPolkadotScreen;
