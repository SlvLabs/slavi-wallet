import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../../store';
import PageHeader from '../../components/page-header';
import MnemonicArea from '../../components/mnemonic/mnemonic-area';
import ControlButtons from '../../components/mnemonic/control-buttons';
import theme from '../../theme';
import PageDescription from '../../components/settings/page-description';
import {useTranslation} from 'react-i18next';

const MnemonicExportScreen = () => {
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const words = mnemonic.split(' ');
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View>
        <PageHeader text={t('Your secret phrases')} />
        <PageDescription
          text={t(
            "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
          )}
        />
        <MnemonicArea words={words} style={styles.mnemonicContainer} />
        <ControlButtons
          mnemonic={mnemonic}
          containerStyle={styles.controlButtonContainer}
        />
      </View>
    </SafeAreaView>
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
  mnemonicContainer: {
    margin: 30,
  },
  controlButtonContainer: {
    margin: 30,
  },
  description: {
    color: theme.colorsOld.secondary,
    textAlign: 'center',
  },
});

export default MnemonicExportScreen;
