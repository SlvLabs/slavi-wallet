import useTranslation from '../../utils/use-translation';
import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseModal from '../modal/base-modal';
import theme from '../../theme';
import SimpleCheckbox from '../controls/simple-checkbox';
import GSolidButton from '../buttons/g-solid-button';

export interface ConfirmationModalProps {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {visible, onSubmit, onCancel} = props;
  const {t} = useTranslation();
  const [accepted, setAccepted] = useState<boolean>(false);

  const header = (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{t('Disclaimer')}</Text>
    </View>
  );

  const openTermsOfUse = useCallback(() => {
    Linking.openURL(t('bifinity terms of use link')).catch(e => console.error(e));
  }, []);
  return (
    <BaseModal visible={visible} onCancel={onCancel} showCloseIcon={true} header={header}>

      <View style={styles.bodyContainer}>
        <Text style={styles.body}>{t('CoinBuyDisclaimer')}</Text>
      </View>
      <View style={styles.agreementView}>
        <SimpleCheckbox checked={accepted} onPress={() => setAccepted(!accepted)}>
          <View style={styles.agreementTextView}>
            <Text style={styles.agreementCheckboxLabel}>{t('CoinBuyDisclaimerCheckbox')}</Text>
            <Text style={styles.agreementCheckboxLabelLink} onPress={openTermsOfUse}>{t('CoinBuyDisclaimerCheckboxLink')}</Text>
          </View>
        </SimpleCheckbox>
      </View>
      <View style={styles.controlsContainer}>
        <GSolidButton title={t('OK')} onPress={onSubmit} buttonStyle={styles.acceptButton} disabled={!accepted}/>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  agreementView: {
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  agreementTextView: {
    marginLeft: 14,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  agreementCheckboxLabel: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.01,
    color: theme.colors.white,
  },
  agreementCheckboxLabelLink: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.01,
    color: theme.colors.green,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 5,
  },
  header: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.4,
    color: theme.colors.white,
  },
  bodyContainer: {
    marginTop: 16,
    paddingBottom: 30,
  },
  body: {
    fontFamily: theme.fonts.default,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    // letterSpacing: 0.4,
    color: theme.colors.textLightGray,
  },
  controlsContainer: {
    margin: 0,
  },
  acceptButton: {
    width: '100%',
  },
});
