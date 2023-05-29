import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {referralAnimation} from '../../assets/annimation';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {GoldenSolidButton} from '../../components/buttons/golden-solid-button';
import {ReferralInput} from '../../components/referral/referral-input';
import {useReferralCode} from '../../hooks/use-referral-code';
import {useDispatch} from 'react-redux';
import {hideFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {useRoute} from '@react-navigation/native';
import {ReferralRouteProps} from '../../navigation/initialization-finish-stack';
import {CaptchaModal} from '../../components/captcha/captcha-modal';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../utils/layout';

export function InitializationReferralScreen() {
  const route = useRoute<ReferralRouteProps>();

  const dispatch = useDispatch();

  const {
    code,
    onChangeCode,
    isSuccess,
    isError,
    onPress,
    buttonText,
    onCaptchaSolved,
    captchaShown,
    hideCaptcha,
    isLoading,
  } = useReferralCode(route.params.codeLen, route.params.invitingCode);

  const {t} = useTranslation();

  const goNext = useCallback(() => dispatch(hideFinish()), [dispatch]);

  return (
    <LinearGradient {...theme.gradients.screenBackground} style={styles.container}>
      <Lottie source={referralAnimation} autoPlay={true} loop={true} style={styles.logo} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description1}>{t('referralInitDescription1')}</Text>
        <View style={styles.row}>
          <Text style={styles.description1}>{t('referralInitDescription2')}</Text>
          <Text style={styles.description3}> {t('referralInitDescription3')}</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('referralInitInputLabel')}</Text>
        <ReferralInput
          value={code}
          onChange={onChangeCode}
          isError={isError}
          isSuccess={isSuccess}
          onButtonPress={onPress}
          buttonText={buttonText}
        />
      </View>
      <TouchableOpacity onPress={goNext}>
        <Text style={styles.notCode}>{t('referralNotCode')}</Text>
      </TouchableOpacity>
      <GoldenSolidButton
        title={t('referralContinue')}
        containerStyle={styles.button}
        disabled={!isSuccess}
        onPress={goNext}
        loading={isLoading}
      />
      <CaptchaModal visible={captchaShown} onSolved={onCaptchaSolved} onCancel={hideCaptcha} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blueBackground,
  },
  logo: {
    width: '100%',
  },
  descriptionContainer: {
    paddingLeft: Layout.isSmallDevice ? 16 : 32,
    paddingRight: Layout.isSmallDevice ? 16 : 32,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  description1: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: 'center',
  },
  description3: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.gold2,
  },
  label: {
    fontFamily: theme.fonts.gilroy,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: theme.colors.white,
    marginBottom: 16,
    alignSelf: 'center',
  },
  inputContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 37,
  },
  imageContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  button: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
  },
  notCode: {
    fontFamily: theme.fonts.default,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.white,
    alignSelf: 'center',
    marginTop: 19,
  },
});
