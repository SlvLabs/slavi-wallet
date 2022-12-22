import {useCallback, useMemo, useState} from 'react';
import Clipboard from '@react-native-community/clipboard';
import useTranslation from '../utils/use-translation';
import {useSetReferralCode} from '@slavi/wallet-core/src/providers/ws/hooks/referral/use-set-referral-code';

export function useReferralCode(codeLen: number, invitingCode: string | null) {
  const [code, setCode] = useState<string>(invitingCode || '');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(!!invitingCode);
  const [captchaShown, setCaptchaShown] = useState<boolean>(false);

  const {t} = useTranslation();

  const onChangeCode = useCallback(
    (value: string) => {
      if (isSuccess) {
        return;
      }

      setIsError(false);
      setCode(value.substring(0, codeLen));
    },
    [codeLen, isSuccess],
  );

  const onSuccess = useCallback(() => setIsSuccess(true), []);
  const onCaptchaExpired = useCallback(() => setCaptchaShown(true), []);
  const onInvalidToken = useCallback(() => setIsError(true), []);

  const {isLoading, setReferralCode, error} = useSetReferralCode({onSuccess, onCaptchaExpired, onInvalidToken});

  const hideCaptcha = useCallback(() => setCaptchaShown(false), []);

  const onCaptchaSolved = useCallback(
    (token: string) => {
      setTimeout(() => {
        hideCaptcha();
        setReferralCode(token, code);
      }, 500);
    },
    [code, hideCaptcha, setReferralCode],
  );

  const onPress = useCallback(() => {
    if (isError || isSuccess) {
      return;
    } else if (code.length !== 0) {
      setCaptchaShown(true);
    } else {
      Clipboard.getString().then(value => setCode(value.substring(0, codeLen)));
    }
  }, [code, codeLen, isError, isSuccess]);

  const buttonText = useMemo(() => {
    if (isSuccess) {
      return undefined;
    } else if (isError) {
      return t('referralWrong');
    } else if (code.length > 0) {
      return t('referralVerify');
    } else {
      return t('referralPaste');
    }
  }, [isError, isSuccess, t, code]);

  return {
    code,
    onChangeCode,
    isSuccess,
    isError,
    onPress,
    buttonText,
    captchaShown,
    onCaptchaSolved,
    hideCaptcha,
    isLoading,
    error,
  };
}
