import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import InitializationBackground from '../components/background/initialization-background';
import {walletLogo, wavesLeft, wavesRight} from '../assets/images';
import SolidButton from '../components/buttons/solid-button';
import theme from '../theme';

const UpdateRequiredScreen = () => {
  const {t} = useTranslation();

  const getIt = useCallback(() => {

  }, []);

  return (
    <InitializationBackground>
      <View style={styles.logoView}>
        <Image source={wavesLeft} style={styles.wavesLeft} />
        <Image source={wavesRight} style={styles.wavesRight} />
        <Image source={walletLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Update required')}</Text>
        <Text style={styles.description}>
          {t('Your version of the app is out of date. You need to install a more recent.')}
        </Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Get it')} onPress={getIt} />
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
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

export default UpdateRequiredScreen;
