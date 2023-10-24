import React from 'react';
import {BalanceElement} from './balance-element';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import {InvitingCode} from './inviting-code';
import {ReferralInput} from './referral-input';
import {useReferralCode} from '../../hooks/use-referral-code';
import {CaptchaModal} from '../captcha/captcha-modal';
import {AbstractRuleDisplayInfo} from '@slavi/wallet-core/src/providers/ws/messages/refferal';
import {Rule} from './rule';
import {CommonRules} from './common-rules';
import {referralAnimation} from '../../assets/annimation';
import Lottie from 'lottie-react-native';
import Layout from '../../utils/layout';
import {NftMintRule} from './nft-mint-rule';

export interface WorkingReferralProps {
  points: string;
  friends: number;
  invitingCode: string;
  percent: number;
  codeLen: number;
  invitedCode: string | null;
  rules: AbstractRuleDisplayInfo[];
}

export function WorkingReferral({
  points,
  friends,
  invitingCode,
  percent,
  codeLen,
  invitedCode,
  rules,
}: WorkingReferralProps) {
  const {t} = useTranslation();

  const {code, onChangeCode, isSuccess, isError, onPress, buttonText, onCaptchaSolved, captchaShown, hideCaptcha} =
    useReferralCode(codeLen, invitedCode);

  return (
    <View style={styles.container}>
      <Lottie source={referralAnimation} autoPlay={true} loop={true} style={styles.logo} />
      <View style={styles.content}>
        <BalanceElement points={points} friends={friends} />
        <Text style={styles.header}>{t('referralShare')}</Text>
        <InvitingCode code={invitingCode} />
        <Text style={styles.percent}>{t('referralDescription', {percent: percent})}</Text>
        <Text style={styles.header}>{t('referralInviting')}</Text>
        <ReferralInput
          value={code}
          onChange={onChangeCode}
          isError={isError}
          isSuccess={isSuccess}
          onButtonPress={onPress}
          buttonText={buttonText}
          buttonStyle={styles.inputButton}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <View style={styles.rulesView}>
          {rules.map((rule, i) =>
            rule?.type === 'nft_mint' && rule.attributes ? (
              <Rule
                key={`rule_${i}`}
                description={rule.description}
                header={rule.header}
                amount={rule.total.amount}
                maxAmount={rule.total.maxAmount}
                percent={rule.total.percent}
                maxPercent={rule.total.maxPercent}
                positions={rule.positions}>
                <NftMintRule attributes={rule.attributes} />
              </Rule>
            ) : (
              <Rule
                key={`rule_${i}`}
                description={rule.description}
                header={rule.header}
                amount={rule.total.amount}
                maxAmount={rule.total.maxAmount}
                percent={rule.total.percent}
                maxPercent={rule.total.maxPercent}
                positions={rule.positions}
              />
            ),
          )}
        </View>
        <CommonRules />
      </View>
      <CaptchaModal visible={captchaShown} onSolved={onCaptchaSolved} onCancel={hideCaptcha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  header: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    color: theme.colors.white,
    marginTop: 24,
    marginBottom: 16,
    alignSelf: 'center',
  },
  percent: {
    marginTop: 16,
    fontFamily: theme.fonts.default,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.borderGreen,
    textAlign: 'center',
    maxWidth: 260,
    alignSelf: 'center',
  },
  inputButton: {
    color: theme.colors.borderGreen,
  },
  inputContainer: {
    backgroundColor: theme.colors.grayDark,
    borderColor: theme.colors.gold2,
  },
  rulesView: {
    marginTop: 24,
  },
  input: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.white,
  },
  logo: {
    width: '100%',
    height: 480,
  },
  content: {
    paddingLeft: Layout.isSmallDevice ? 8 : 16,
    paddingRight: Layout.isSmallDevice ? 8 : 16,
  },
});
