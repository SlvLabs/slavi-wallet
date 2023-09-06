import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {referralAnimation} from '../../assets/annimation';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {GoldenSolidButton} from '../../components/buttons/golden-solid-button';
import {ReferralInput} from '../../components/referral/referral-input';
import {useReferralCode} from '../../hooks/use-referral-code';
import {useDispatch, useSelector} from 'react-redux';
import {hideReferral, ReferralState} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {CaptchaModal} from '../../components/captcha/captcha-modal';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../utils/layout';
import {State} from '@slavi/wallet-core/src/store/index';
import ROUTES from '../../navigation/config/routes';
import OutlineButton from '../../components/buttons/outline-button';
import {useNavigation} from '@react-navigation/native';

export function InitializationReferralScreen() {
  const {codeLen, invitingCode} = useSelector<State, ReferralState>(state => state.initialization.referralState);

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
  } = useReferralCode(codeLen || 6, invitingCode || null);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const goToRewardHub = useCallback(() => {
    dispatch(hideReferral());
    navigation.reset({
      index: 2,
      routes: [
        {
          name: ROUTES.MAIN.TABS,
        },
        {
          name: ROUTES.MAIN.TABS,
          params: {screen: ROUTES.TABS.SETTINGS},
        },
        {
          name: ROUTES.MAIN.TABS,
          params: {screen: ROUTES.TABS.SETTINGS, params: {screen: ROUTES.SETTINGS.REFERRAL}},
        },
      ],
    });
  }, [dispatch, navigation]);

  const goToWallet = useCallback(() => {
    dispatch(hideReferral());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: ROUTES.MAIN.TABS,
        },
      ],
    });
  }, [dispatch, navigation]);

  return (
    <LinearGradient {...theme.gradients.screenBackground} style={styles.container}>
      <Lottie source={referralAnimation} autoPlay={true} loop={true} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('referralInitInputLabelNew')}</Text>
        <ReferralInput
          value={code}
          onChange={onChangeCode}
          isError={isError}
          isSuccess={isSuccess}
          onButtonPress={onPress}
          buttonText={buttonText}
        />
      </View>
      <GoldenSolidButton
        title={t('referralExploreReward')}
        containerStyle={styles.button}
        onPress={goToRewardHub}
        loading={isLoading}
      />
      <OutlineButton
        title={t('referralGoToWallet')}
        containerStyle={styles.button}
        onPress={goToWallet}
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
