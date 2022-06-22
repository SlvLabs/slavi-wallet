import {
  Text,
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import MnemonicArea from '../../../components/mnemonic/mnemonic-area';
import ControlButtons from '../../../components/mnemonic/control-buttons';
import {useNavigation} from '@react-navigation/native';
import theme from '../../../theme';
import {State} from '../../../store';
import ROUTES from '../../../navigation/config/routes';
import useTranslation from '../../../utils/use-translation';
import InitializationBackground from '../../../components/background/initialization-background';
import SolidButton from '../../../components/buttons/solid-button';
import PointerProgressBar from '../../../components/progress/pointer-progress-bar';
import ConfirmationModal from '../../../components/modal/confirmation-modal';
import Layout from '../../../utils/layout';

const CreateMnemonicScreen = () => {
  const [confIsShown, setConfIsShown] = useState<boolean>(false);
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const navigation = useNavigation();

  const words = mnemonic.split(' ');

  const {t} = useTranslation();

  const goToNext = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(
        ROUTES.ACCOUNT_INITIALIZATION.CONFIRM_MNEMONIC,
      );
    });
  }, [navigation]);

  const showConf = useCallback(() => setConfIsShown(true),[]);
  const hideConf = useCallback(() => setConfIsShown(false), []);

  return (
    <InitializationBackground>
      <View style={styles.textBlock}>
        <Text style={styles.header}>{t('Your Secret Phrase')}</Text>
        <Text style={styles.description}>
          {t(
            "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
          )}
        </Text>
      </View>
      <MnemonicArea words={words} showWordIndex={true}/>
      <ControlButtons
        mnemonic={mnemonic}
        containerStyle={styles.controlButtonContainer}
      />
      <View style={styles.buttonsBlock}>
        <SolidButton title={t('Continue')} onPress={showConf} />
        <View style={styles.loaderView}>
          <PointerProgressBar stepsCount={6} activeStep={4}/>
        </View>
      </View>
      <ConfirmationModal
        onPositive={goToNext}
        title={t('Attention!')}
        visible={confIsShown}
        onCancel={hideConf}
        description={t(
          'I saved the phrase outside the wallet and I understand that in case of loss I will not be able to restore access'
        )}
      />
    </InitializationBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: Layout.isSmallDevice ? 4 : 15,
    marginTop: 10,
  },
  descriptionContainer: {
    margin: Layout.isSmallDevice ? 8 : 20,
  },
  controlButtonContainer: {
    margin: Layout.isSmallDevice ? 8 : 30,
    alignItems: 'center',
  },
  textBlock: {
    marginBottom: Layout.isSmallDevice ? 15 : 30,
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 32,
    color: theme.colors.white,
    marginBottom: Layout.isSmallDevice ? 8 : 20,
  },
  description: {
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
    justifyContent: 'flex-end',
  },
  loaderView: {
    paddingTop: Layout.isSmallDevice ? 8 : 17,
  },
});
export default CreateMnemonicScreen;
