import {
  Text,
  View,
  Button,
  StyleSheet,
  InteractionManager,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import MnemonicArea from '../../../components/mnemonic/mnemonic-area';
import ControlButtons from '../../../components/mnemonic/control-buttons';
import {useNavigation} from '@react-navigation/native';
import PageHeader from '../../../components/page-header';
import theme from '../../../theme';
import {State} from '../../../store';
import ROUTES from '../../../navigation/config/routes';
import {useTranslation} from 'react-i18next';

const CreateMnemonicScreen = () => {
  const mnemonic = useSelector((state: State) => state.account.mnemonic);
  const navigation = useNavigation();

  const words = mnemonic.split(' ');

  const {t} = useTranslation();

  const onPressNext = useCallback(() => {
    Alert.alert(
      t('Attention!'),
      t('If you lose your secret phrase, you will lose access to your funds.'),
      [
        {
          text: t('Back'),
          style: 'cancel',
        },
        {
          text: t('OК'),
          onPress: () => {
            InteractionManager.runAfterInteractions(() => {
              navigation.navigate(
                ROUTES.ACCOUNT_INITIALIZATION.CONFIRM_MNEMONIC,
              );
            });
          },
        },
      ],
    );
  }, [navigation, t]);

  return (
    <SafeAreaView>
      <PageHeader text={t('Your secret phrase')} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {t(
            "These 12 words are the key to your wallet. By pulling it, you cannot restore access. Write it down in the correct order, or copy it and keep it in a safe place. Don't give it to anyone",
          )}
        </Text>
      </View>
      <MnemonicArea words={words} style={styles.mnemonicContainer} />
      <ControlButtons
        mnemonic={mnemonic}
        containerStyle={styles.controlButtonContainer}
      />
      <View style={styles.nextButtonContainer}>
        <Button title={t('Next')} onPress={onPressNext} />
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
  nextButtonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  description: {
    color: theme.colorsOld.secondary,
    textAlign: 'center',
  },
});
export default CreateMnemonicScreen;
