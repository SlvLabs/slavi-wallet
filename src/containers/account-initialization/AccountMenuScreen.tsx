import {Text, View, InteractionManager, Image, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import ROUTES from '../../navigation/config/routes';
import InitializationBackground from '../../components/background/initialization-background';
import SolidButton from '../../components/buttons/solid-button';
import OutlineButton from '../../components/buttons/outline-button';
import {keyLogo} from '../../assets/images';
import theme from '../../theme';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';

const AccountMenuScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const onPressCreate = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.CREATE_MNEMONIC);
    });
  }, [navigation]);

  const onPressImport = useCallback(() => {
    Toast.showWithGravity(t('Coming soon'), Toast.LONG, Toast.CENTER);
  }, [t]);

  return (
    <InitializationBackground>
      <View style={styles.logoView}>
        <Image source={keyLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Sign in to account')}</Text>
        <Text style={styles.description}>{
          t('We offer you a convenient system that’ll help solve all your problems with cryptocurrency')
        }</Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Create new account')} onPress={onPressCreate} containerStyle={styles.button}/>
        <OutlineButton title={t('Sign in')} onPress={onPressImport} containerStyle={styles.button}/>
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={5} activeStep={2}/>
        </View>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 2,
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
  button: {
    marginBottom: 12,
  },
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loaderView: {
    paddingTop: 17,
  },
});

export default AccountMenuScreen;
