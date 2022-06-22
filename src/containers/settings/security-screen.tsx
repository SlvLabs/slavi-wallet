import {StyleSheet, Switch, Text, View} from 'react-native';
import theme from '../../theme';
import React, {useCallback, useEffect, useState} from 'react';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import useTranslation  from '../../utils/use-translation';
import PinCodeModal from '../../components/modal/pin-code-modal';
import { hasHardwareAsync } from 'expo-local-authentication';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import {ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import useAutoBlockOptions from '../../utils/use-auto-block-options';
import Screen from '../../components/screen';

export default function SecurityScreen() {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [disableConfShown, setDisableConfShown] = useState<boolean>(false);
  const [pinEnabled, setPinEnabled] = useState<boolean>(false);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);
  const [biometricIsSupported, setBiometricIsSupported] = useState<boolean>(false);
  const [autoBlockTimeout, setAutoBlockTimeout] = useState<string>();

  const authService = useAuthService();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const options = useAutoBlockOptions();

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
    await authService.enablePin(pin);
    setPinEnabled(true);
    hideModal();
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

  const onAutoBlocking = useCallback(
    () => navigation.navigate(ROUTES.SETTINGS.AUTO_BLOCKING),
    [navigation]
  );

  useEffect(() => {
    if(authService) {
      setPinEnabled(authService.isAuthEnable());
      setBiometricEnabled(authService.isBiometricEnable());
    }
  }, [authService]);

  useEffect(() => {
    hasHardwareAsync().then((result) => setBiometricIsSupported(result));
  }, []);

  useEffect(() => navigation.addListener(
      'focus',
      () => setAutoBlockTimeout(options[authService.getAutoBlockTimeout()])
    ), [authService, options]);
  return (
    <Screen title={'Security'}>
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
        <ListItem key={3} bottomDivider containerStyle={styles.listItem} onPress={onAutoBlocking} disabled={!pinEnabled}>
          <ListItem.Content style={styles.listContent}>
            <ListItem.Title style={pinEnabled ? styles.label : styles.disabledLabel}>{t('autoBlocking')}</ListItem.Title>
          </ListItem.Content>
          {pinEnabled && <Text style={styles.subText}>{autoBlockTimeout}</Text>}
          <ListItem.Chevron color={theme.colors.textLightGray} size={22}/>
        </ListItem>
      <PinCodeModal visible={modalIsShown} onCancel={hideModal} onSuccess={savePin}/>
      <ConfirmationModal visible={disableConfShown} onPositive={disablePin} title={t('disablePinConf')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.maxTransparent,
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
  listItem: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  subText: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.borderGreen,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 4,
  }
});
