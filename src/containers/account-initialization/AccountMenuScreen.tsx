import {Text, View, InteractionManager, Image, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import useTranslation from '../../utils/use-translation';
import ROUTES from '../../navigation/config/routes';
import InitializationBackground from '../../components/background/initialization-background';
import SolidButton from '../../components/buttons/solid-button';
import OutlineButton from '../../components/buttons/outline-button';
import {keyLogo} from '../../assets/images';
import theme from '../../theme';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import Layout from '../../utils/layout';

const AccountMenuScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const onPressCreate = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.CREATE_MNEMONIC);
    });
  }, [navigation]);

  const onPressImport = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.IMPORT_MNEMONIC);
    });
  }, [navigation]);

  return (
    <InitializationBackground>
      <View style={styles.logoView}>
        <Image source={keyLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Sign in to account')}</Text>
        <Text style={styles.description}>{
          t('We offer you a convenient system that will help solve all your problems with cryptocurrency')
        }</Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Create new account')} onPress={onPressCreate} containerStyle={styles.button}/>
        <OutlineButton title={t('Sign in')} onPress={onPressImport} containerStyle={styles.button}/>
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={3}/>
        </View>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: Layout.isSmallDevice ? 1 : 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: Layout.isSmallDevice ? 110 : 200,
    height: Layout.isSmallDevice ? 110 : 200,
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
