import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import React, {useCallback} from 'react';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import SolidButton from '../../components/buttons/solid-button';
import OutlineButton from '../../components/buttons/outline-button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export default function RestoreScreen() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onAccept = useCallback(async () => {
    await AsyncStorage.clear();
    RNRestart.Restart();
  }, []);

  const onDecline = useCallback(() => {
    if(navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradient}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{t('restoreHeader')}</Text>
          <Text style={styles.description}>{t('restoreDescription')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SolidButton title={t('restoreAccept')} onPress={onAccept} containerStyle={styles.button} />
          <OutlineButton title={t('restoreDecline')} onPress={onDecline} containerStyle={styles.button} />
        </View>
      </RadialGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 22,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  description: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors.white,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 60,
    width: '100%',
  },
  textContainer: {},
});
