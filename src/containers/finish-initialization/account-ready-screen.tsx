import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import SolidButton from '../../components/buttons/solid-button';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import {bigBear} from '../../assets/images';
import WavesBackground from '../../components/background/waves-background';
import {useDispatch} from 'react-redux';
import {hideFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';

const AccountReadyScreen = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const next = useCallback(() => {
    dispatch(hideFinish());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: ROUTES.MAIN.HELP,
        },
      ],
    });
  }, [dispatch, navigation]);

  return (
    <WavesBackground contentStyle={styles.content}>
      <View style={styles.logoView}>
        <Image source={bigBear} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('fullyPrepared')}</Text>
        <Text style={styles.description}>{t('fullyPreparedDesc')}</Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('exploreWallet')} onPress={next} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={5} />
        </View>
      </View>
    </WavesBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 0,
  },
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 32,
  },
  loaderView: {
    paddingTop: 17,
  },
  logoView: {
    flex: 3,
    marginBottom: 9,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '100%',
    height: 414,
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
