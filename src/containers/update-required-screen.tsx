import {Image, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {walletLogo} from '../assets/images';
import SolidButton from '../components/buttons/solid-button';
import theme from '../theme';
import useTranslation from '../utils/use-translation';
import WavesBackground from '../components/background/waves-background';
const androidLink = 'https://play.google.com/store/apps/details?id=com.defiwalletmobile';
const iosLink = 'itms-apps://apps.apple.com/en/app/slavi-wallet/id1610125496?l=en';
const UpdateRequiredScreen = () => {
  const {t} = useTranslation();

  const getIt = useCallback(async () => {
    let link;
    switch (Platform.OS) {
      case 'android':
        link = androidLink;
        break;
      case 'ios':
        link = iosLink;
        break;
    }
    if (link && (await Linking.canOpenURL(link))) {
      Linking.openURL(androidLink);
    }
  }, []);

  return (
    <WavesBackground>
      <View style={styles.logoView}>
        <Image source={walletLogo} style={styles.logo} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Update required')}</Text>
        <Text style={styles.description}>
          {t('Your version of the app is out of date. You need to install a more recent.')}
        </Text>
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Get it')} onPress={getIt} gradient={theme.gradients.violetButton} />
      </View>
    </WavesBackground>
  );
};

const styles = StyleSheet.create({
  buttonsBlock: {
    flex: 1,
    justifyContent: 'flex-end',
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

export default UpdateRequiredScreen;
