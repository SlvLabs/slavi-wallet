import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {IncomeElement} from './income-element';
import useTranslation from '../../../utils/use-translation';

export interface IncomesBlockProps {
  containerStyle?: ViewStyle;
  monthly: string;
  total: string;
  ticker: string;
}

export function IncomesBlock({containerStyle, monthly, total, ticker}: IncomesBlockProps) {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <IncomeElement
        label={t('stakingMonthlyIncome')}
        amount={monthly}
        ticker={ticker}
      />
      <IncomeElement
        label={t('stakingMonthlyIncome')}
        amount={total}
        ticker={ticker}
        containerStyle={styles.totalContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  totalContainer: {
    marginTop: 8,
  },
});
