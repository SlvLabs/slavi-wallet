import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InsertableTextArea from '../../components/controls/insertable-text-area';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '@slavi/wallet-core';
import useTranslation from '../../utils/use-translation';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import {selectMnemonicError} from '@slavi/wallet-core/src/store/modules/account/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setMnemonicError} from '@slavi/wallet-core/src/store/modules/account/account';
import Screen from '../../components/screen';
import {usePinProtection} from '../../hooks/usePinProtection';
import OutlineButton from '../../components/buttons/outline-button';
import useTextQr from '../../hooks/use-text-qr';
import QrReaderModal from '../../components/coin-send/qr-reader-modal';
import Layout from '../../utils/layout';
import CustomIcon from '../../components/custom-icon/custom-icon';
import {ScanButton} from "../../components/buttons/scan-button";

const MnemonicImportScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const mnemonicError = useSelector(selectMnemonicError);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const showConf = useCallback(() => setConfIsShown(true), []);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  const updateMnemonic = useCallback(async () => {
    await dispatch(store.ImportMnemonic(mnemonic));
  }, [dispatch, mnemonic]);

  const onMnemonicChange = useCallback((value: string) => {
    setMnemonic(value.toLowerCase());
  }, []);

  const {shown, show, hide, onRead} = useTextQr(onMnemonicChange);

  useEffect(() => {
    dispatch(setMnemonicError(''));
  }, [dispatch, mnemonic]);

  usePinProtection();

  return (
    <Screen title={t('Import new mnemonic phrase')}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.description}>
            {t(
              "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
            )}
          </Text>
          <InsertableTextArea onChange={onMnemonicChange} value={mnemonic} />
          <Text style={styles.error}>{mnemonicError}</Text>
          <View style={styles.delimiterRow}>
            <View style={styles.delimiter} />
            <Text style={styles.delimiterText}>{t('or')}</Text>
            <View style={styles.delimiter} />
          </View>
          <ScanButton title={t('scanQr')} onPress={show} />
        </View>
        <SolidButton title={t('Import')} onPress={showConf} />
        <ConfirmationModal
          onPositive={updateMnemonic}
          title={t('Attention!')}
          visible={confIsShown}
          onCancel={hideConf}
          description={t(
            'By importing a new passphrase, you may lose access to existing addresses. Make sure to save all private keys.',
          )}
        />
        <QrReaderModal visible={shown} onQRRead={onRead} onClose={hide} />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  descriptionContainer: {
    margin: 20,
  },
  controlButtonContainer: {
    margin: 30,
  },
  textBlock: {
    marginBottom: 30,
  },
  description: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 22,
    color: theme.colors.textLightGray,
    textAlign: 'left',
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

export default MnemonicImportScreen;
