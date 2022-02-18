import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import theme from '../../theme';
import useWalletConnectService from '@slavi/wallet-core/src/contexts/hooks/use-wallet-connect-service';
import {useSelectWalletConnectSessions} from '@slavi/wallet-core/src/store/modules/wallet-connect/selectors';
import SolidButton from '../../components/buttons/solid-button';
import useTranslation from '../../utils/use-translation';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import Session from '../../components/wallet-connect/session';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import {Icon} from 'react-native-elements';
import Toast from 'react-native-simple-toast';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>{t('walletConnectTitle')}</Text>
            <Text style={styles.description}>{t('walletConnectDescription')}</Text>
          </View>
          <SolidButton title={t('newConnect')} onPress={showScanner} />
          <View style={styles.sessionsContainer}>
            <Text style={styles.sessionsTitle}>{t('activeSessions')}</Text>
            {sessions.length > 0 ? (
              sessions.map((session, index) => <Session
                peerName={session.peerName || 'unknown'}
                peerUrl={session.peerUrl}
                icon={session.icon}
                onPress={() => showKilling(session.peerId)}
                key={`session_${index}`}
              />)
            ) : (
              <View style={{...styles.placeholder}}>
                <View style={styles.iconContainer}>
                  <Icon
                    type={'feather'}
                    name={'grid'}
                    size={64}
                    color={theme.colors.textLightGray1}
                  />
                </View>
                <Text style={styles.placeholderText}>
                  {t('noActiveSessions')}
                </Text>
              </View>
            )}
          </View>
          <QrReaderModal visible={scannerIsShown} onQRRead={onQRRead} onClose={hideScanner}/>
          <ConfirmationModal
            visible={!!killingCandidate}
            onPositive={killSession}
            title={t('killSession')}
            onCancel={hideKilling}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screenBackground,
    height: '100%',
  },
  content: {
    padding: 32,
  },
  title: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 28,
    color: theme.colors.white,
    marginBottom: 10,
  },
  description: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.lightGray,
    textAlign: 'center',
  },
  header: {
    marginBottom: 30,
  },
  sessionsContainer: {
    marginTop: 40,
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
    marginTop: 40,
  },
  placeholderText: {
    color: theme.colors.textLightGray1,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 24,
    textAlign: 'center',
  },
  iconContainer: {
    backgroundColor: theme.colors.mediumBackground,
    padding: 30,
    alignSelf: 'center',
    borderRadius: 16,
  }
});
