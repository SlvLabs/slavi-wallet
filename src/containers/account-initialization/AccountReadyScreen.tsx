import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import InitializationBackground from '../../components/background/initialization-background';
import SolidButton from '../../components/buttons/solid-button';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useDispatch} from 'react-redux';
import {hideFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {walletLogo, wavesLeft, wavesRight} from '../../assets/images';

const AccountReadyScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const getToWork = useCallback(() => {
    dispatch(hideFinish());
  }, [dispatch]);

  return (
    <InitializationBackground>
      <View style={styles.logoView}>
        <Image source={wavesLeft} style={styles.wavesLeft} />
        <Image source={wavesRight} style={styles.wavesRight} />
        <Image source={walletLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Congratulations!')}</Text>
        <Text style={styles.description}>
          {t('Your wallet is ready to work.')}
        </Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Get to work')} onPress={getToWork} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={5}/>
        </View>
      </View>
    </InitializationBackground>
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  textBlock: {
    marginBottom: 30,
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
  wavesLeft: {
    position: 'absolute',
    left: -80,
    top: 120,
    width: 180,
    height: 250,
    transform: [{rotate: '-19.28deg'}],
    opacity: 0.4,
  },
  wavesRight: {
    position: 'absolute',
    right: -180,
    top: 60,
    width: 383,
    height: 320,
    transform: [{rotate: '-31.96deg'}],
    opacity: 0.6,
  }
});

export default AccountReadyScreen;
