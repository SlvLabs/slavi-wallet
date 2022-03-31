import {StyleSheet, Switch, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {save} from '@slavi/wallet-core/src/store/modules/initialization/initialization-thunk-actions';
import InitializationBackground from '../../components/background/initialization-background';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {hasHardwareAsync} from 'expo-local-authentication';
import PinCodeModal from '../../components/modal/pin-code-modal';
import SolidButton from '../../components/buttons/solid-button';
import PointerProgressBar from '../../components/progress/pointer-progress-bar';

export default function InitializationPasscodeScreen() {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [pinEnabled, setPinEnabled] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);
  const [biometricIsSupported, setBiometricIsSupported] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const authService = useAuthService();

  const goNextStep = useCallback(() => dispatch(save()), [dispatch]);

  const showModal = useCallback(() => setModalIsShown(true), []);
  const hideModal = useCallback(() => setModalIsShown(false), []);

  const onEnabledChange =  useCallback(async () => {
    if(authService.isAuthEnable()) {
      await authService.disablePin();
      setPinEnabled(false);
      setBiometricEnabled(false);
    } else {
      showModal();
    }
  },  [authService, showModal]);

  const savePin = useCallback(async (pin: string) => {
    hideModal();
    await authService.enablePin(pin);
    setPinEnabled(true);
  }, [hideModal, authService]);

  const onBiometricChange = async () => {
    if(biometricEnabled) {
      await authService.disableBiometric();
      setBiometricEnabled(false);
    } else {
      await authService.enableBiometric();
      setBiometricEnabled(true);
    }
  };

  useEffect(() => {
    hasHardwareAsync().then((result) => setBiometricIsSupported(result));
  }, []);

  return (
    <InitializationBackground>
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Set passcode')}</Text>
          <Text style={styles.description}>{t('initPinDescription')}</Text>
        </View>
        <View style={styles.controlsView}>
          <View style={styles.row}>
            <Switch
              value={pinEnabled}
              onValueChange={onEnabledChange}
              thumbColor={theme.colors.white}
              trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
            />
            <Text style={styles.label}>{t('pinEnabled')}</Text>
          </View>
          {biometricIsSupported && (
            <View style={styles.row}>
              <Switch
                value={biometricEnabled}
                onValueChange={onBiometricChange}
                disabled={!pinEnabled}
                thumbColor={pinEnabled ? theme.colors.white : theme.colors.textLightGray1}
                trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
              />
              <Text style={pinEnabled ? styles.label : styles.disabledLabel}>
                {t('biometricEnabled')}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.stepsView}>
          <SolidButton title={t('Continue')} onPress={goNextStep} />
          <View style={styles.loaderView}>
            <PointerProgressBar stepsCount={6} activeStep={2}/>
          </View>
        </View>
      </View>
      <PinCodeModal visible={modalIsShown} onCancel={hideModal} onSuccess={savePin}/>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loaderView: {
    paddingTop: 17,
  },
  header: {
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 29,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    fontFamily: theme.fonts.default,
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.white,
    textAlign: 'left',
    marginLeft: 20,
  },
  disabledLabel: {
    fontFamily: theme.fonts.default,
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.textLightGray1,
    textAlign: 'left',
    marginLeft: 20,
  },
  textBlock: {
    flex: 1,
  },
  controlsView: {
    justifyContent: 'flex-start',
    flex: 2,
  },
  stepsView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
