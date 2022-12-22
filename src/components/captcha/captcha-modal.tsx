import React, {useCallback} from 'react';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
import useTranslation from '../../utils/use-translation';
import FullScreenModal from '../modal/full-screen-modal';

interface CaptchaModalProps {
  readonly visible: boolean;
  readonly onSolved: (token: string) => void;
  readonly onCancel: () => void;
}

const successPrefix = 'Token:';
export const CaptchaModal = ({onSolved, visible, onCancel}: CaptchaModalProps) => {
  const {t} = useTranslation();

  const onWebViewMessage = useCallback(
    (e: WebViewMessageEvent) => {
      if (e.nativeEvent.data.startsWith(successPrefix)) {
        onSolved(e.nativeEvent.data.slice(successPrefix.length));
      }
    },
    [onSolved],
  );

  return (
    <FullScreenModal visible={visible} title={t('captcha')} onCancel={onCancel}>
      <WebView source={{uri: `${Config.CDN_URL}/captcha`}} onMessage={onWebViewMessage} />
    </FullScreenModal>
  );
};
