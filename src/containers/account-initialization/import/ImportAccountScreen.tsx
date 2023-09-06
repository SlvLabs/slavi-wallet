import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useTranslation from '../../../utils/use-translation';
import InitializationBackground from '../../../components/background/initialization-background';
import theme from '../../../theme';
import SolidButton from '../../../components/buttons/solid-button';
import PointerProgressBar from '../../../components/progress/pointer-progress-bar';
import ConfirmationModal from '../../../components/modal/confirmation-modal';
import {showFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '@slavi/wallet-core';
import InsertableTextArea from '../../../components/controls/insertable-text-area';
import {selectMnemonicError} from '@slavi/wallet-core/src/store/modules/account/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setMnemonicError} from '@slavi/wallet-core/src/store/modules/account/account';
import Layout from '../../../utils/layout';
import OutlineButton from '../../../components/buttons/outline-button';
import QrReaderModal from '../../../components/coin-send/qr-reader-modal';
import useTextQr from '../../../hooks/use-text-qr';
import {ScanButton} from "../../../components/buttons/scan-button";

const ImportAccountScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const mnemonicError = useSelector(selectMnemonicError);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const showConf = useCallback(() => setConfIsShown(true), []);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  const onChange = useCallback((value: string) => {
    setMnemonic(value.toLowerCase());
  }, []);

  const {shown, show, hide, onRead} = useTextQr(onChange);

  const updateMnemonic = useCallback(async () => {
    await dispatch(store.ImportMnemonic(mnemonic));
    dispatch(showFinish());
  }, [dispatch, mnemonic]);

  useEffect(() => {
    dispatch(setMnemonicError(''));
  }, [dispatch, mnemonic]);

  return (
    <InitializationBackground>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Import exists account')}</Text>
          <Text style={styles.description}>
            {t(
              'Enter the secret phrase from another wallet. Usually it is 12, sometimes more, words separated by spaces',
            )}
          </Text>
        </View>

        <InsertableTextArea onChange={onChange} value={mnemonic} />
        <Text style={styles.error}>{mnemonicError}</Text>
        <View style={styles.delimiterRow}>
          <View style={styles.delimiter} />
          <Text style={styles.delimiterText}>{t('or')}</Text>
          <View style={styles.delimiter} />
        </View>
        <ScanButton title={t('scanQr')} onPress={show} />
        <ConfirmationModal
          onPositive={updateMnemonic}
          title={t('Attention!')}
          visible={confIsShown}
          onCancel={hideConf}
          description={t(
            'I saved the phrase outside the wallet and I understand that in case of loss I will not be able to restore access',
          )}
        />
        <QrReaderModal visible={shown} onQRRead={onRead} onClose={hide} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Continue')} onPress={showConf} disabled={!mnemonic} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={4} />
        </View>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 15,
    marginTop: Layout.isSmallDevice ? 0 : 10,
  },
  descriptionContainer: {
    margin: 20,
  },
  textBlock: {
    marginBottom: 30,
  },
  header: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: 20,
    textAlign: 'center',
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
  buttonsBlock: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'flex-end',
  },
  loaderView: {
    paddingTop: 17,
  },
  error: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 18,
    color: theme.colors.red,
    textAlign: 'center',
  },
  content: {
    paddingTop: 20,
  },
  delimiterRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  delimiter: {
    width: Layout.window.width / 2 - 80,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
    marginRight: 10,
    marginLeft: 10,
  },
  delimiterText: {
    color: theme.colors.lightGray,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: theme.fonts.default,
    lineHeight: 20,
  },
});

export default ImportAccountScreen;
