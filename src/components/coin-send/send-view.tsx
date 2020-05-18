import React from 'react';
import RecipientInput from './recipient-input';
import {useTranslation} from 'react-i18next';
import AmountInput from './amount-input';
import {VoutError} from '@slavi/wallet-core/types/validation/hooks/use-tx-vouts-validator';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import CustomIcon from '../custom-icon/custom-icon';
import theme from '../../theme';

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
  readQr: () => void;
  balance: string;
  onRecipientChange: (data: RecipientUpdatingData) => void;
  maxIsAllowed: boolean;
  setRecipientPayFee: () => void;
  onRemove?: () => void;
  errors?: VoutError;
  containerStyle?: ViewStyle;
  header?: string;
}

const SendView = (props: SendViewProps) => {
  const {t} = useTranslation();
  const {onRecipientChange, readQr, onRemove} = props;
  const onAmountChange = (amount: string) => onRecipientChange({amount});

  const onAddressChange = (address: string) => onRecipientChange({address});

  const onRemoveCallback = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={styles.header}>
        {!!props.header && (
          <Text style={styles.headerText}>{props.header}</Text>
        )}
        {!!onRemove && (
          <TouchableOpacity onPress={onRemoveCallback}>
            <CustomIcon
              name={'close'}
              size={16}
              color={theme.colorsOld.mistyRose}
            />
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
        ticker={props.coin}
        balance={props.balance}
        onChange={onAmountChange}
        maxIsAllowed={props.maxIsAllowed}
        setRecipientPayFee={props.setRecipientPayFee}
        errors={props.errors?.amount}
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
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.2,
    color: theme.colorsOld.pink,
  },
});

export default SendView;
