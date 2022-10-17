import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../../store';
import MnemonicArea from '../../components/mnemonic/mnemonic-area';
import ControlButtons from '../../components/mnemonic/control-buttons';
import theme from '../../theme';
import useTranslation from '../../utils/use-translation';
import ScrollableScreen from '../../components/scrollable-screen';
import useAuthService from '@slavi/wallet-core/src/contexts/hooks/use-auth-service';
import {useFocusEffect} from '@react-navigation/native';

const MnemonicExportScreen = () => {
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const words = mnemonic.split(' ');
  const authService = useAuthService();
  const {t} = useTranslation();

  useFocusEffect(() => {
    authService.forbid();
  });
  
  return (
    <ScrollableScreen title={t('Export mnemonic phrase')}>
      <View style={styles.textBlock}>
        <Text style={styles.description}>
          {t(
            "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
          )}
        </Text>
      </View>
      <MnemonicArea
        words={words}
        style={styles.mnemonicContainer}
        wordStyle={styles.mnemonicWord}
        showWordIndex={true}
      />
      <ControlButtons
        mnemonic={mnemonic}
        containerStyle={styles.controlButtonContainer}
      />
    </ScrollableScreen>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-end',
  },
  mnemonicContainer: {
    borderBottomWidth: 0,
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 14,
    padding: 14,
    backgroundColor: theme.colors.cardBackground2,
  },
  mnemonicWord: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.wordBorder,
    borderRadius: 6,
  }
});

export default MnemonicExportScreen;
