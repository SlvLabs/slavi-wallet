import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import SendView, {Recipient, RecipientUpdatingData} from './send-view';
import {useTranslation} from 'react-i18next';
import {VoutError} from '@slavi/wallet-core/src/validation/hooks/use-tx-vouts-validator';
import theme from '../../theme';

export interface SendManyViewProps {
  readQr: (index: number) => void;
  coin: string;
  balance: string;
  recipients: Recipient[];
  onRecipientChange: (index: number, data: RecipientUpdatingData) => void;
  onRecipientAdd: () => void;
  onRecipientRemove: (index: number) => void;
  setRecipientPayFee: () => void;
  errors?: {[index: number]: VoutError};
  containerStyle?: ViewStyle;
  recipientsViewStyle?: ViewStyle;
  controlsViewStyle?: ViewStyle;
}

const SendManyView = (props: SendManyViewProps) => {
  const {t} = useTranslation();
  const count = props.recipients.length;
  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={{...styles.recipients, ...props.recipientsViewStyle}}>
        {props.recipients.map((recipient: Recipient, index: number) => (
          <SendView
            readQr={() => props.readQr(index)}
            coin={props.coin}
            balance={props.balance}
            recipient={recipient}
            onRecipientChange={(data: RecipientUpdatingData) =>
              props.onRecipientChange(index, data)
            }
            onRemove={
              index !== 0 ? () => props.onRecipientRemove(index) : undefined
            }
            maxIsAllowed={props.recipients.length === 1}
            setRecipientPayFee={props.setRecipientPayFee}
            key={`recipient_${index}`}
            errors={props.errors ? props.errors[index] : undefined}
            header={count > 1 ? t('Recipient') + ' ' + (index + 1) : undefined}
          />
        ))}
      </View>
      <View style={{...styles.controls, ...props.controlsViewStyle}}>
        <TouchableOpacity onPress={props.onRecipientAdd}>
          <Text style={styles.recipientLabel}>{t('Add recepient')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
  recipients: {},
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
  },
  recipientLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.1,
    color: theme.colorsOld.pink,
  },
});

export default SendManyView;
