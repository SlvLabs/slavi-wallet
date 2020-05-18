import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PageHeader from '../../../components/page-header';
import MnemonicArea from '../../../components/mnemonic/mnemonic-area';
import theme from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import AlertRow from '../../../components/error/alert-row';
import {store} from '@slavi/wallet-core';
import {State} from '../../../store';
import ROUTES from '../../../navigation/config/routes';
import {useTranslation} from 'react-i18next';

const ConfirmMnemonicScreen = () => {
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const words = useMemo(
    () => mnemonic.split(' ').sort(() => Math.random() - 0.5),
    [mnemonic],
  );

  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectWords, setSelectedWords] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const verifyMnemonic = useCallback(() => {
    setIsWrong(!mnemonic.startsWith(selectWords.join(' ')));
  }, [mnemonic, selectWords]);

  const selectWord = useCallback(
    (word: string) => {
      setSelectedWords([...selectWords, word]);
      setAvailableWords(availableWords.filter((val: string) => val !== word));
    },
    [availableWords, selectWords],
  );

  const unselectWord = useCallback(
    (word: string) => {
      setAvailableWords([...availableWords, word]);
      setSelectedWords(selectWords.filter((val: string) => val !== word));
    },
    [availableWords, selectWords],
  );

  useEffect(() => setAvailableWords(words), [setAvailableWords, words]);

  useEffect(() => verifyMnemonic(), [selectWords, verifyMnemonic]);

  useEffect(() => {
    if (selectWords.length === words.length && !isWrong) {
      dispatch(store.SaveMnemonic(mnemonic));
      navigation.navigate(ROUTES.ACCOUNT_INITIALIZATION.READY);
    }
  }, [
    dispatch,
    isWrong,
    mnemonic,
    navigation,
    selectWords.length,
    words.length,
  ]);
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <PageHeader text={t('Input secret phrase')} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {t(
            'You need to confirm the passphrase. Choose in turn the words in such a way as to compose a passphrase from your wallet.',
          )}
        </Text>
      </View>
      <MnemonicArea
        words={selectWords}
        style={styles.selectedContainer}
        onPressWorld={unselectWord}
      />
      {isWrong && (
        <AlertRow text={t('The secret phrase was entered incorrectly')} />
      )}
      <MnemonicArea
        words={availableWords}
        style={styles.availableContainer}
        onPressWorld={selectWord}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  availableContainer: {
    borderWidth: 0,
    marginTop: 20,
  },
  selectedContainer: {
    margin: 20,
    height: 180,
  },
  descriptionContainer: {
    margin: 20,
  },
  description: {
    color: theme.colorsOld.secondary,
    textAlign: 'center',
  },
});

export default ConfirmMnemonicScreen;
