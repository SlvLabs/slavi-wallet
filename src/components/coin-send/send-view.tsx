import React, {useCallback, useEffect} from 'react';
import RecipientInput from './recipient-input';
import useTranslation from '../../utils/use-translation';
import AmountInput from './amount-input';
import {StyleSheet, TouchableOpacity, View, ViewStyle, Text} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import { useCurrencyConverted, useFiatSelector } from '@slavi/wallet-core/src/store/modules/currency/selectors';
import makeRoundedBalance from "../../utils/make-rounded-balance";

export interface Recipient {
  address: string;
  amount: string;
}

export interface RecipientUpdatingData {
  address?: string;
  amount?: string;
}

export interface SendViewProps {
  recipient: Recipient;
  coin: string;
  ticker: string;
  readQr: () => void;
  balance: string;
  onRecipientChange: (data: RecipientUpdatingData) => void;
  maxIsAllowed: boolean;
  setRecipientPayFee: () => void;
  onRemove?: () => void;
  errors?: VoutError;
  containerStyle?: ViewStyle;
  header?: string;
  maximumPrecision?: number;
}

const SendView = (props: SendViewProps) => {
  const {t} = useTranslation();
  const {onRecipientChange, readQr, onRemove, maximumPrecision} = props;
  const onAmountChange = useCallback((amount: string) => onRecipientChange({amount}), [onRecipientChange]);

  const onAddressChange = useCallback((address: string) => onRecipientChange({address}), [onRecipientChange]);

  const fiat = useFiatSelector();

  const fiatAmount = useCurrencyConverted(props.coin, fiat, props.recipient.amount);

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.header}>
        {!!props.header && <Text style={styles.headerText}>{props.header}</Text>}
        {!!onRemove && (
          <TouchableOpacity onPress={onRemove}>
            <CustomIcon name={'close'} size={16} color={theme.colors.darkGreen1} />
          </TouchableOpacity>
        )}
      </View>
      <RecipientInput
        label={t('Recipient')}
        onPressQr={readQr}
        value={props.recipient.address}
        onChange={onAddressChange}
        errors={props.errors?.address}
      />
      <AmountInput
        label={t('Amount')}
        ticker={props.ticker}
        balance={props.balance}
        onChange={onAmountChange}
        maxIsAllowed={props.maxIsAllowed}
        setRecipientPayFee={props.setRecipientPayFee}
        errors={props.errors?.amount}
        maximumPrecision={maximumPrecision}
        fiat={fiat}
        fiatAmount={makeRoundedBalance(2, fiatAmount)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.01,
    color: theme.colors.white,
  },
});

export default SendView;
