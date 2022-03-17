import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import theme from '../../theme';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import PinInput from '../../components/controls/pin-input';
import useTranslation from '../../utils/use-translation';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {authenticateAsync, AuthenticationType, supportedAuthenticationTypesAsync} from 'expo-local-authentication';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';
import {CheckAuthError} from '@slavi/wallet-core/src/types';

const PIN_LENGTH = 4;

export default function LoginScreen() {
  const [pin, setPin] = useState<string>();
  const [touchIdIsAvailable, setTouchIdIsAvailable] = useState<boolean>(false);
  const [faceIdIsAvailable, setFaceIdIsAvailable] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>();
  const [errorTimer, setErrorTimer] = useState<number>(0);
  const [locked, setLocked] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();
  const authService = useAuthService();

  const timer = useRef<any>(null);
  const timerValue = useRef<number>(0);

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
    () => navigation.navigate(ROUTES.AUTHENTICATION.RESTORE),
    [navigation]
  );

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
              setLocked(true);

              if(timer.current) {
                clearInterval(timer.current);
              }
              timerValue.current = result.time;

              timer.current = setInterval(() => {
                timerValue.current--;
                setErrorTimer(timerValue.current);
                if(timerValue.current === 0 && timer.current) {
                  clearInterval(timer.current);
                }
              }, 1000);
              break;
            }
          }
        }
      });
    }
  }, [pin, t]);

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

  return (
    <SafeAreaView style={styles.container}>
      <RadialGradient style={styles.gradient} {...theme.gradients.radialLoadingGradient}>
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
  },
  error: {
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 16,
    color: theme.colors.errorRed,
    marginTop: 20,
  }
});
