import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import DecimalInput, {DecimalType} from '../../controls/decimal-input';
import makeRoundedBalance from '../../../utils/make-rounded-balance';
import useTranslation from '../../../utils/use-translation';
import CryptoAmountText from '../../text/crypto-amount-text';
import theme from '../../../theme';
import SolidButton from '../../buttons/solid-button';

export interface StakeInputProps {
  amount: string;
  minStake: string;
  onAmountChange: (amount: string) => void;
  balance: string;
  ticker: string;
  containerStyle?: ViewStyle;
}

const cryptoPrecision = 4;

export function StakeInput({amount, onAmountChange, balance, ticker, containerStyle, minStake}: StakeInputProps) {
  const {t} = useTranslation();

  const onMaxPress = useCallback(() => onAmountChange(balance), [balance, onAmountChange]);

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>{t('stakingAmountToStake')}</Text>
        <DecimalInput
          value={amount}
          onChange={onAmountChange}
          inputType={DecimalType.Real}
          errorContainerStyle={styles.errorInput}
          disableErrorStyle={true}
          inputContainerStyle={styles.srcInput}
        />
        <View style={styles.row}>
          <Text style={styles.balanceLabel}>{t('stakingAvailableHeader')}:</Text>
          <CryptoAmountText
              ticker={ticker}
              value={makeRoundedBalance(cryptoPrecision, balance)}
              style={styles.balanceText}
              tickerStyle={styles.balanceText}
            />
        </View>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.row}>
          <Text style={styles.minStakeLabel}>{t('stakingMinStake')}</Text>
          <CryptoAmountText
            ticker={ticker}
            value={makeRoundedBalance(cryptoPrecision, minStake)}
            style={styles.minStake}
            tickerStyle={styles.minStake}
          />
        </View>
        <SolidButton
          onPress={onMaxPress}
          gradient={theme.gradients.activeIcon}
          title={t('max')}
          titleStyle={styles.maxText}
          containerStyle={styles.maxButtonContainer}
          buttonStyle={styles.maxButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.lightGray,
    marginRight: 4,
  },
  errorInput: {},
  srcInput: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
    marginRight: 4,
  },
  balanceText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: '100%',
  },
  maxText: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  maxButton: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    borderRadius: 6,
  },
  maxButtonContainer: {
    borderRadius: 6,
    marginTop: 10,
  },
  minStakeLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.textLightGray1,
    marginRight: 4,
  },
  minStake: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.white,
  },
});
