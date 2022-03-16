import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import theme from '../../theme';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import PinInput from '../../components/controls/pin-input';
import useTranslation from '../../utils/use-translation';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {authenticateAsync, AuthenticationType, supportedAuthenticationTypesAsync} from 'expo-local-authentication';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../navigation/config/routes';

const PIN_LENGTH = 4;

export default function LoginScreen() {
  const [pin, setPin] = useState<string>();
  const [touchIdIsAvailable, setTouchIdIsAvailable] = useState<boolean>(false);
  const [faceIdIsAvailable, setFaceIdIsAvailable] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation = useNavigation();
  const authService = useAuthService();

  const onBiometric = useCallback(async () => {
    const result = await authenticateAsync({disableDeviceFallback: true, cancelLabel: t('Cancel')});

    if(result.success) {
      authService.authorize();
    }
  }, [authService]);

  const onBackspace = () => setPin(pin?.slice(0, -1));
  const onPress = (num: number) => {
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
      if(authService.checkPin(pin)) {
        authService.authorize();
      } else {
        setPin(undefined);
      }
    }
  }, [pin]);

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
        />
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
});
