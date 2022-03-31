import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import theme from '../../theme';
import React, {useCallback, useEffect, useState} from 'react';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import useTranslation from '../../utils/use-translation';
import PinCodeModal from '../../components/modal/pin-code-modal';
import { hasHardwareAsync } from 'expo-local-authentication';
import ConfirmationModal from '../../components/modal/confirmation-modal';

export default function SecurityScreen() {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [disableConfShown, setDisableConfShown] = useState<boolean>(false);
  const [pinEnabled, setPinEnabled] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);
  const [biometricIsSupported, setBiometricIsSupported] = useState<boolean>(false);

  const authService = useAuthService();
  const {t} = useTranslation();

  const showModal = useCallback(() => setModalIsShown(true), []);
  const hideModal = useCallback(() => setModalIsShown(false), []);
  const showDisableConf = useCallback(() => setDisableConfShown(true), []);
  const hideDisableConf = useCallback(() => setDisableConfShown(false), []);

  const onEnabledChange =  useCallback(async () => {
    if(authService.isAuthEnable()) {
      showDisableConf();
    } else {
      showModal();
    }
  },  [authService, showModal, showDisableConf]);

  const disablePin = useCallback(async () => {
    await authService.disablePin();
    setPinEnabled(false);
    setBiometricEnabled(false);
    hideDisableConf();
  }, [authService, hideDisableConf]);

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
    if(authService) {
      setPinEnabled(authService.isAuthEnable());
      setBiometricEnabled(authService.isBiometricEnable());
    }
  }, [authService]);

  useEffect(() => {
    hasHardwareAsync().then((result) => setBiometricIsSupported(result));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>{t('pinCode')}</Text>
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
      <PinCodeModal visible={modalIsShown} onCancel={hideModal} onSuccess={savePin}/>
      <ConfirmationModal visible={disableConfShown} onPositive={disablePin} title={t('disablePinConf')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.screenBackground,
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
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
  header: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
  },
});
