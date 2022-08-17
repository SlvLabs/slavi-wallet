import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useSelectWalletConnectSessions} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import SolidButton from '../../components/buttons/solid-button';
import useTranslation from '../../utils/use-translation';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import Session from '../../components/wallet-connect/session';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import Toast from 'react-native-simple-toast';
import ScrollableScreen from '../../components/scrollable-screen';
import CustomIcon from '../../components/custom-icon/custom-icon';

export default function MainWalletConnectScreen() {
  const [scannerIsShown, setScannerIsShown] = useState<boolean>(false);
  const [killingCandidate, setKillingCandidate] = useState<string>();

  const sessions = useSelectWalletConnectSessions();

  const walletConnectService = useWalletConnectService();
  const {t} = useTranslation()

  const showScanner = useCallback(() => setScannerIsShown(true), []);
  const hideScanner = useCallback(() => setScannerIsShown(false), []);

  const showKilling = useCallback((peerId?: string) => setKillingCandidate(peerId), []);
  const hideKilling = useCallback(() => setKillingCandidate(undefined), []);

  const killSession = useCallback(async () => {
    if(killingCandidate) {
      try {
        await walletConnectService.killSession(killingCandidate);
      } catch (err) {
        Toast.show(t('walletDisconnectError'));
      }
      hideKilling();
    }
  }, [killingCandidate])

  const onQRRead = useCallback(async (uri: string) => {
    let success = true;
    try {
      await walletConnectService.connect(uri);
    } catch (err) {
      success = false;
      Toast.show(t('walletConnectionDuration'));
    }
    if(success) {}
    Toast.show(t('walletConnectionDuration'));
    hideScanner();
  }, [hideScanner, t]);

  return (
    <ScrollableScreen title={t('walletConnect')}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('walletConnectTitle')}</Text>
        <Text style={styles.description}>{t('walletConnectDescription')}</Text>
      </View>
      {sessions.length > 0 && (
        <View style={styles.sessionsContainer}>
          <Text style={styles.sessionsTitle}>{t('activeSessions')}</Text>
          {sessions.map((session, index) => <Session
            peerName={session.peerName || 'unknown'}
            peerUrl={session.peerUrl}
            icon={session.icon}
            onPress={() => showKilling(session.peerId)}
            key={`session_${index}`}
          />)}
        </View>
      )}
      <SolidButton title={t('newConnect')} onPress={showScanner} containerStyle={styles.connectionButton}/>
      {sessions.length === 0 && (
        <View style={{...styles.placeholder}}>
          <View style={styles.iconContainer}>
            <CustomIcon
              name={'Category'}
              size={64}
              color={theme.colors.textLightGray3}
              style={styles.icon}
            />
          </View>
          <Text style={styles.placeholderText}>
            {t('noActiveSessions')}
          </Text>
        </View>)}
      <QrReaderModal visible={scannerIsShown} onQRRead={onQRRead} onClose={hideScanner}/>
      <ConfirmationModal
        visible={!!killingCandidate}
        onPositive={killSession}
        title={t('killSession')}
        onCancel={hideKilling}
      />
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 29,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
  },
  description: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 20,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  header: {
    marginTop: 8,
  },
  sessionsContainer: {
    marginTop: 24,
  },
  sessionsTitle: {
    fontFamily: theme.fonts.default,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 28,
    color: theme.colors.lightGray,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
  },
  placeholderText: {
    color: theme.colors.textLightGray1,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 24,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: theme.colors.mediumBackground,
    padding: 30,
    alignSelf: 'center',
    borderRadius: 16,
  },
  icon: {
    opacity: 0.2,
  },
  connectionButton: {
    marginTop: 24,
  }
});
