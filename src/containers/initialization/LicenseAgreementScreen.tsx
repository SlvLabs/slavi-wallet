import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import InitializationBackground from '../../components/background/initialization-background';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import SimpleCheckbox from '../../components/controls/simple-checkbox';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ScrollableArea from '../../components/controls/scrollable-area';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import Layout from '../../utils/layout';

const LicenseAgreementScreen = () => {
  const [accepted, setAccepted] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();

  const goNextStep = useCallback(() => navigation.navigate(ROUTES.INITIALIZATION.PASSCODE), [navigation]);

  return (
    <InitializationBackground>
      <Text style={styles.header}>{t('User agreement')}</Text>
      <ScrollableArea text={t('agreement_policy')} containerStyle={styles.license}/>
      <View style={styles.agreementView}>
        <SimpleCheckbox
          label={t('I accept the terms of the user agreement')}
          checked={accepted}
          onPress={() => setAccepted(!accepted)}
        />
      </View>
      <SolidButton title={t('Continue')} onPress={goNextStep} disabled={!accepted}/>
      <View style={styles.loaderView}>
        <PointerProgressBar stepsCount={6} activeStep={1}/>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  loaderView: {
    paddingTop: 17,
  },
  header: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  license: {
    marginBottom: 20,
    maxHeight: Layout.window.height - 100,
  },
  agreementView: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LicenseAgreementScreen;
