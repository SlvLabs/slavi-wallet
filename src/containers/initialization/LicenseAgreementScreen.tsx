import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import InitializationBackground from '../../components/background/initialization-background';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';
import useTranslation from '../../utils/use-translation';
import SimpleCheckbox from '../../components/controls/simple-checkbox';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ScrollableArea from '../../components/controls/scrollable-area';
import {useDispatch} from 'react-redux';
import { save } from '@slavi/wallet-core/src/store/modules/initialization/initialization-thunk-actions';

const LicenseAgreementScreen = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const goNextStep = useCallback(() => dispatch(save()), [dispatch]);

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
        <PointerProgressBar stepsCount={5} activeStep={1}/>
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
  },
  license: {
    marginBottom: 20,
  },
  agreementView: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default LicenseAgreementScreen;
