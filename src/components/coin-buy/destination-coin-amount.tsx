import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import getImageSource from '../../utils/get-image-source';
import theme from '../../theme';
import React from 'react';
import useTranslation from '../../utils/use-translation';
import DecimalInput, {DecimalType} from '../controls/decimal-input';

interface DestinationCoinAmountProps {
  amount: string;
  setAmount: (amount: string) => void;
  containerStyle?: ViewStyle;
  ticker: string;
  logo?: string;
  disabled?: boolean;
}

export const DestinationCoinAmount = ({
  logo,
  ticker,
  amount,
  setAmount,
  containerStyle,
  disabled,
}: DestinationCoinAmountProps) => {
  const {t} = useTranslation();
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.leftColumn}>
        <DecimalInput
          value={amount}
          onChange={setAmount}
          inputType={DecimalType.Real}
          errorContainerStyle={styles.errorInput}
          disableErrorStyle={true}
          inputContainerStyle={styles.srcInput}
          inputStyle={styles.input}
          containerStyle={styles.simpleInputContainer}
          disabled={disabled}
          skipDisabledStyle={true}
          maximumPrecision={8}
          label={t('youReceive')}
          labelStyle={styles.label}
        />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.row}>
          <Image source={getImageSource(logo)} style={styles.image} />
          <Text style={styles.ticker}>{ticker}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  maxText: {},
  image: {
    width: 32,
    height: 32,
  },
  ticker: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: theme.colors.white,
    textTransform: 'uppercase',
    marginLeft: 12,
    marginRight: 0,
  },
  errorInput: {
    display: 'none',
  },
  srcInput: {
    paddingTop: 9,
    paddingRight: 0,
    marginTop: 0,
    paddingBottom: 5,
    paddingLeft: 0,
    marginRight: 10,
  },
  simpleInputContainer: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  input: {
    lineHeight: 21,
  },
});
