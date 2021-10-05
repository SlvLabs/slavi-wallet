import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import DecimalInput, {DecimalType} from '../controls/decimal-input';

export interface AmountInputProps {
  ticker: string;
  balance: string;
  onChange: (val: string, receiverPaysFee: boolean) => void;
  maxIsAllowed: boolean;
  setRecipientPayFee: () => void;
  label?: string;
  errors?: string[];
  containerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  contentStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  tickerStyle?: TextStyle;
  controlsContainerStyle?: ViewStyle;
}

const AmountInput = (props: AmountInputProps) => {
  const {t} = useTranslation();
  const [amount, setAmount] = useState<string>('');

  const {onChange, setRecipientPayFee, balance, errors} = props;

  const onMaxPress = () => {
    setAmount(balance);
    onChange(balance, true);
    setRecipientPayFee();
  };

  const onAmountChange = (inputValue: string) => {
    console.log('AmountInput: ' + inputValue);
    setAmount(inputValue);
    onChange(inputValue, false);
  };

  const errorMessage = useMemo(
    () => errors?.reduce((acc: string, cur: string) => acc + cur + ' ', ''),
    [errors],
  );

  return (
    <View style={{...styles.container, ...props.containerStyle}}>
      <View style={{...styles.content, ...props.contentStyle}}>
        <View style={{...styles.inputContainer, ...props.inputContainerStyle}}>
          <DecimalInput
            onChange={onAmountChange}
            value={amount}
            errorMessage={errorMessage}
            inputType={DecimalType.Real}
            buttonText={t('Max')} //TODO: Optional
            onButtonPress={onMaxPress}
            placeholder={props.label}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  label: {},
  labelContainer: {},
  content: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 3,
  },
  input: {},
  controlsContainer: {
    flex: 1,
  },
  ticker: {
    flex: 1,
  },
});

export default AmountInput;
