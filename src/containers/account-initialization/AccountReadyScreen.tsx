import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import SolidButton from '../../components/buttons/solid-button';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {useDispatch} from 'react-redux';
import {hideFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {walletLogo} from '../../assets/images';
import WavesBackground from '../../components/background/waves-background';

const AccountReadyScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const getToWork = useCallback(() => {
    dispatch(hideFinish());
  }, [dispatch]);

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
        <SolidButton title={t('Get to work')} onPress={getToWork} />
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
