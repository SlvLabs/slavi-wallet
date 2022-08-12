import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';
import PinInput from '../controls/pin-input';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import useTranslation from '../../utils/use-translation';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {authenticateAsync, AuthenticationType, supportedAuthenticationTypesAsync} from 'expo-local-authentication';
import {CheckAuthError} from '@slavi/wallet-core/src/types';
import SolidButton from '../buttons/solid-button';
import OutlineButton from '../buttons/outline-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Spinner from '../spinner';

export interface AuthModalProps {
  visible: boolean;
  loading: boolean;
}

const PIN_LENGTH = 4;

export default function AuthModal(props: AuthModalProps) {
  const {visible, loading} = props;

  const timer = useRef<any>(null);
  const timerValue = useRef<number>(0);

  const [pin, setPin] = useState<string>();
  const [touchIdIsAvailable, setTouchIdIsAvailable] = useState<boolean>(false);
  const [faceIdIsAvailable, setFaceIdIsAvailable] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>();
  const [errorTimer, setErrorTimer] = useState<number>(0);
  const [locked, setLocked] = useState<boolean>(false);
  const [restoreIsActive, setRestoreIsActive] = useState<boolean>(false);

  const {t} = useTranslation();
  const authService = useAuthService();

  const onBiometric = useCallback(async () => {
    const result = await authenticateAsync({disableDeviceFallback: true, cancelLabel: t('Cancel')});

    if(result.success) {
      authService.authorize();
    }
  }, [authService]);

  const onBackspace = () => setPin(pin?.slice(0, -1));
  const onPress = (num: number) => {
    if(locked) {
      return;
    }

    if(!pin || pin.length < PIN_LENGTH) {
      setPin(!pin ? `${num}` : `${pin}${num}`);
    }
  }

  const onRestore = useCallback(
    () => setRestoreIsActive(true),
    []
  );

  const ban =  useCallback((banTime: number) => {
    setLocked(true);

    if(timer.current) {
      clearInterval(timer.current);
    }
    timerValue.current = banTime;

    timer.current = setInterval(() => {
      timerValue.current--;
      setErrorTimer(timerValue.current);
      if(timerValue.current === 0 && timer.current) {
        clearInterval(timer.current);
      }
    }, 1000);
  }, []);

  const onAccept = useCallback(async () => {
    await AsyncStorage.clear();
    RNRestart.Restart();
  }, []);

  const onDecline = useCallback(() => setRestoreIsActive(false), []);

  useEffect(() => {
    if(pin && pin.length === PIN_LENGTH) {
      authService.checkPin(pin).then(result => {
        if(result.success) {
          authService.authorize();
          return;
        }

        setPin(undefined);

        switch (result.error) {
          case CheckAuthError.notMatch:
            setError(t('pinNotMatch'));
            break;
          case CheckAuthError.ban: {
            if(result.time) {
              setErrorTimer(result.time);
              ban(result.time);
            }
            break;
          }
        }
      });
    }
  }, [pin, t, ban]);

  useEffect(() => {
    if(!authService) {
      return;
    }

    const result = authService.checkBan();

    if(result.success) {
      setLocked(false);
      return;
    }

    if(result.error === CheckAuthError.ban && result.time) {
      setLocked(true);
      setErrorTimer(result.time);
      ban(result.time);
    }
  }, [authService, ban]);

  useEffect(() => {
    supportedAuthenticationTypesAsync().then((types => {
      if(authService.isBiometricEnable()) {
        if (types.includes(AuthenticationType.FACIAL_RECOGNITION)) {
          setFaceIdIsAvailable(true);
        }

        if (types.includes(AuthenticationType.FINGERPRINT)) {
          setTouchIdIsAvailable(true);
        }
      }
    }));
  }, [authService]);

  useEffect(() => {
    if(errorTimer && errorTimer > 0) {
      setLocked(true);
      setError(`${t('tooMatchErrors')} ${errorTimer}`);
    } else {
      setLocked(false);
      setError(undefined);
    }
  }, [errorTimer]);

  useEffect(() => {
    if(error) {
      setError(undefined);
    }
  }, [pin]);

  useEffect(() => {
    if(!visible) {
      setPin('');
    }
  }, [visible]);

  return (
    <Modal
      animationType={'none'}
      visible={visible && authService.isAuthEnable()}>
      <SafeAreaView style={styles.container}>
        {visible && <StatusBar
          backgroundColor={theme.colors.black}
          barStyle={'light-content'}
        />}
        <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradient}>
          {loading ? (
            <Spinner />
          ) : (
            !restoreIsActive ? (
              <>
                <PinInput
                  length={PIN_LENGTH}
                  enteredCount={pin?.length || 0}
                  label={t('pinLabel')}
                  onPress={onPress}
                  onBiometricPress={onBiometric}
                  onRestorePress={onRestore}
                  onBackspacePress={onBackspace}
                  faceIdIsAvailable={faceIdIsAvailable}
                  touchIdIsAvailable={touchIdIsAvailable}
                  restoreIsAvailable={true}
                  disabled={locked}
                />
                <Text style={styles.error}>{error} {!!errorTimer}</Text>
              </>
            ) : (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.header}>{t('restoreHeader')}</Text>
                  <Text style={styles.description}>{t('restoreDescription')}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <SolidButton title={t('restoreAccept')} onPress={onAccept} containerStyle={styles.button} />
                  <OutlineButton title={t('restoreDecline')} onPress={onDecline} containerStyle={styles.button} />
                </View>
              </>
            )
          )}
        </RadialGradient>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark,
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.errorRed,
    marginTop: 20,
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  textContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
