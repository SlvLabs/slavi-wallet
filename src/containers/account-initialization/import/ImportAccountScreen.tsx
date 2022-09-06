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
import { selectMnemonicError } from '@slavi/wallet-core/src/store/modules/account/selectors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setMnemonicError} from '@slavi/wallet-core/src/store/modules/account/account';

const ImportAccountScreen = () => {
  const [mnemonic, setMnemonic] = useState<string>('');
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const mnemonicError = useSelector(selectMnemonicError);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const showConf = useCallback(() => setConfIsShown(true),[]);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  const updateMnemonic = useCallback(async () => {
    await dispatch(store.ImportMnemonic(mnemonic));
    dispatch(showFinish());
  }, [dispatch, mnemonic]);

  useEffect(() => {
    dispatch(setMnemonicError(''))
  }, [dispatch, mnemonic]);

  return (
    <InitializationBackground>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Import exists account')}</Text>
          <Text style={styles.description}>
            {t(
              "Enter the secret phrase from another wallet. Usually it is 12, sometimes more, words separated by spaces",
            )}
          </Text>
        </View>

        <InsertableTextArea onChange={(value: string) => setMnemonic(value.toLowerCase())} />
        <Text style={styles.error}>{mnemonicError}</Text>

        <ConfirmationModal
          onPositive={updateMnemonic}
          title={t('Attention!')}
          visible={confIsShown}
          onCancel={hideConf}
          description={t(
            'I saved the phrase outside the wallet and I understand that in case of loss I will not be able to restore access'
          )}
        />
      </KeyboardAwareScrollView>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Continue')} onPress={showConf} disabled={!mnemonic}/>
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={4}/>
        </View>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 15,
    marginTop: 10,
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
  }
});

export default ImportAccountScreen;
