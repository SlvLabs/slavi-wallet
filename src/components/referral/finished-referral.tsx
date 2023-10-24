import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../../utils/layout';
import theme from '../../theme';
import Lottie from 'lottie-react-native';
import {referralFinishedAnimation} from '../../assets/annimation';
import useTranslation from '../../utils/use-translation';
import CryptoAmountText from '../text/crypto-amount-text';
import {InvitingCode} from './inviting-code';

export interface FinishedReferralProps {
  points: string;
  slvAmount: string;
  token: string;
}

export function FinishedReferral({points, slvAmount, token}: FinishedReferralProps) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      < Lottie source={referralFinishedAnimation} autoPlay={true} loop={true} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.header}>{t('referralCongratulations')}</Text>
        <View style={styles.earnedRow}>
          <Text style={styles.earnedLabel}>{t('referralEarned')}</Text>
          <CryptoAmountText
            ticker={t('referralResultPoints')}
            value={points}
            style={styles.pointsValue}
            tickerStyle={styles.pointsValue}
          />
        </View>
        <Text style={styles.amountLabel}>{t('referralConvertedSlv')}</Text>
        <CryptoAmountText ticker={'SLV'} value={slvAmount} style={styles.header} tickerStyle={styles.header} />
        <Text style={styles.points}>{t('referralTokens')}</Text>
        <View style={styles.exchangeRow}>
          <Text style={styles.exchangeText}>{t('referralCodeDescription1')}</Text>
          <TouchableOpacity>
            <Text style={{...styles.exchangeText, ...styles.exchangeLink}}>{t('referralExchange')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.exchangeText}>{t('referralCodeDescription2')}</Text>
        <InvitingCode code={token} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 42,
  },
  content: {
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingRight: Layout.isSmallDevice ? 8 : 16,
    alignItems: 'center',
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 42,
    color: theme.colors.gold2,
  },
  logo: {
    width: '100%',
    height: 480,
  },
  amountLabel: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: theme.colors.white,
    marginTop: 32,
  },
  earnedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  earnedLabel: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: theme.colors.textLightGray1,
    marginRight: 4,
  },
  points: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: theme.colors.textLightGray1,
  },
  pointsValue: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: theme.colors.white,
  },
  exchangeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  exchangeText: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: theme.colors.white,
    marginBottom: 16,
  },
  exchangeLink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
