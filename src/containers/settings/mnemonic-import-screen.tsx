import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InsertableTextArea from '../../components/controls/insertable-text-area';
import {useDispatch} from 'react-redux';
import {store} from '@slavi/wallet-core';
import {useTranslation} from 'react-i18next';
import theme from '../../theme';
import SolidButton from '../../components/buttons/solid-button';
import ConfirmationModal from '../../components/modal/confirmation-modal';
import {setGlobalLoading, unsetGlobalLoading} from '@slavi/wallet-core/src/store/modules/global-loading/global-loading';

const MnemonicImportScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const showConf = useCallback(() => setConfIsShown(true),[]);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  const updateMnemonic = useCallback(async () => {
    dispatch(setGlobalLoading());
    await dispatch(store.ImportMnemonic(mnemonic));
    dispatch(unsetGlobalLoading());
  }, [dispatch, mnemonic]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.description}>
          {t(
            "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
          )}
        </Text>
      </View>
      <InsertableTextArea onChange={(value: string) => setMnemonic(value)} />
      <View style={styles.buttonsBlock}>
        <SolidButton title={'Import'} onPress={showConf} />
      </View>
      <ConfirmationModal
        onPositive={updateMnemonic}
        title={t('Attention!')}
        visible={confIsShown}
        onCancel={hideConf}
        description={t(
          'By importing a new passphrase, you may lose access to existing addresses. Make sure to save all private keys.'
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    padding: 16,
    backgroundColor: theme.colors.screenBackground,
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
  buttonsBlock: {
    marginTop: 24,
    justifyContent: 'flex-end',
  },
});

export default MnemonicImportScreen;
