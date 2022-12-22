import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTranslation, {TranslationsKey} from '../../utils/use-translation';
import theme from '../../theme';

export interface RulePositionProps {
  label: string;
  translate: boolean;
  amount?: number;
  percent?: number;
  isLast: boolean;
}

export function RulePosition({label, translate, amount, percent, isLast}: RulePositionProps) {
  const {t} = useTranslation();

  const value = useMemo(() => {
    if (amount) {
      return t('referralRulePositionPoints', {points: amount});
    } else if (percent) {
      return t('referralRulePositionPercent', {percent: percent});
    } else {
      return '';
    }
  }, [amount, percent, t]);

  return (
    <View style={isLast ? styles.container : {...styles.container, ...styles.bordered}}>
      <Text style={styles.label}>{translate ? t(label as TranslationsKey) : label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 6,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors.textLightGray,
  },
  value: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors.white,
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
  },
});
