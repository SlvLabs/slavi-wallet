import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {referralFinishedAnimation} from '../../assets/annimation';
import Layout from '../../utils/layout';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import NumberText from '../text/number-text';
import {TouchLink} from './touch-link';

export interface ProcessingReferralProps {
  points: string;
}

export function ProcessingReferral({points}: ProcessingReferralProps) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Lottie source={referralFinishedAnimation} autoPlay={true} loop={true} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.header}>{t('referralCongratulations')}</Text>
        <Text style={styles.amountLabel}>{t('referralEarned')}</Text>
        <NumberText value={points} style={styles.header} />
        <Text style={styles.pointsLabel}>{t('referralResultPoints')}</Text>
        <Text style={styles.stayInTouch}>{t('referralStayInTouch')}</Text>
        <Text style={styles.furtherSteps}>{t('referralFutureSteps')}</Text>
        <View style={styles.linkRow}>
          <TouchLink link={t('referralTelegramsLink')} icon={'telegram'} label={t('referralTelegram')} iconSize={32} />
          <TouchLink link={t('referralDiscordLink')} icon={'discord'} label={t('referralDiscord')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  },
  amountLabel: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: theme.colors.white,
    marginTop: 24,
    marginBottom: 8,
  },
  pointsLabel: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: theme.colors.textLightGray1,
  },
  stayInTouch: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    color: theme.colors.white,
    marginTop: 24,
  },
  furtherSteps: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 17,
    color: theme.colors.textLightGray1,
    marginTop: 12,
  },
  linkRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 22,
    width: '100%',
    justifyContent: 'space-between',
  },
});
