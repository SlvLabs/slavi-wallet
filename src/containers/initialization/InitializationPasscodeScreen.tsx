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
import Layout from '../../utils/layout';

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

  const onEnabledChange = useCallback(async () => {
    if (authService.isAuthEnable()) {
      await authService.disablePin();
      setPinEnabled(false);
      setBiometricEnabled(false);
    } else {
      showModal();
    }
  }, [authService, showModal]);

  const savePin = useCallback(
    async (pin: string) => {
      hideModal();
      await authService.enablePin(pin);
      setPinEnabled(true);
    },
    [hideModal, authService],
  );

  const onBiometricChange = async () => {
    if (biometricEnabled) {
      await authService.disableBiometric();
      setBiometricEnabled(false);
    } else {
      await authService.enableBiometric();
      setBiometricEnabled(true);
    }
  };

  useEffect(() => {
    hasHardwareAsync().then(result => setBiometricIsSupported(result));
  }, []);

  return (
    <InitializationBackground>
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Set passcode')}</Text>
          <Text style={styles.description}>{t('initPinDescription')}</Text>
        </View>
        <View style={styles.controlsView}>
          <View style={{...styles.row, ...styles.row1}}>
            <Text style={styles.label}>{t('pinEnabled')}</Text>
            <Switch
              value={pinEnabled}
              onValueChange={onEnabledChange}
              thumbColor={theme.colors.white}
              trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
            />
          </View>
          {biometricIsSupported && (
            <View style={{...styles.row, ...styles.row2}}>
              <Text style={pinEnabled ? styles.label : styles.disabledLabel}>{t('biometricEnabled')}</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={onBiometricChange}
                disabled={!pinEnabled}
                thumbColor={pinEnabled ? theme.colors.white : theme.colors.textLightGray}
                trackColor={{false: theme.colors.textDarkGray, true: theme.colors.green}}
              />
            </View>
          )}
        </View>
        <View style={styles.stepsView}>
          <SolidButton title={t('Continue')} onPress={goNextStep} />
          <View style={styles.loaderView}>
            <PointerProgressBar stepsCount={6} activeStep={2} />
          </View>
        </View>
      </View>
      <PinCodeModal visible={modalIsShown} onCancel={hideModal} onSuccess={savePin} />
    </InitializationBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Layout.isSmallDevice ? 18 : 32,
  },
  loaderView: {
    paddingTop: 17,
  },
  header: {
    fontSize: Layout.isSmallDevice ? 18 : 26,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: Layout.isSmallDevice ? 20 : 29,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: Layout.isSmallDevice ? 10 : 20,
  },
  description: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: Layout.isSmallDevice ? 16 : 20,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: Layout.isSmallDevice ? 11 : 13,
    paddingBottom: Layout.isSmallDevice ? 10 : 12,
    borderRadius: 8,
    borderWidth: 0,
  },
  row1: {
    backgroundColor: theme.colors.cardBackground2,
  },
  row2: {
    backgroundColor: theme.colors.cardBackground3,
    marginTop: 10,
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
    flex: Layout.isSmallDevice ? 1 : 2,
  },
  stepsView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
