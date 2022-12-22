import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SolidButton from '../../components/buttons/solid-button';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useDispatch} from 'react-redux';
import {hideFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {walletLogo} from '../../assets/images';
import WavesBackground from '../../components/background/waves-background';
import {useGetReferralInfo} from '@slavi/wallet-core/src/providers/ws/hooks/referral/use-get-referral-info';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {CampaignStatus} from '@slavi/wallet-core/src/providers/ws/messages/refferal';

const AccountReadyScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isLoading, data, reload} = useGetReferralInfo(false);

  useEffect(() => {
    if (isLoading || !data) {
      return;
    }

    if (data?.campaignStatus === CampaignStatus.active) {
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.REFERRAL, {
        invitingCode: data.invitingCode,
        codeLen: data.codeLength,
      });
    } else {
      dispatch(hideFinish());
    }
  }, [data, dispatch, isLoading, navigation]);

  return (
    <WavesBackground>
      <View style={styles.logoView}>
        <Image source={walletLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Congratulations!')}</Text>
        <Text style={styles.description}>{t('Your wallet is ready to work.')}</Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Get to work')} onPress={reload} loading={isLoading} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={5} />
        </View>
      </View>
    </WavesBackground>
  );
};

const styles = StyleSheet.create({
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loaderView: {
    paddingTop: 17,
  },
  logoView: {
    flex: 2,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 138,
    height: 138,
    marginBottom: 15,
  },
  textBlock: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: 20,
  },
  description: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
});

export default AccountReadyScreen;
