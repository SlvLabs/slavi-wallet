import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MnemonicArea from '../../../components/mnemonic/mnemonic-area';
import theme from '../../../theme';
import AlertRow from '../../../components/error/alert-row';
import {State} from '../../../store';
import useTranslation from '../../../utils/use-translation';
import InitializationBackground from '../../../components/background/initialization-background';
import SolidButton from '../../../components/buttons/solid-button';
import PointerProgressBar from '../../../components/progress/pointer-progress-bar';
import {ConfirmMnemonic} from '@slavi/wallet-core/src/store/modules/account/account-thunk-actions';
import {showFinish} from '@slavi/wallet-core/src/store/modules/initialization/initialization';
import Layout from '../../../utils/layout';

const ConfirmMnemonicScreen = () => {
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const words = useMemo(() => mnemonic.split(' ').sort(() => Math.random() - 0.5), [mnemonic]);

  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectWords, setSelectedWords] = useState<string[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const verifyMnemonic = useCallback(() => {
    setIsWrong(!mnemonic.startsWith(selectWords.join(' ')));
  }, [mnemonic, selectWords]);

  const selectWord = useCallback(
    (word: string, index?: number) => {
      setSelectedWords([...selectWords, word]);
      setAvailableWords(availableWords.filter((val: string, i) => val !== word || i !== index));
    },
    [availableWords, selectWords],
  );

  const unselectWord = useCallback(
    (word: string, index?: number) => {
      setAvailableWords([...availableWords, word]);
      setSelectedWords(selectWords.filter((val: string, i) => val !== word || i !== index));
    },
    [availableWords, selectWords],
  );

  useEffect(() => setAvailableWords(words), [setAvailableWords, words]);

  useEffect(() => verifyMnemonic(), [selectWords, verifyMnemonic]);

  const goNext = useCallback(() => {
    dispatch(showFinish());
    dispatch<any>(ConfirmMnemonic(mnemonic));
  }, [dispatch, mnemonic]);

  return (
    <InitializationBackground containerStyle={styles.wrap}>
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.header}>{t('Type your secret phrase')}</Text>
          <Text style={styles.description}>
            {t("Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone.")}
          </Text>
        </View>
        <MnemonicArea words={availableWords} style={styles.availableContainer} onPressWorld={selectWord} />
        <MnemonicArea
          words={selectWords}
          style={styles.selectedContainer}
          onPressWorld={unselectWord}
          wordStyle={styles.word}
        />
        {isWrong && <AlertRow text={t('The secret phrase was entered incorrectly')} />}
      </View>
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Continue')} onPress={goNext} disabled={selectWords.length != words.length || isWrong} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={4} />
        </View>
      </View>
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  availableContainer: {
    borderBottomWidth: 0,
    paddingTop: Layout.isSmallDevice ? 8 : 16,
    paddingBottom: Layout.isSmallDevice ? 8 : 16,
    marginTop: Layout.isSmallDevice ? 20 : 56,
  },
  selectedContainer: {
    borderBottomWidth: 0,
    borderRadius: 8,
    backgroundColor: theme.colors.grayDark,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 8,
    height: Layout.isSmallDevice ? 170 : 184,
  },
  textBlock: {
    marginBottom: Layout.isSmallDevice ? 4 : 30,
    justifyContent: 'flex-end',
    marginTop: Layout.isSmallDevice ? 18 : 24,
  },
  header: {
    fontFamily: theme.fonts.default,
    alignSelf: 'center',
    fontSize: Layout.isSmallDevice ? 18 : 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: Layout.isSmallDevice ? 8 : 20,
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
    justifyContent: 'flex-end',
    marginTop: Layout.isSmallDevice ? 16 : 32,
  },
  loaderView: {
    paddingTop: Layout.isSmallDevice ? 8 : 17,
  },
  word: {
    backgroundColor: theme.colors.darkWord,
  },
  content: {},
  wrap: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
  },
});

export default ConfirmMnemonicScreen;
