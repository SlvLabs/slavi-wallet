import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import CryptoAmountText from '../text/crypto-amount-text';

export interface BalanceElementProps {
  points: string;
  friends: number;
}

export function BalanceElement({points, friends}: BalanceElementProps) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={{...styles.row, ...styles.borderedRow}}>
        <Text style={styles.label}>{t('referralPoints')}</Text>
        <CryptoAmountText style={styles.points} tickerStyle={styles.points} ticker={t('referralPts')} value={points} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{t('referralInvited')}</Text>
        <Text style={styles.friends}>{t('referralFriends', {count: friends})}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.grayDark,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.borderGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  borderedRow: {
    borderBottomWidth: 1,
    borderColor: theme.colors.borderGray,
    borderStyle: 'solid',
  },
  label: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: theme.colors.lightGray,
  },
  points: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.gold2,
  },
  friends: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
  },
});
